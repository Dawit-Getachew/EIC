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
import { ExpansionPermitDocument } from "./PrintPermitData"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Selectors as BufferSelectors } from "src/store/States/Buffer/"
import { useSelector } from "react-redux"

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
  const savedBuffer = useSelector(BufferSelectors.selectExpansionPermitBuffer)
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            sx={{ p: 2, mr: 2 }}
            onClick={() => {
              navigate(routes.INVESTMENT.PROJECT_EXPANSION.ROUTE, {
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
                APPLICATION FORM FOR EXPANSION
              </Typography>
              <Typography variant="subtitle2">
                Upgrading Investment Project
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3} justifyContent="flex-end">
            <PDFDownloadLink
              document={<ExpansionPermitDocument data={savedBuffer} />}
              fileName="expansion_permit_document.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading.." : (
                  <Tooltip arrow placement="top" title="Print Expansion Permit Form">
                    <IconButton
                      color="primary"
                      sx={{ p: 2, mr: 2 }}
                    >
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                )
              }
            </PDFDownloadLink>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PageHeader;
