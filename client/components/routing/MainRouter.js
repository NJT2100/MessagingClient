import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Signin from '../login/signin/Signin'
import Signup from '../login/signup/Signup'
import Dashboard from '../Dashboard/Dashboard'

const MainRouter = () => (
    <div>
        <Switch>
            <PrivateRoute path="/" component={Dashboard} exact/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signin" component={Signin}/>
        </Switch>
    </div>
)

export default MainRouter