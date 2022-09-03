import { Typography, Grid } from '@mui/material';

const PageHeader = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: 40 }}>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Request Residence Permit
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
