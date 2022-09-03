import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, CircularProgress } from "@mui/material/";

interface Props {
  goPrev: () => void;
  onSubmit: () => void;
}

const ProjectConfirmation: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Grid container>
        <Grid
          item
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h1"
            component="h1"
            sx={{ mb: 3, mt: 2 }}
          >
            THANK YOU
          </Typography>
        </Grid>

        <Grid
          item
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h3" component="h3">
            To finish your permit application please click finish.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid
          item
          md={6}
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
            variant="contained"
            color="secondary"
            type="button"
            onClick={props.goPrev}
            disabled={isLoading}
          >
            PREVIOUS
          </Button>

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              sx={{ margin: 1, pb: 1.2, pt: 1.2, pl: 4, pr: 4 }}
              variant="contained"
              color="primary"
              type="button"
              onClick={() => {
                setIsLoading(true);
                props.onSubmit();
              }}
              disabled={isLoading}
            >
              FINISH
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectConfirmation;
