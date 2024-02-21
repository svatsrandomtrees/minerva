import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, FormGroup, FormLabel, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import "./login.css";
import Logo from "../../assets/images/app-logo.svg";
import searchImage from "../../assets/images/search-engines-rafiki.svg";
import googleIcon  from "../../assets/images/google-icon.svg";
import microsoftIcon  from "../../assets/images/microsoft-icon.svg";
import appleIcon from "../../assets/images/apple-icon.svg";
const loginAPI = 'https://tararoutray.com/demo/react-auth/login.php';

const ContainerStyle = styled(Container)`
  background-color: #00004E;
  max-width: 100%;
`;

const Login = () => {
    const navigate = useNavigate();
    const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    if (inputUsername !== "admin" || inputPassword !== "admin") {
      setShow(true);
    }
    setLoading(false);
  };

  const handlePassword = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

    const submitLoginForm = (event) => {
        event.preventDefault();
        const formElement = document.querySelector('#loginForm');
        const formData = new FormData(formElement);
        const formDataJSON = Object.fromEntries(formData);
        const btnPointer = document.querySelector('#login-btn');
        btnPointer.innerHTML = 'Please wait..';
        btnPointer.setAttribute('disabled', true);
        axios.post(loginAPI, formDataJSON).then((response) => {
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            const data = response.data;
            const token = data.token;
            if (!token) {
                alert('Unable to login. Please try after some time.');
                return;
            }
            localStorage.clear();
            localStorage.setItem('user-token', token);
            setTimeout(() => {
                navigate('/');
            }, 500);
        }).catch((error) => {
            btnPointer.innerHTML = 'Login';
            btnPointer.removeAttribute('disabled');
            alert("Oops! Some error occured.");
        });
    }
    return (
        <React.Fragment>
            <ContainerStyle className="my-0 m-0 p-0">
                <Row>
                    <Col md={{ span: 6 }}>
                        <div
                            className="sign-in__left_wrapper"
                        >
                            <div className="h4 mb-2 text-center text-warpper">Discover the best of <span className="text-underline color-white">Pfizer</span> with <span className="text-underline color-white">Pfizer search</span></div>
                            <div className="h4 mt-2 mb-2 text-center text-warpper-subtitle">The AI Assistant that guides you to be faster, stronger and better</div>
                            <div>
                                <img
                                    className="img-fluid d-block mb-2"
                                    src={searchImage}
                                    alt="search-image"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={{ span: 6 }}>
                        <div
                            className="sign-in__wrapper"
                            // style={{ backgroundImage: `url(${BackgroundImage})` }}
                        >
                            {/* Overlay */}
                            <div className="sign-in__backdrop"></div>
                            {/* Form */}
                            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                                {/* Header */}
                                <img
                                    className="rounded mx-auto d-block app-logo"
                                    src={Logo}
                                    alt="logo"
                                />
                                {/* <div className="h4 mb-2 login-loading-text">Login In....</div> */}
                                {/* ALert */}
                                {show ? (
                                    <Alert
                                        className="mb-2"
                                        variant="danger"
                                        onClose={() => setShow(false)}
                                        dismissible
                                    >
                                        Incorrect username or password.
                                    </Alert>
                                ) : (
                                    <div />
                                )}
                                <Form.Group className="mb-2" controlId="username">
                                    <Form.Label className="login-label">Email Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={inputUsername}
                                        placeholder="Email Address"
                                        onChange={(e) => setInputUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="password">
                                    <Form.Label className="login-label">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={inputPassword}
                                        placeholder="Password"
                                        onChange={(e) => setInputPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-between">
                                    <div className="mt-0">
                                        <Form.Group className="remember-me" controlId="checkbox">
                                            <Form.Check type="checkbox" label="Remember me" />
                                        </Form.Group>
                                    </div>
                                    <div className="mt-0 forgot-password">
                                        <Button
                                            className="px-0"
                                            variant="link"
                                            onClick={handlePassword}
                                        >
                                            Forgot Password
                                        </Button>
                                    </div>
                                </div>
                                <Button className="w-100 login-button" variant="primary" type="submit" disabled={loading === true}>
                                    {loading === true ? 'Logging In...' : 'Log In' }
                                </Button>
                                <div className="dashed">
                                    <span>or</span>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div className="">
                                        <Button variant="outline-dark social-btn">
                                        <img
                                            className="img-fluid social-btn-img"
                                            src={googleIcon}
                                            alt="google-icon"
                                        />Google
                                        </Button>
                                    </div>
                                    <div className="mt-0">
                                        <Button variant="outline-dark social-btn">
                                            <img
                                                className="img-fluid social-btn-img"
                                                src={microsoftIcon}
                                                alt="microsoft-icon"
                                            />Microsoft
                                        </Button>
                                    </div>
                                    <div className="mt-0">
                                        <Button variant="outline-dark social-btn">
                                            <img
                                                className="img-fluid social-btn-img"
                                                src={appleIcon}
                                                alt="apple-icon"
                                            />Apple
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                            {/* Footer */}
                            {/* <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                                Made by Hendrik C | &copy;2022
                            </div> */}
                        </div>
                    </Col>
                </Row>
            </ContainerStyle>
        </React.Fragment>
    );
}
export default Login;