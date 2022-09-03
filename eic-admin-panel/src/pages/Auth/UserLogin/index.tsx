import {
  Alert, TextField, Card, Typography, CardContent, Button, Paper, Stack, CircularProgress
} from "@mui/material";
import styled from "@mui/styled-engine";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { LoginAccount, LoginUser } from "src/store/States/Auth/actions";
import { selectAuth } from "src/store/States/Auth/reducer";
import { Actions } from "src/store/States/Buffer/";
import { ILoginUserInput } from "src/store/States/Auth/user.types";
import routes from "src/constants/routes";
import logo from "./../../../assets/images/core/logo.png";
import { Link } from "react-router-dom";
import { Actions as BufferActions } from "src/store/States/Buffer"
import { useDispatch } from "react-redux"

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

type LoginInputs = {
  email: string;
  password: string;
};

// const for response types
enum type {
  "ValidationErrors" = "ValidationErrors",
  "ValidationError" = "ValidationError",
  "IAccountSimple" = "IAccountSimple",
}

function UserAuth(props: any) {
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);

  // useEffect(() => {
  //   if (props.isAuthenticated) navigate("/categories", { replace: true });
  // }, []);

  const dispatch = useDispatch()
  const onSubmitLoginForm = (input: ILoginUserInput) => {
    setIsLoading(true);
    LoginUser(input, (err: any, data: any, headers: any) => {
      switch (data.__typename) {
        case type.ValidationError:
          setValidationError(data.errors[0].error_message);
          setIsLoading(false);
          break;
        case type.ValidationErrors:
          setIsLoading(false);
          break;
        case type.IAccountSimple:
          console.log("successfully logged in", data);
          setIsLoading(false);
          props.AuthenticateUser(data);
          if (data.service_id) {
            dispatch(BufferActions.SetServiceID(data.service_id))
            dispatch(BufferActions.SetUserObject(data))
          }
          navigate("/", { replace: true });
      }
    });
  };

  const LoginForm = () => (
    <form onSubmit={handleLoginSubmit(onSubmitLoginForm)}>
      {validationError ? (
        <Alert severity="error">{validationError}</Alert>
      ) : null}
      <div className="content">
        <TextField
          sx={{ mt: 1, width: 1 }}
          error={loginErrors.email ? true : false}
          {...registerLogin("phone_number", { required: true })}
          label="Phone Number"
          variant="standard"
          helperText={
            loginErrors.phone_number && <span>This field is required</span>
          }
          margin="dense"
          inputProps={{
            style: {
              paddingBottom: 15,
            },
          }}
        />
      </div>
      <div className="content">
        <TextField
          error={loginErrors.password ? true : false}
          sx={{ mt: 1, width: 1 }}
          {...registerLogin("password", { required: true })}
          type="password"
          label="Password"
          variant="standard"
          helperText={
            loginErrors.password && <span>This field is required</span>
          }
          margin="dense"
          inputProps={{
            style: {
              paddingBottom: 15,
            },
          }}
        />
      </div>

      <div>
        <Typography align="right" sx={{ mt: 1.2 }}>
          <Link
            to="/reset/"
            style={{ textDecoration: "none", color: "#3498db" }}
          >
            Forgot password?
          </Link>
        </Typography>
      </div>

      <div className="action">
        <Button
          sx={{ mt: 5, width: 1, p: 1.5, borderRadius: 40 }}
          variant="contained"
          type="submit"
        >
          {isLoading ? <CircularProgress color="success" /> : "Log In"}
        </Button>
      </div>
    </form>
  );

  return (
    <>
      <Helmet>
        <title>EIC</title>
      </Helmet>
      <MainContent>
        <Box>
          <Card sx={{ minWidth: 350, boxShadow: 0, borderRadius: 0 }}>
            <Box
              component={Stack}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ pl: 4, pr: 4, pt: 4, width: 1 }}
            >
              <Paper
                component={Stack}
                variant="outlined"
                sx={{ border: "none", width: 1 }}
                justifyContent="center"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <img src={"/static/images/eic/eic-logo.jpg"} style={{ width: "150px", margin: "auto" }} />
                <Typography variant="h2" align="center" sx={{ mt: 3 }}>
                  Welcome, Login
                </Typography>
              </Paper>
            </Box>
            <CardContent>
              <CardContent>
                <LoginForm />
              </CardContent>
            </CardContent>
          </Card>
        </Box>
      </MainContent>
    </>
  );
}

const mapStateToProps = (state: any) => selectAuth(state);

const mapDispatchToProps = (dispatch: any) => ({
  AuthenticateUser: (user: any) => dispatch(Actions.Authenticate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);