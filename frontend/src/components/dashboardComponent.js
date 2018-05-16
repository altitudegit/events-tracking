import React from 'react';
import { Redirect } from 'react-router-dom';

import { authAction } from '../actions/authAction';
import { eventAction } from '../actions/eventAction'

import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { map } from 'lodash';

import 'react-datepicker/dist/react-datepicker.css';

export default class Dashboard extends React.Component {
    state = {
        startDate: moment().subtract(7, 'days'), 
        endDate: moment(),
        keys: [],
        labels: [],
        title: 'All Events',
        dataPoints: [],
        selectedKey: null,
        authenticated: true
    }

    componentWillMount() {
        if (authAction.isAuthenticated) {
            // authenticated from login
            this.loadData();
        } else {
            // route is loaded first
            authAction.validateUser().then((response) => {
                this.loadData();
            }).catch(() => {
                this.setState({ authenticated: false });
            });
        }
    }
    
    loadData() {
        this.setState({ authenticated: true }, () => {
            eventAction.getKeys().then((results) => {
                this.setState({
                    keys: results.data.data.items   
                }, () => this.filterEvents());
            });   
        });
    }

    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.startDate
        endDate = endDate || this.state.endDate
    
        if (startDate.isAfter(endDate)) {
          endDate = startDate.clone();
        }

        this.setState({ startDate, endDate }, () => this.filterEvents());
    }
    
    handleChangeStart = (startDate) => this.handleChange({ startDate })
    
    handleChangeEnd = (endDate) => this.handleChange({ endDate })
    
    handleSelectKey = (key) => {
        this.setState({
            selectedKey: key
        }, () => this.filterEvents());
    }

    filterEvents = () => {
        const params = {
            key: this.state.selectedKey,
            from: this.state.startDate,
            to: this.state.endDate
        }
    
        eventAction.filterEvents(params).then((results) => {
            const items = results.data.data.items;
            const labels = map(items, 'day');
            const dataPoints = map(items, 'event_count');
            this.setState({
                title: params.key || 'All Events',
                labels: labels,
                dataPoints: dataPoints
            })
        });   
    }

    logout = () => {
        authAction.logout().then(() => {
            this.setState({ authenticated: false});
        });
    }
     
    render() {
        console.log('render dashboard ' + this.state.authenticated);
        if (this.state.authenticated === false) {
            return <Redirect to={{pathname: "/login"}}/>
        }

        const data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: this.state.title,
                    data: this.state.dataPoints,
                    backgroundColor: [
                        'rgba(147, 191, 234, 0.2)',
                    ],
                    borderColor: [
                        'rgba(147, 191, 234, 1)',
                    ],
                    borderWidth: 1
                }
            ]
        }

        return (
            <div className="row mt-5">
                <div className="col-12 text-right">
                    <button onClick={() => this.logout()} type="button" className="btn btn-default btn-md">
                        Log-out
                    </button>
                </div>
                <div className="col-12 col-sm-3">
                    <div className="dropdown">
                        <button 
                            className="btn-sm btn btn-secondary dropdown-toggle w-100" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                            { (this.state.selectedKey || 'All Keys')}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={() => this.handleSelectKey()} key="all">All Keys</a>
                            {this.state.keys.map(key => 
                                <a className="dropdown-item" onClick={() => this.handleSelectKey(key)} key={key}>{key}</a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-3">
                    <DatePicker
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart}
                    />
                </div>
                <div className="col-12 col-sm-3">
                    <DatePicker
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd}
                    />
                </div>
                <div className="col-12">
                    <Line data={data}/>
                </div>
            </div>
        );
    }
};
