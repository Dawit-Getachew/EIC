import { FC, useState } from "react"
import './styles.css'
import {
  Grid, Container, TextField, Button, CircularProgress
} from "@mui/material"
import Logo from "../assets/vector.png"
import Placeholder from "../assets/image-1.png"
import "@fontsource/poppins"

interface Props {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  signup_link: string;
}

const LoginPage: FC<Props> = (props) => {
  return (
    <div className="main-container">
      <div className="top-container">
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={5} style={{ paddingLeft: 0 }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={6}>
                  <div className="left-side-container">
                    <div className="font-face font-poppins">
                      <img src={Logo} alt="logo" className="logo" /> NIONLITE
                    </div>
                    <div className="class-sign-up-to">
                      Sign In to
                    </div>
                    <div className="class-sign-up-to-h2">
                      Lorem Ipsum is simply
                    </div>
                    <div className="class-sign-up-to-h3">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <img src={Placeholder} alt="logo" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7} direction="column">
              <div className="form-container">
                <Grid
                  container
                  direction="column"
                  spacing={3}
                  width="100%"
                >
                  <Grid
                    item
                    direction="row"
                    spacing={3}
                    width="100%"
                    className="form-container-left"
                  >
                    <Grid item xs={6} id="font-face">
                      <div className="form-welcome-container">
                        <div className="form-welcome-title">
                          Welcome to <div className="form-welcome-title-name">&nbsp;LOREM</div>
                        </div>
                        <div className="form-welcome-signup">
                          Sign In
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="form-right-side">
                        <div className="form-right-side-title">
                          Don't have an account?
                        </div> <br />
                        <div className="form-right-side-signin">
                          Sign up
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  direction="column"
                  spacing={3}
                  width="100%"
                >
                  <div style={{ fontSize: 16, width: 400, fontFamily: "Poppins" }}>
                    Enter your username or email address
                    <TextField
                      placeholder="Username or Email Address"
                      className="input-full-name"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  style={{ marginTop: 30 }}
                  xs={12}
                  width="100%"
                >
                  <div className="input-basic-label">
                    Password
                    <TextField
                      type="password"
                      placeholder="Password"
                      className="input-full-width"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  style={{ marginTop: 50, marginBottom: 70 }}
                  width="100%"
                >
                  <Button variant="contained" color="primary" className="submit-full-button" style={{ padding: 13 }} disabled={props.isLoading} onClick={() => props.onSubmit({})}>
                    {props.isLoading? <CircularProgress /> : <div className="font-poppins">Sign In</div> }
                  </Button>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="bottom-container"></div>
    </div>
  )
}

export default LoginPage