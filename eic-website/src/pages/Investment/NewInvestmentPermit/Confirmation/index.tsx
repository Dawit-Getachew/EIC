import React from "react"
import {
  Grid, Button
} from '@mui/material';
import './styles.css'
import RightIcon from "src/assets/background-confirm.png"
import routes from "src/routes"
import { useNavigate } from "react-router"

const Confirmation = () => {
  const navigate = useNavigate()
  return (
    <div className="main-confirmation">
      <Grid
        container
        width="100%"
        spacing={4}
        justifyContent="center"
        direction="row"
      >
        <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
          <img src={RightIcon} className="confirm-icon" />
        </Grid>
      </Grid>
      <Grid
        container
        width="100%"
        spacing={4}
        justifyContent="center"
        direction="row"
      >
        <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
          <div className="confirm-title">Sucessfully Submitted!</div>
        </Grid>
      </Grid>
      <Grid
        container
        width="100%"
        spacing={4}
        justifyContent="center"
        direction="row"
      >
        <Grid item md={6} style={{ display: "flex", justifyContent: "center" }}>
          <div className="confirm-description">Your Investment application has sucessfully been submitted. Track your request in the application menu.</div>
        </Grid>
      </Grid>
      <Grid
        container
        width="100%"
        spacing={4}
        justifyContent="center"
        direction="row"
      >
        <Grid item md={3} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              border: "2px solid #707070",
              borderRadius: 10,
              width: "100%",
              marginTop: "25%"
            }}
            onClick={() => navigate(routes.INVESTMENT.SERVICES.ROUTE, { replace: true })}
          >Back to Service</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Confirmation