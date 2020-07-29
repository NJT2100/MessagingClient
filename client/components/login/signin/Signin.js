import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import auth from '../../auth/auth'
import './Signin.css'

class Signin extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    handleOnChange = e => {
        const { target: { value, name } } = e
        this.setState({
            [name]: value
        })
    }

    handleOnSubmit = e => {
        e.preventDefault()
        if (this.state.username.length === 0) {
            this.setState({
                errorMessage: 'Username required.'
            })
            return
        } else if (this.state.password.length === 0) {
            this.setState({
                errorMessage: 'Password required.'
            })
            return
        }
        const data = {
            'username': this.state.username,
            'password': this.state.password
        }
        const url = 'http://localhost:9000/api/user/signin'
        postData(url, data)
            .then(response => {
                if (response.ok) {
                    this.props.history.push('/')
                } else {
                    response.text().then(text => {
                        this.setState({
                            errorMessage: text
                        })
                    })
                }
            })
    }

    render() {
        return (
            <div className="signup-container">
                <h1>Sign In</h1>
                {
                    this.state.errorMessage && (<div className="error-message">{this.state.errorMessage}</div>)
                }
                <form className="form-horizontal" onSubmit={this.handleOnSubmit} noValidate>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <button type="submit" className="btn-submit">SIGN IN</button>
                        </div>
                    </div>
                    <span>Don't have an account? <Link to="/signup">Register</Link></span>
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

export default Signin