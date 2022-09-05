/* eslint-disable */
import { Grid, Button } from "@mui/material";
import { FC } from "react";
import CloudIcon from "src/assets/cloud-icon.png";
import { useNavigate } from "react-router"
import './main.css'
import './styles.css'

interface DownloadElementProps {
  upload_file_name: string;
  link: string;
}

const DownloadElement: FC<DownloadElementProps> = ({
  upload_file_name, link
}) => {
  return (
    <>
      <Grid item md={12} xs={12}>
        <div className="document-attach-h1">{upload_file_name}</div>
      </Grid>
      <Grid item md={6} xs={12}>
        <div className="document-attach-box">
          <Grid
            container
            width="100%"
            spacing={4}
            justifyContent="flex-start"
            direction="row"
          >
            <Grid item md={4} justifyContent="flex-start">
              <div className="flex-r flex-both-start">
                <img
                  src={CloudIcon}
                  className="cloud-icon"
                />
                <div className="document-attach-h2">{upload_file_name}</div>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="flex-c flex-both-center">
                <div className="document-attach-text">
                  Click download to view in another Tab
                </div>
                <div className="document-attach-text2">
                  JPG, PNG or PDF, file size no more than 10MB
                </div>
              </div>
            </Grid>
            <Grid item md={2}>
              <a target="_blank" href={`${link}`}>
                <Button
                  fullWidth
                  variant="outlined"
                >
                  Download File
                </Button>
              </a>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
}

export default DownloadElement