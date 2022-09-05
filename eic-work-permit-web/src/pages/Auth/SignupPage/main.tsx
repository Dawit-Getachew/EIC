/* eslint-disable */
import React, { useEffect, useReducer, useState } from "react"
import './styles.css'
import {
  Grid, Container, TextField, Button, CircularProgress
} from "@mui/material"
import { Link } from "react-router-dom"
import Logo from "src/assets/vector.png"
import Placeholder from "src/assets/image-1.png"
import { formInitState, formReducer, register, formSubmit, setFormDefaults } from "src/common/form"
import { SignupUser } from "src/store/States/Auth/actions"
import { Gender } from "src/store/States/Auth/user.types"
import { Actions as BufferActions } from "src/store/States/Buffer"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"


const SignupPage = () => {
  const inputs = [
    "phone_number", "email", "password", "full_name"
  ]

  const [formState, dispatch] = useReducer(formReducer, formInitState)
  const [isLoading, setIsLoading] = useState(false)

  const dispatchAction = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (data: any) => {
    setIsLoading(true)
    SignupUser({
      email: data.email,
      first_name: data.full_name,
      gender: Gender.MALE,
      last_name: data.full_name,
      middle_name: data.full_name,
      password: data.password,
      phone_number: data.phone_number,
      role: "USER"
    }, (err: any, new_data: any) => {
      if (err) throw err
      setIsLoading(false)
      if (new_data._id) {
        dispatchAction(BufferActions.Authenticate())
        navigate("/", { replace: true })
        window.location.reload()
      }
    })
  }

  const submitFunction = () => {
    formSubmit(dispatch)
  }

  useEffect(() => {
    setFormDefaults(inputs, handleSubmit, dispatch)
  }, [dispatch])


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
                      <img src={Logo} alt="logo" className="logo" /> NIONLINE
                    </div>
                    <div className="class-sign-up-to">
                      Sign Up to
                    </div>
                    <div className="class-sign-up-to-h2">
                      This is Onionline
                    </div>
                    <div className="class-sign-up-to-h3">
                      A portal for investors in which they can process their investment needs to get started with their business.
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
                        <div className="form-welcome-title" style={{ marginTop: 10 }}>
                          Welcome to
                        </div>
                        <div className="form-welcome-title-name">&nbsp;Onionline</div>
                        <div className="form-welcome-signup">
                          Sign Up
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="form-right-side">
                        <div className="form-right-side-title">
                          <Link to="/auth/login" style={{ textDecoration: "none", textAlign: "end" }}>
                            Already have an account?
                          </Link>
                        </div> <br />
                        <div className="form-right-side-signin">
                          <Link to="/auth/login" style={{ textDecoration: "none" }}>
                            Sign In
                          </Link>
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
                  <div className="input-basic-label">
                    Enter your Full name
                    <TextField
                      placeholder="Full Name"
                      className="input-full-width"
                      {...register("full_name", formState, dispatch)}
                    />
                  </div>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  width="100%"
                  direction="row"
                  style={{ marginTop: 20 }}
                >
                  <Grid item xs={6}>
                    <div className="input-basic-label">
                      Email
                      <TextField
                        type="email"
                        placeholder="Email"
                        className="input-basic"
                        {...register("email", formState, dispatch)}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="input-basic-label">
                      Contact Number
                      <TextField
                        placeholder="Contact Number"
                        className="input-basic"
                        {...register("phone_number", formState, dispatch)}
                      />
                    </div>
                  </Grid>
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
                      {...register("password", formState, dispatch)}
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  style={{ marginTop: 50, marginBottom: 70 }}
                  width="100%"
                >
                  <Button variant="contained" color="primary" className="submit-full-button" style={{ padding: 13 }} onClick={submitFunction}>
                    {isLoading ? <CircularProgress /> : <div className="font-poppins">Sign Up</div>}
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

export default SignupPage