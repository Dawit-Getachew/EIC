import { useState, FC } from "react"
import {
  Card,
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  Hidden,
  TextField,
  Divider,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
        height: 40px !important;
        margin: 0 ${theme.spacing(2)};
        align-self: center;
`
);

const Input = styled('input')({
  display: 'none'
});

interface Props {
  sendMessage: (text: string) => void;
  disabled: boolean;
  isLoading: boolean;
}

const BottomBarContent: FC<Props> = (props) => {
  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [text, setText] = useState("")

  const handleChange = (event: any) => {
    setText(event.target.value)
  }

  const sendMessage = () => {
    if (text.length > 0) {
      props.sendMessage(text)
      setText("")
    }
  }

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Hidden mdDown>
        <Avatar alt={user.name} src={user.avatar} />
        <DividerWrapper orientation="vertical" flexItem />
      </Hidden>
      <Box sx={{ flex: 1, mr: 2 }}>
        <TextField
          hiddenLabel
          fullWidth
          placeholder="Write here your message..."
          onChange={handleChange}
          value={text}
        />
      </Box>
      <Tooltip arrow placement="top" title="Choose an emoji">
        <IconButton color="primary">😀</IconButton>
      </Tooltip>
      <Input accept="image/*" id="messenger-upload-file" type="file" />
      <Tooltip arrow placement="top" title="Attach a file">
        < label htmlFor="messenger-upload-file" >
          <IconButton color="primary" component="span">
            <AttachFileTwoToneIcon />
          </IconButton>
        </label >
      </Tooltip >
      <Hidden mdDown>
        <DividerWrapper orientation="vertical" flexItem />
        {props.isLoading ? <CircularProgress /> :
          <Button startIcon={<SendTwoToneIcon />} variant="contained" onClick={sendMessage} disabled={props.disabled}>
            Send
          </Button>}
      </Hidden>
    </Card>
  );
}

export default BottomBarContent;
