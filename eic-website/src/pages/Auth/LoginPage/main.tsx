import { FC, useEffect, useReducer, useState } from "react"
import './styles.css'
import {
  Grid, Container, TextField, Button, CircularProgress, Alert
} from "@mui/material"
import { Link } from "react-router-dom"
import Logo from "src/assets/vector.png"
import Placeholder from "src/assets/images/eic-logo.png"
import "@fontsource/poppins"
import { formInitState, formReducer, register, formSubmit, setFormDefaults } from "src/common/form"
import { LoginUser } from "src/store/States/Auth/actions"
import { Actions as BufferActions } from "src/store/States/Buffer"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"

interface Props {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  signup_link: string;
}

const LoginPage: FC<Props> = (props) => {
  const inputs = [
    "phone_number", "password"
  ]

  const [formState, dispatch] = useReducer(formReducer, formInitState)
  const [isLoading, setIsLoading] = useState(false)

  const dispatchAction = useDispatch()
  const navigate = useNavigate()
  const [validationError, setValidationError] = useState<string>("")
  const handleSubmit = (data: any) => {
    setIsLoading(true)
    LoginUser({
      phone_number: data.phone_number,
      password: data.password
    }, (err: any, new_data: any) => {
      if (err) throw err
      setIsLoading(false)
      if (new_data._id) {
        dispatchAction(BufferActions.Authenticate())
        navigate("/", { replace: true })
        window.location.reload()
      }
      console.log("--", new_data)
    })
  }

  const onSubmit = () => {
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
                <Grid item xs={12} md={6}>
                  <div className="left-side-container">
                    <div className="font-face font-poppins">
                      <img src={Logo} alt="logo" className="logo" /> NIONLINE
                    </div>
                    <div className="class-sign-up-to">
                      Sign In to
                    </div>
                    <div className="class-sign-up-to-h2">
                      This is Onionline
                    </div>
                    <div className="class-sign-up-to-h3">
                      A portal for investors in which they can process their investment needs to get started with their business.
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img src={Placeholder} alt="logo" style={{ width: '88%', height: '68%' }} />
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
                          Sign In
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="form-right-side">
                        <div className="form-right-side-title">
                          <Link to="/auth/sign-up" style={{ textDecoration: "none" }}>
                            Don't have an account?
                          </Link>
                        </div> <br />
                        <div className="form-right-side-signin">
                          <Link to="/auth/sign-up" style={{ textDecoration: "none" }}>
                            Sign up
                          </Link>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  {validationError.length > 0 ? (
                    <Alert severity="error">{validationError}</Alert>
                  ) : null}
                </Grid>
                <Grid
                  item
                  style={{ marginTop: 30 }}
                  xs={12}
                  width="100%"
                >
                  <div className="input-basic-label">
                    Enter Phone Number
                    <TextField
                      placeholder="Phone Number"
                      type="tel"
                      className="input-full-width"
                      {...register("phone_number", formState, dispatch)}
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
                      {...register("password", formState, dispatch)}
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  style={{ marginTop: 50, marginBottom: 70 }}
                  width="100%"
                >
                  <Button variant="contained" color="primary" className="submit-full-button" style={{ padding: 13 }} disabled={props.isLoading} onClick={onSubmit}>
                    {isLoading ? <CircularProgress color="success" /> : <div className="font-poppins">Sign In</div>}
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