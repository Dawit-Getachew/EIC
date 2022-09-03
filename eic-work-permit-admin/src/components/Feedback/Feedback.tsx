import { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  Typography,
  Button,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import "./style.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Feedback = (props) => {
  const [feedback, setFeedback] = useState(true);

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
              <Grid className="feedback-send-notice">
                <Typography
                  variant="h5"
                  style={{ fontWeight: "normal" }}
                  className="notice-txt"
                >
                  {props.children}
                </Typography>
                <ChevronRightIcon />
              </Grid>

              <Grid item md={12} xs={12} className="feedback-input">
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
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Button className="feedback-submit">Send Feedback</Button>
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
