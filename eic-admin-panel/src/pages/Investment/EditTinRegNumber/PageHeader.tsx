import { FC, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Tooltip,
  CircularProgress
} from "@mui/material";
import ApproveIcon from "@mui/icons-material/DoneAllOutlined";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { useSelector } from "react-redux";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import routes from "src/constants/routes"
import { useNavigate } from "react-router"

interface Props {
  name: string
  handleSubmit: () => void
  isLoading: boolean
}
const PageHeader: FC<Props> = (props) => {
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  const savedBuffer = useSelector(BufferSelectors.selectNewPermitBuffer);
  const navigate = useNavigate()
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }} onClick={() => {
            navigate(routes.INVESTMENT.INVESTMENT_PERMIT.ROUTE, { replace: true })
          }}>
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
                Now editing {props.name}'s company name
              </Typography>
              <Typography variant="subtitle2">
                This is a page will edit the name and add registration and tin number to the business
              </Typography>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Button
              style={{
                border: "solid #0F91D2 2px",
                borderRadius: 5,
                backgroundColor: "#FBFDFE",
                color: "#0F91D2",
                fontSize: 10
              }}
              disabled={props.isLoading}
              // onClick={updateCompnayName}
              onClick={props.handleSubmit}
            >
              {props.isLoading ? <CircularProgress /> : (
                <>
                  <ApproveIcon />
                  Approve Compnay Name
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PageHeader;
