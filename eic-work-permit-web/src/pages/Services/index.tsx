import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import routes from 'src/routes'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { Actions as BufferActions } from "src/store/States/Buffer"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(BufferActions.SetBreadCrumps([
      {
        path: '/',
        title: 'Home'
      },
      {
        path: '/invest/services',
        title: 'Services'
      }
    ]))
  }, [])
  
  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 28, fontFamily: "Inter" }}>Services</div>
      <div style={{ fontSize: 14, fontFamily: "Inter" }}>Here are your services for all your investment needs.</div>
      <Grid container width="100%" justifyContent="space-between" style={{ marginTop: 50 }} spacing={4}>
        <Grid item md={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" style={{ marginBottom: 20 }}>
                New Investment Permit
              </Typography>
              <Typography variant="body2">
                Create your permit to start your work
                <br />
                Get started instantly by uploading your forms
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate(routes.WORK_PERMIT.NEW_WORK_PERMIT.ROUTE, { replace: true })}>
                <ArrowRightIcon />
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" style={{ marginBottom: 20 }}>
                Renew Investment Permit
              </Typography>
              <Typography variant="body2">
                Renew your permit today with a click of a button
                <br />
                Will only take a few moments
              </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={() => navigate(routes.WORK_PERMIT.RENEW_INVESTMENT_PERMIT.ROUTE, { replace: true })}>
                <ArrowRightIcon />
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container width="100%" justifyContent="space-between" style={{ marginTop: 50 }} spacing={4}>
        <Grid item md={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" style={{ marginBottom: 20 }}>
                Expansion Requests
              </Typography>
              <Typography variant="body2">
                Expand your investment permits to fit your goals
                <br />
                You can get your on going requests on this page.
              </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={() => navigate(routes.WORK_PERMIT.EXPANSION_INVESTMENT_PERMIT_LIST.ROUTE, { replace: true })}>
                <ArrowRightIcon />
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" style={{ marginBottom: 20 }}>
                Renew Work Permit
              </Typography>
              <Typography variant="body2">
                Renew your permit today with a click of a button
                <br />
                Will only take a few moments
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <ArrowRightIcon />
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}