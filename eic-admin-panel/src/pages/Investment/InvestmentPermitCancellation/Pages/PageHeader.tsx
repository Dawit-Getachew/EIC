import { FC } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";

interface Props {
  name: string;
}
const PageHeader: FC<Props> = (props) => {
  const navigate = useNavigate();
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }} onClick={() => {
            navigate(routes.INVESTMENT.INVESTMENT_PERMIT_CANCELLATION.ROUTE, { replace: true })
          }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Permit Cancellation for {props.name}
          </Typography>
          <Typography variant="subtitle2">
            This is a page shows every detail of {props.name} investment cancellation request
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default PageHeader;
