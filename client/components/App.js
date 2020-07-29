import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './routing/MainRouter'
import './App.css'

const App = () => (
    <div className="main-container">
        <BrowserRouter>
            <MainRouter/>
        </BrowserRouter>
    </div>
)

export default hot(module)(App)