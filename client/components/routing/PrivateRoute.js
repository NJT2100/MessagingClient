import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../auth/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth.isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} /> 
)

export default PrivateRoute