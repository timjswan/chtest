import React, { Component } from 'react';

class Report extends Component {
	constructor(props){
		super(props);

		this.state = {
			report: []
		}
	}

	componentDidMount() {
    	this.getReport();
	}

	getReport = () => {
		fetch("http://timubuntuvm:3001/api/report")
	    .then((data) => {
	      if(!data.ok){
	        return data.text().then(result => Promise.reject(new Error(result)));
	      }

	      return data.json();
	    })
	    .then((res) => {
	    	this.setState({ report: res.data });
	    })
	    .catch((err) => {
	      console.log(err);
	    });
	}

	render(){
		const { report } = this.state;
		return(
			<div>
				<p>Movies that are available in 3D: {report.movies_available_in_3d}</p>
				<p>Film with the most oscars: {report.most_oscar_nominations}</p>
			</div>
		);
	}
}

export default Report;