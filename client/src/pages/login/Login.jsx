import React, { Component } from "react";
import Axios from 'axios';
import withNavigation from './withNavigation';

 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };

    Axios.post("http://localhost:4000/login", data)
      .then((res) => {
        if (res.status === 200) {
          alert("Login successful");
          localStorage.setItem("user", JSON.stringify(res.data[0] || email));
          // Wait for current-user to be set before navigating
          return Axios.post("http://localhost:4000/set-current-user", { email });
        } else {
          return Promise.reject("Login failed");
        }
      })
      .then(() => {
        window.location.href = "/"; // Only after setting current user
      })
      .catch((err) => {
        console.error("Login or user-setting failed:", err);
        alert("Login failed or server error");
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Login In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

       <div className="remember-wrap">
          <input
            type="checkbox"
            id="rememberMe"
            className="remember-checkbox"
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary text-white">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/sign-up">Sign Up</a>
        </p>
      </form>
    );
  }
}

export default withNavigation(Login);