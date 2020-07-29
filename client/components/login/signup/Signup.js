import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'

class Signup extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            username: '',
            password_1: '',
            password_2: '',
            emailMessage: '',
            usernameMessage: '',
            passwordMessage: '',
            passwordMatchMessage: '',
            formValid: true,
        }
    }

    handleOnChange = e => {
        const { target: { value, name } } = e
        this.setState({
            [name]: value
        })
    }

    handleOnSubmit = e => {
        //Prevent default behaviour of onSubmit
        e.preventDefault()
        // Only validate email on submit
        this.validateEmail()
        this.setState((state) => ({
            formValid: !state.emailMessage && !state.usernameMessage &&
                !state.passwordMessage && !state.passwordMatchMessage,
            formErrorMessage: 'There are errors in the below form.' 
        }), () => {
        if (!this.state.formValid) return
        const data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password_1
        }
        const url = "http://localhost:9000/api/user/signup"
        postData(url, data)
            .then(response => {
                if (response.ok) {
                    this.props.history.push('/')
                } else {
                    response.text().then(text => {
                        this.setState({
                            formErrorMessage: text
                        })
                    })
                }
            })})
    }

    validateEmail = () => {
        //Validate that email was entered
        if (this.state.email.length > 0) {
            this.setState({
                emailMessage: ''
            }) 
        } else {
            this.setState({
                emailMessage: 'Email required.',
            }) 
        }
    }

    validateUsername = e => {
        //Validate that the user name meets the length requirement
        if (this.state.username.length < 6 || this.state.username.length > 20) {
            this.setState({
                usernameMessage: 'Username must be 6 - 20 characters.'
            })
        } else {
            this.setState({
                usernameMessage: ''
            })
        }
    }

    validatePassword = e => {
        //Validate that the password meets length requirement
        if (this.state.password_1.length < 6) {
            this.setState({
                passwordMessage: 'Password must consist of at least 6 characters.'
            })
            return
        } else {
            this.setState({
                passwordMessage: '',
            })
        }

        //Validate that password contains atleast one letter and one number
        if (/\d/.test(this.state.password_1) && /[a-zA-Z]/.test(this.state.password_1)) {
            this.setState({
                passwordMessage: ''
            })
        } else {
            this.setState({
                passwordMessage: 'Password must consist of at least 1 letter and 1 number.'
            })
        }

        //if confirm password field is non empty
        if (this.state.password_1.length > 0 && this.state.password_2.length > 0) {
            this.validatePasswordMatch(e)
        }
    }

    validatePasswordMatch = e => {
        //Valdiate that the passwords match
        if (this.state.password_1 === this.state.password_2) {
            this.setState({
                passwordMatchMessage: ''
            })
        } else {
            this.setState({
                passwordMatchMessage: 'Passwords do not match.'
            })
        }
    }

    render() {   
        return (
            <div className="signup-container">
                <h1>Register</h1>
                {
                    !this.state.formValid && (<div className="error-message">{this.state.formErrorMessage}</div>)
                }
                <form className="form-horizontal" onSubmit={this.handleOnSubmit} noValidate>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={this.state.email}
                                onChange={this.handleOnChange}
                            />
                            {
                                this.state.emailMessage && (<div className="error-message">{this.state.emailMessage}</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleOnChange}
                                onBlur={this.validateUsername}
                            />
                            {
                                this.state.usernameMessage && (<div className="error-message">{this.state.usernameMessage}</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="password"
                                name="password_1"
                                placeholder="Password"
                                value={this.state.password_1}
                                onChange={this.handleOnChange}
                                onBlur={this.validatePassword}
                            />
                            {
                                this.state.passwordMessage && (<div className="error-message">{this.state.passwordMessage}</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="password"
                                name="password_2"
                                placeholder="Confirm Password"
                                value={this.state.password_2}
                                onChange={this.handleOnChange}
                                onBlur={this.validatePasswordMatch}
                            />
                            {
                                this.state.passwordMatchMessage && (<div className="error-message">{this.state.passwordMatchMessage}</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <button type="submit" className="btn-submit">REGISTER</button>
                        </div>
                    </div>
                    <span>Already have an account? <Link to="/signin">Sign in</Link></span>
                </form>
            </div>
        )
    }
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode:'cors',
        cache:'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    return response
}

export default Signup