import React from 'react';
import { Redirect } from "react-router-dom";

import { authAction } from '../actions/authAction.js'

export default class Login extends React.Component {
    state = {
        authenticated: false,
        username: '',
        password: ''
    }
  
    componentWillMount() {
        authAction.validateUser().then((response) => {
            this.setState({ authenticated: true });
        }).catch(() => {
        });
    }
    
    login = () => {
        const params = {
            email: this.state.username,
            password: this.state.password
        }
        authAction.login(params).then(() => {
            this.setState({ authenticated: true });
        }).catch(() => {
        });
    };

    handleChange = (event) => {
        this.setState({ [event.target.id] : event.target.value})
    };
  
    render() {
        const { from } = { from: { pathname: "/" } };
        if (this.state.authenticated) {
          return <Redirect to={from} />;
        }
    
        return (
          <div className="row">
              <div className="mx-auto col-12 col-sm-6 col-md-4 mt-5">
  
                  <div className="hidden">{this.state.authenticated}</div>
                  <div className="row">
                      <div className="col-12 mt-2 ">
                          <input className="w-100" type="text" placeholder="Username" value={this.state.username} id="username" onChange={this.handleChange}></input>
                      </div>
                      <div className="col-12 mt-2">
                          <input className="w-100" type="password" placeholder="Password" value={this.state.password} id="password" onChange={this.handleChange}></input>
                      </div>
                      <div className="col-12 mt-2">
                          <button className="w-100 btn btn-primary" onClick={this.login} type="button">Log in</button>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
  }
  