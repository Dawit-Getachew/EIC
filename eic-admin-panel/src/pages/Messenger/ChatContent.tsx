import { FC } from "react"
import { Box, Avatar, Typography, Card, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  formatDistance,
  format,
  subDays,
  subHours,
  subMinutes
} from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { SenderRole } from "src/models/InvestmentModels/message"

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.colors.alpha.black[50]};
      }
`
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

interface Props {
  name: string
  messages: any[]
}

const ChatContent: FC<Props> = (props) => {
  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const renderFromUser = (text: string, createdAt: string) => (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-start"
      py={3}
      key={createdAt}
    >
      <Avatar
        variant="rounded"
        sx={{ width: 50, height: 50 }}
        alt="Zain Baptista"
        src="/static/images/avatars/2.jpg"
      />
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="flex-start"
        ml={2}
      >
        <CardWrapperSecondary>
          {text}
        </CardWrapperSecondary>
        <Typography
          variant="subtitle1"
          sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
        >
          <ScheduleTwoToneIcon sx={{ mr: 0.5 }} fontSize="small" />
          {formatDistance(subHours(new Date(createdAt), 0), new Date(), {
            addSuffix: true
          })}
        </Typography>
      </Box>
    </Box>
  )

  const renderAdminReply = (text: string, createdAt: string) => (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="flex-end"
      py={3}
      key={createdAt}
    >
      <Box
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
        justifyContent="flex-end"
        mr={2}
      >
        <CardWrapperPrimary>
          {text}
        </CardWrapperPrimary>
        <Typography
          variant="subtitle1"
          sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
        >
          <ScheduleTwoToneIcon sx={{ mr: 0.5 }} fontSize="small" />
          {formatDistance(subHours(new Date(createdAt), 0), new Date(), {
            addSuffix: true
          })}
        </Typography>
      </Box>
      <Avatar
        variant="rounded"
        sx={{ width: 50, height: 50 }}
        alt={user.name}
        src={user.avatar}
      />
    </Box>
  )

  return (
    <Box p={3}>
      <DividerWrapper>
        {format(subDays(new Date(), 3), 'MMMM dd yyyy')}
      </DividerWrapper>

      {props.messages.slice(0).reverse().map(message => {
        return message.sender_role === SenderRole.USER? renderFromUser(message.content, message.createdAt) : renderAdminReply(message.content, message.createdAt)
      })}
    </Box>
  );
}

export default ChatContent;
