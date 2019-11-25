import React, { Component } from 'react';

class HealthCheck extends Component {
	constructor(props){
		super(props);

		this.state = {
			status: ""
		}
	}

	componentDidMount() {
    	this.performHealthCheck();
	}

	performHealthCheck = () => {
		fetch("http://timubuntuvm:3001/api/healthCheck")
	    .then((data) => {
	      if(!data.ok){
	        return data.text().then(result => Promise.reject(new Error(result)));
	      }

	      return data.json();
	    })
	    .then((res) => {
	    	this.setState({ status: res.data.status });
	    })
	    .catch((err) => {
	      console.log(err);
	    });
	}

	render(){
		return(
			<div>Status = {this.state.status}</div>
		);
	}
}

export default HealthCheck;