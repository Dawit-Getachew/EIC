import { useState } from 'react';
import {
  Box,
  Typography,
  Hidden,
  Button,
  CircularProgress,
  Grid
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { FieldError, useForm } from "react-hook-form"
import "./styles.css"
import { styled } from '@mui/material/styles';
// import { SignUpUser, LoginUser } from 'src/store/States/Auth/actions';
import { IUserInput, ILoginAccountInput } from 'src/store/States/Auth/user.types';
import { useParams, useNavigate } from "react-router-dom";

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

type RegisterInputs = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
}

type LoginInputs = {
  email: string;
  password: string;
}

// const for response types
enum type {
  "ValidationErrors" = "ValidationErrors",
  "ValidationError" = "ValidationError",
  "IAccountSimple" = "IAccountSimple",
};


function UserAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [validationError, setValidationError] = useState(null);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const signUpUser = (input: IUserInput) => {
    setIsLoading(true)
    // SignUpUser(input, (err: any, data: any) => {
    //   console.log("here", data)
    //   setIsLoading(false)
    // })
  }
  // let navigate = useNavigate();

  // const loginUser = (input: ILoginInput) => {
  //   setIsLoading(true)
  //   LoginUser(input, (err: any, data: any) => {
  //     switch (data.__typename) {
  //       case type.ValidationError:
  //         setValidationError(data.errors[0].error_message);
  //         setIsLoading(false);
  //         break;
  //       case type.ValidationErrors:
  //         console.log(data)
  //         setIsLoading(false);
  //         break;
  //       case type.IAccountSimple:
  //         console.log("successfully logged in")
  //         console.log(data)
  //         setIsLoading(false)
  //         window.location.href = "/Category"
  //     }
  //   })
  // }


  const {
    register: registerSignup,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: signupErrors },
  } = useForm<RegisterInputs>();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginInputs>();

  const errMessage = (labelText: string) => {
    return <label style={{ color: "red" }}>{labelText}</label>
  }

  // const LoginForm = () => <form onSubmit={handleLoginSubmit(loginUser)}>
  //   <h1>Login</h1>
  //   <span style={{ display: validationError ? " block ruby" : "none", padding: 0 }} className="content">{validationError ? validationError : null}</span>
  //   <div className="content">
  //     <div className="input-field">
  //       <input type="email" placeholder="Email" autoComplete="nope" {...registerLogin("email", { required: "This is a required field" })} />
  //       {loginErrors.email ? errMessage(loginErrors.email.message) : null}
  //     </div>
  //     <div className="input-field">
  //       <input type="password" placeholder="Password" autoComplete="new-password" {...registerLogin("password", { required: "This is a required field" })} />
  //       {loginErrors.password ? errMessage(loginErrors.password.message) : null}
  //     </div>
  //     <a href="#" className="link" onClick={() => setIsLogin(false)}>Don't have an account?</a>
  //   </div>
  //   <div className="action">
  //     <button style={{ display: "none" }}></button>
  //     <button type="submit" onClick={() => setIsLogin(false)}>
  //       {isLoading ? <CircularProgress /> : "Login"}
  //     </button>
  //   </div>
  // </form>

  const SignUpForm = () => <form onSubmit={handleRegisterSubmit(signUpUser)}>
    <h1>Signup</h1>
    <div className="content">
      <div className="input-field">
        <input type="text" placeholder="First Name" autoComplete="nope" {...registerSignup("first_name", { required: "This is a required field" })} />
        {signupErrors.first_name ? errMessage(signupErrors.first_name.message) : null}
      </div>
      <div className="input-field">
        <input type="text" placeholder="Last Name" autoComplete="nope" {...registerSignup("last_name", { required: "This is a required field" })} />
        {signupErrors.last_name ? errMessage(signupErrors.last_name.message) : null}
      </div>
      <div className="input-field">
        <input type="text" placeholder="Phone Number" autoComplete="nope" {...registerSignup("phone_number", { required: "This is a required field" })} />
        {signupErrors.phone_number ? errMessage(signupErrors.phone_number.message) : null}
      </div>
      <div className="input-field">
        <select className="input-field" {...registerSignup("role", { required: "This is a required field" })}>
          <option value="ADMIN">Admin</option>
        </select>
        {signupErrors.role ? errMessage(signupErrors.role.message) : null}
      </div>
      <div className="input-field">
        <input type="email" placeholder="Email" autoComplete="nope" {...registerSignup("email", { required: "This is a required field" })} />
        {signupErrors.email ? errMessage(signupErrors.email.message) : null}
      </div>
      <div className="input-field">
        <input type="password" placeholder="Password" autoComplete="new-password" {...registerSignup("password", { required: "This is a required field" })} />
        {signupErrors.password ? errMessage(signupErrors.password.message) : null}
      </div>
      <a href="#" className="link" onClick={() => setIsLogin(true)}>Already have an account?</a>
    </div>
    <div className="action">
      <button style={{ display: "none" }}></button>
      <button type="submit" onClick={() => setIsLogin(false)}>
        {isLoading ? <CircularProgress /> : "Register"}
      </button>
    </div>
  </form>

  return (
    <>
      <Helmet>
        <title>User Auth Form</title>
      </Helmet>
      <MainContent>

        <div className="login-form">
          {/* {isLogin ? LoginForm() : SignUpForm()} */
            // LoginForm()
          }
        </div>
      </MainContent>
    </>
  );
}

export default UserAuth;