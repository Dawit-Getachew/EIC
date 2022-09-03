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
import { MainDocument } from "./PrintPermit";
import { useSelector } from "react-redux";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";

interface Props {
  name: string;
  data: any;
}
const PageHeader: FC<Props> = (props) => {
  const navigate = useNavigate();
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  const savedBuffer = useSelector(BufferSelectors.selectCancellationPermitBuffer);
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            sx={{ p: 2, mr: 2 }}
            onClick={() => {
              navigate(routes.WORK_PERMIT.WORK_PERMIT_CANCELLATION.ROUTE, {
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
          <Grid item md={9}>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Permit for {savedBuffer.company_name}
              </Typography>
              <Typography variant="subtitle2">
                This is a page shows every detail of {savedBuffer.company_name} work permit cancellation
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PageHeader;
