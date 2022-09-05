/* eslint-disable */
import { FC } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PermitDocument } from "./PrintPermit";
import { useSelector } from "react-redux";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { UpdateWorkPermitReplacement } from "src/store/States/WorkPermit/ReplaceWorkPermit/components"

interface Props {
  name: string;
}
const PageHeader: FC<Props> = (props) => {
  const navigate = useNavigate();
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  const savedBuffer = useSelector(BufferSelectors.selectReplacementPermitBuffer);
  const user_role = useSelector(BufferSelectors.selectUserRole)
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            sx={{ p: 2, mr: 2 }}
            onClick={() => {
              navigate(routes.WORK_PERMIT.WORK_PERMIT_REPLACEMENT.ROUTE, {
                replace: true,
              });
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Grid
          container
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item md={7}>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Replacement Request for {props.name}
              </Typography>
              <Typography variant="subtitle2">
                This is a page shows every detail of {props.name} work permit
                replacement request
              </Typography>
            </Box>
          </Grid>
          <Grid
            container
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            md={5}
          >
            <Grid item md={7}>
              <UpdateWorkPermitReplacement
                user_role={user_role}
                work_permit={savedBuffer}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PageHeader;
