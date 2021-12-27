import React, { useContext, useState } from "react";
import "./Login.css";
import { toast } from "react-hot-toast";
import { FirebaseInitialize, handleGoogleSignIn, jwtToken, SignInUser, SignUpNewUser } from "./LoginManager";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigator = useNavigate();
  const { register: registerSignIn, handleSubmit: handleSignIn, formState: { errors } } = useForm();
  const { register: registerSignUp, handleSubmit: handleSignUp } = useForm();

  const [ loggedInUser, setLoggedInUser] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);
  console.log(loggedInUser);
  const onSubmit = (data) => {
    const loading = toast.loading('Please wait...')
    const { email, password, name } = data;

    if (!newUser && email && password) {
      FirebaseInitialize();
      SignInUser(email, password)
      .then((res) => {
        toast.dismiss(loading);
        HandleResponse(res)
      })
      .catch((err) => {
        toast.dismiss(loading)
        toast.error(err.message)
      })
    }

    if (newUser && email && password && name) {
      FirebaseInitialize();
       SignUpNewUser(name, email, password)
      .then((res) => {
        toast.dismiss(loading);
        HandleResponse(res)
      })
      .catch((err) => {
        toast.dismiss(loading)
        toast.error(err.message)
      })
    }
  };

  const HandleGoogleSignIn = () => {
    const loading = toast.loading("Please wait...");
    FirebaseInitialize();
    handleGoogleSignIn()
      .then((res) => {
        toast.dismiss(loading);
        HandleResponse(res);
        console.log(res)
      })
      .catch((err) => {
        toast.dismiss(loading);
        toast.error(err.message);
      });
  };

  const HandleFacebookSignIn = () => {
    console.log('Facebook')
  }

  const HandleResponse = (res) => {
    toast.success("Successfully Logged In");
    localStorage.setItem('login', JSON.stringify(res))
    setLoggedInUser(res)
    jwtToken();
    navigator(-1);
  };

  return (
    <div className="login-container">
      <div
        className={newUser ? "wrapper__area sign-up__Mode-active" : ""}
        id="wrapper__area"
      >
        <div className="forms__area">
          <form
            onSubmit={handleSignIn(onSubmit)}
            className="login__form"
            id="loginForm"
          >
            <h1 className="form__title">Sign In!</h1>

            <div className="input__group">
              <label className="field">
                <input
                  id="signUpUsername"
                  placeholder="Enter Your Email Address"
                  type="email"
                  {...registerSignIn("email", { required: true })}
                />
                {errors.email && <span>Email is required</span>}
              </label>
            </div>

            <div className="input__group">
              <label className="field">
                <input
                  id="signUpUsername"
                  placeholder="Password123..."
                  type="password"
                  {...registerSignIn("password", { pattern: /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9!#$%&?]{8,20}$/ }, { required: true })}
                />
                {errors.password && <span>Password is required</span>}
              </label>
            </div>

            <input
              className="submit-button"
              id="loginSubmitBtn"
              type="submit"
              value="Sign In"
            />

            <div className="alternate-login">
              <div className="link">
                <i className="bx bxl-google"></i>
                <span onClick={HandleGoogleSignIn}>Google</span>
              </div>
              <div className="link">
                <i className="bx bxl-facebook-circle"></i>
                <span>Facebook</span>
              </div>
            </div>
          </form>

          <form
            onSubmit={handleSignUp(onSubmit)}
            className="sign-up__form"
            id="signUpForm"
          >
            <h1 className="form__title">Sign Up!</h1>

            <div className="input__group">
              <label className="field">
                <input
                  type="text"
                  placeholder="Username"
                  id="signUpUsername"
                  {...registerSignUp("name", { required: true })}
                />
                {errors.name && <span>Name is required</span>}
              </label>
            </div>

            <div className="input__group">
              <label className="field">
                <input
                  id="signUpUsername"
                  placeholder="Email@example.com"
                  type="email"
                  {...registerSignUp("email", { required: true })}
                />
                {errors.email && <span>Email is required</span>}
              </label>
            </div>

            <div className="input__group">
              <label className="field">
                <input
                  type="password"
                  placeholder="Password123..."
                  id="signUpPassword"
                  {...registerSignUp("password", { pattern: /^(?=.*[a-z]).{8,}$/ }, { required: true })}
                />
                {errors.password && <span>Password is required</span>}
              </label>
            </div>

            <input
              className="submit-button"
              id="signUpSubmitBtn"
              type="submit"
              value="Sign Up"
            />

            <div className="alternate-login">
              <div className="link">
                <i className="bx bxl-google"></i>
                <span onClick={HandleGoogleSignIn}>Google</span>
              </div>
              <div className="link">
                <i className="bx bxl-facebook-circle"></i>
                <span onClick={HandleFacebookSignIn}>Facebook</span>
              </div>
            </div>
          </form>
        </div>

        <div className="aside__area">
          <div className="login__aside-info">
            <h4>Hello</h4>
            <img src="https://d.top4top.io/p_1945xjz2y1.png" alt="img" />
            <p>Enter your personal details and start journey with us</p>
            <button onClick={() => setNewUser(!newUser)}>Sign Up</button>
          </div>
          <div className="sign-up__aside-info">
            <h4>Welcome</h4>
            <img src="https://e.top4top.io/p_1945sidbp2.png" alt="img" />
            <p>
              To Keep connected with us please login with your personal info
            </p>
            <button onClick={() => setNewUser(!newUser)}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
