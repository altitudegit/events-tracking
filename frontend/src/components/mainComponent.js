import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Dashboard from './dashboardComponent'
import Login from './loginComponent'
import PageNotFound from './pageNotFoundComponent'

export default class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={ Dashboard }/>
                <Route path='/login' component={ Login }/>
                <Route component={ PageNotFound } />
            </Switch>
        );
    }
};