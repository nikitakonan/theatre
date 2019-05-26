import React, { Component } from 'react';
import { logIn } from "../api";
import { Redirect } from "react-router-dom";
import './login.css';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
            error: null
        };
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleLogin(event) {
        event.preventDefault();
        const { email, password } = this.state;

        logIn(email, password)
            .then(() => {
                this.setState({
                    redirectToReferrer: true,
                    email: '',
                    password: '',
                });
            })
            .catch(reason => {
                this.setState({
                    error: reason.message
                });
            });
    }
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer, email, password, error } = this.state;
        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        return (
            <div>
                <form className="login-form" onSubmit={this.handleLogin.bind(this)}>
                    <label className="label" htmlFor="email">
                        email
                        <input placeholder="email"
                               className="input"
                               id="email"
                               name="email"
                               type="email"
                               value={email}
                               onChange={this.handleInputChange.bind(this)}/>
                    </label>
                    <label className="label" htmlFor="pwd">
                        password
                        <input placeholder="password"
                               className="input"
                               id="pwd"
                               name="password"
                               type="password"
                               value={password}
                               onChange={this.handleInputChange.bind(this)}/>
                    </label>

                    <button className="button" onClick={this.handleLogin.bind(this)}>Log in</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        );
    }
}
