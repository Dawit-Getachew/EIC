/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TopBarContent from './TopBarContent';
import BottomBarContent from './BottomBarContent';
import SidebarContent from './SidebarContent';
import ChatContent from './ChatContent';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Actions as MessageActions, Selectors as MessageSelectors, API as MessageAPI } from "src/store/States/Investment/Message/"
import { Actions as UserActions, Selectors as UserSelectors, API as UserAPI } from "src/store/States/Investment/User/"
import { Actions as AccountActions, Selectors as AccountSelectors, API as AccountAPI } from "src/store/States/Investment/Account/"
import { useDispatch, useSelector } from "react-redux"
import { IMessage, SenderRole } from 'src/models/InvestmentModels/message';
import { IUser } from 'src/models/InvestmentModels/user';
import { IAccount } from 'src/models/InvestmentModels/account';
import { getUser } from "src/store/States/Investment/User/helper"
import { getAccount } from "src/store/States/Investment/Account/helper"
import { getMessage, getUnReadMessagesCount, getUpdatedReadMessages } from "src/store/States/Investment/Message/helper"
import { selectServiceID } from "src/store/States/Buffer/"
import { useSubscription } from "@apollo/react-hooks";
import { SubscribeToMessagesBody, SubscribeToMessagesBodyTag } from "src/store/States/Investment/Message/query"
import { Actions as BufferActions, selectReadMessages } from "src/store/States/Buffer"

const RootWrapper = styled(Box)(
  () => `
       height: 100%;
       display: flex;
`
);

const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(3)};
`
);

const ChatMain = styled(Box)(
  () => `
        flex: 1;
`
);

const ChatBottomBar = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(3)};
`
);

function ApplicationsMessenger() {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToBottom();
    }
  });

  const dispatch = useDispatch()
  const messages = useSelector(MessageSelectors.selectMessages) as IMessage[]
  const users = useSelector(UserSelectors.selectUsers) as IUser[]
  const accounts = useSelector(AccountSelectors.selectAccounts) as IAccount[]
  const service_id = useSelector(selectServiceID)
  useEffect(() => {
    MessageAPI.FetchMessages((err: any, data: any) => {
      if (err) throw err
      dispatch(MessageActions.FetchedMessages(data))
    })

    UserAPI.FetchUsers((err: any, data: any) => {
      if (err) throw err
      dispatch(UserActions.FetchedUsers(data))
    })

    AccountAPI.FetchAccounts((err: any, data: any) => {
      if (err) throw err
      dispatch(AccountActions.FetchedAccounts(data))
    })
  }, [])

  const readMessages = useSelector(selectReadMessages)
  const [realMessages, setRealMessages] = useState([])
  const [chatContent, setChatContent] = useState({
    _id: "",
    name: "",
    messages: []
  })

  const clickMessage = (_id: string) => {
    const message = getMessage(_id, messages)
    const uniqueMessages = getUniqueItems([message, ...messages], "_id").filter(item => item.chatID === message.chatID)
    if (message.sender_role === SenderRole.USER) {
      const user = getUser(message.from_user, users)
      setChatContent({
        name: `${user.first_name} ${user.last_name}`,
        _id: message.from_user,
        messages: uniqueMessages
      })
    } else {
      const account = getAccount(message.from_user, accounts)
      setChatContent({
        name: `${account.first_name} ${account.last_name}`,
        _id: message.to_user,
        messages: uniqueMessages,
      })
    }
    dispatch(BufferActions.SetReadMessages(getUpdatedReadMessages(uniqueMessages, readMessages)))
  }

  const [isLoading, setLoading] = useState(false)
  const [sentMessage, setSentMessage] = useState<any>({})

  const sendMessage = (text: string) => {
    setLoading(true)
    service_id && MessageAPI.CreateMessage({
      content: text,
      from_user: service_id,
      sender_role: SenderRole.ADMIN,
      to_user: chatContent._id
    }, (err: any, data: any) => {
      if (err) throw err
      if (data._id) {
        dispatch(MessageActions.AddMessage(data))
        setSentMessage(data)
      }
      setLoading(false)
    })
  }

  const getUniqueItems = (items: any[], tag: string) => {
    const uniqueItems = []
    items.forEach(prop => {
      const foundIndex = uniqueItems.findIndex(_prop => _prop[tag] === prop[tag])
      if (foundIndex < 0) {
        uniqueItems.push(prop)
      }
    })
    return uniqueItems
  }

  useEffect(() => {
    if (Object.keys(sentMessage).length > 0) {
      const uniqueMessages = []
      messages.forEach((message: any) => {
        const foundIndex = uniqueMessages.findIndex((item: any) => item.chatID === message.chatID)
        if (foundIndex < 0) {
          if (message.sender_role === SenderRole.ADMIN) {
            const from_user = getAccount(message.from_user, accounts)
            const to_user = getUser(message.to_user, users)
            uniqueMessages.push({ ...message, from_user, to_user, name: `${from_user.first_name} ${from_user.last_name}` })
          } else if (message.sender_role === SenderRole.USER) {
            const from_user = getUser(message.from_user, users)
            const to_user = getAccount(message.to_user, accounts)
            uniqueMessages.push({ ...message, from_user, to_user, name: `${from_user.first_name} ${from_user.last_name}` })
          }
        }
      })
      setRealMessages(uniqueMessages)
      if (sentMessage.sender_role === SenderRole.USER) {
        const user = getUser(sentMessage.from_user, users)
        if (user.service_id === chatContent._id) {
          setChatContent({
            _id: String(chatContent._id),
            name: chatContent.name,
            messages: messages.filter((item: any) => item.chatID === sentMessage.chatID),
          })
          dispatch(BufferActions.SetReadMessages(getUpdatedReadMessages(messages.filter((item: any) => item.chatID === sentMessage.chatID), readMessages)))
        }
      } else {
        const user = getUser(sentMessage.to_user, users)
        if (user.service_id === chatContent._id) {
          setChatContent({
            _id: String(chatContent._id),
            name: chatContent.name,
            messages: messages.filter((item: any) => item.chatID === sentMessage.chatID),
          })
          dispatch(BufferActions.SetReadMessages(getUpdatedReadMessages(messages.filter((item: any) => item.chatID === sentMessage.chatID), readMessages)))
        }
      }
    } else {
      const uniqueMessages = []
      messages.forEach((message: any) => {
        const foundIndex = uniqueMessages.findIndex((item: any) => item.chatID === message.chatID)
        if (foundIndex < 0) {
          if (message.sender_role === SenderRole.ADMIN) {
            const from_user = getAccount(message.from_user, accounts)
            const to_user = getUser(message.to_user, users)
            uniqueMessages.push({ ...message, from_user, to_user, name: `${from_user.first_name} ${from_user.last_name}` })
          } else if (message.sender_role === SenderRole.USER) {
            const from_user = getUser(message.from_user, users)
            const to_user = getAccount(message.to_user, accounts)
            uniqueMessages.push({ ...message, from_user, to_user, name: `${from_user.first_name} ${from_user.last_name}` })
          }
        }
      })
      setRealMessages(uniqueMessages)
    }
  }, [messages, setRealMessages, sentMessage, setChatContent])

  let { data, loading } = useSubscription(SubscribeToMessagesBody(service_id), {});

  useEffect(() => {
    if (data) {
      if (data[SubscribeToMessagesBodyTag]) {
        setSentMessage(data[SubscribeToMessagesBodyTag])
        dispatch(MessageActions.AddMessage(data[SubscribeToMessagesBodyTag]))
      }
    }
  }, [loading, data, setSentMessage]);

  return (
    <>
      <Helmet>
        <title>Messenger - Applications</title>
      </Helmet>
      <RootWrapper>
        <Sidebar>
          <Scrollbars autoHide>
            <SidebarContent
              messages={realMessages}
              clickMessage={clickMessage}
              allMessages={messages}
            />
          </Scrollbars>
        </Sidebar>
        <ChatWindow>
          <ChatTopBar>
            <TopBarContent
              name={chatContent.name}
            />
          </ChatTopBar>
          <ChatMain>
            <Scrollbars ref={ref} autoHide>
              <ChatContent
                name={chatContent.name}
                messages={chatContent.messages}
              />
            </Scrollbars>
          </ChatMain>
          <ChatBottomBar>
            <BottomBarContent
              sendMessage={sendMessage}
              disabled={!(chatContent.name.length > 0)}
              isLoading={isLoading}
            />
          </ChatBottomBar>
        </ChatWindow>
      </RootWrapper>
    </>
  );
}

export default ApplicationsMessenger;