import { FC } from "react";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { useNavigate } from "react-router";
import routes from "src/constants/routes";
import { useSelector } from "react-redux";
import { Selectors as BufferSelectors } from "src/store/States/Buffer";
import { UpdateWorkPermitCancellation } from "src/store/States/WorkPermit/CancelWorkPermit/components"

interface Props {
  name: string;
}
const PageHeader: FC<Props> = (props) => {
  const navigate = useNavigate();
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  const savedBuffer = useSelector(BufferSelectors.selectCancellationPermitBuffer);
  const user_role = useSelector(BufferSelectors.selectUserRole)
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
          <Grid item md={6}>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                Permit for {props.name}
              </Typography>
              <Typography variant="subtitle2">
                This is a page shows every detail of {props.name} work permit
                cancellation
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3}>
            <UpdateWorkPermitCancellation
              user_role={user_role}
              work_permit={savedBuffer}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PageHeader;
