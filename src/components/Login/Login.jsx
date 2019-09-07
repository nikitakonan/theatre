import React, { Component } from 'react';
import { Button, TextField, Paper } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { logIn } from "../../api";
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
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleLogin = event => {
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
                <Paper className="form-container">
                    <form className="login-form" onSubmit={this.handleLogin}>
                        <TextField
                            required
                            width="100%"
                            name="email"
                            label="email"
                            margin="normal"
                            value={email}
                            onChange={this.handleInputChange} />
                        <TextField
                            required
                            type="password"
                            name="password"
                            label="password"
                            margin="normal"
                            value={password}
                            onChange={this.handleInputChange} />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleLogin}>
                            Войти
                        </Button>
                        {error && <div className="error">{error}</div>}
                    </form>
                </Paper>
            </div>
        );
    }
}
