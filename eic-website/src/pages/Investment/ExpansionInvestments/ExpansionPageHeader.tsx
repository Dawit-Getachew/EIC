import { Typography, Grid } from '@mui/material';
import { useNavigate } from "react-router"
import { Selectors as BufferSelectors } from "src/store/States/Buffer"
import { useSelector } from "react-redux"

const PageHeader = () => {
  const navigate = useNavigate()
  const user_obj = useSelector(BufferSelectors.selectUserObject)
  const username = `${user_obj? user_obj.first_name : ''}`
  return (
    <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: 40 }}>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          My Investment Permit expansion requests
        </Typography>
        <Typography variant="subtitle2">
          {username}, these are your recent investment permits
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
