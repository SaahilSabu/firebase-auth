import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      let user = await login(emailRef.current.value, passwordRef.current.value);
      user && navigate("/");
    } catch (error) {
      setError("Failed to login !");
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <div>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <h2 className="text-center mb-3">Log in</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="mt-2">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                ref={passwordRef}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/password-reset">Forgot your password ?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Dont have an account ? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
