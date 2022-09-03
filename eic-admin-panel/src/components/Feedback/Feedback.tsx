import { FC, useState, useEffect, ChangeEventHandler } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import "./style.css";
import { FetchEmailByServiceID, SendEmail } from 'src/store/States/User/action'

interface Props {
  investor_id: string;
  subject: string;
}

const Feedback: FC<Props> = ({ investor_id, subject }) => {
  const [feedback, setFeedback] = useState(false);
  const [email, setEmail] = useState<string>("")
  useEffect(() => {
    FetchEmailByServiceID(investor_id, (err: any, data: any) => {
      if (err) throw err
      if (data.email) {
        setEmail(data.email)
      }
    })
  }, [])

  const [comment, setComment] = useState<string>("")
  const handleComment: ChangeEventHandler<HTMLInputElement> = (event) => {
    setComment(event.target.value)
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const sendComment = () => {
    if (email.length > 0 && comment.length > 0) {
      setIsLoading(true)
      SendEmail({
        emailAddress: email,
        subject,
        html: `<b>${comment}</b>`
      }, (err, data) => {
        if (err) throw err
        setIsLoading(false)
        setFeedback(false)
      })
    }
  }

  return (
    <Grid className="sticky-feedback">
      <Grid className="sticky-feedback-wrapper">
        {feedback ? (
          <Grid className="feedback-box">
            <Grid
              className="feedback-box-header"
              onClick={() => setFeedback(false)}
            >
              <AddCommentIcon style={{ color: "white" }} />
              <Typography variant="h4" style={{ color: "white" }}>
                Feedback
              </Typography>
            </Grid>

            <Grid className="feedback-box-body" container>
              <Grid item md={12} xs={12}>
                <FormControl className="flex-c" style={{ width: "100%" }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Write your comments here...
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    maxRows={4}
                    style={{ marginTop: "3px", width: "100%" }}
                    onChange={handleComment}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Button className="feedback-submit" onClick={sendComment} disabled={(email.length === 0) || isLoading}>
              {isLoading? <CircularProgress color="success" /> : "Send Feedback"}
            </Button>
          </Grid>
        ) : null}

        <Grid className="feedback-btn" onClick={() => setFeedback(!feedback)}>
          <AddCommentIcon style={{ color: "white" }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Feedback;
