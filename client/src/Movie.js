import React, { Component } from 'react';

class Movie extends Component {
	constructor(props){
		super(props);		

		this.state = {
			movie: []
		}
	}

	componentDidMount() {
		/* If we are sending the data from all 
			movies the data has already been collected so we 
			don't need to call the backend */
    	if(!this.props.movieData && this.props.movieData === undefined)
    		this.getMovie();
	}

	getMovie = () => {
		const { match: {params} } = this.props,
			url = 'http://timubuntuvm:3001/api/getMovie?movie_id=' + params.movie_id;

		fetch(url)
	    .then((data) => {
	      if(!data.ok){
	        return data.text().then(result => Promise.reject(new Error(result)));
	      }

	      return data.json();
	    })
	    .then((res) => {
	    	this.setState({ movie: res.data });
	    })
	    .catch((err) => {
	      console.log(err);
	    });
	}

	/* If a month or day is a single digit add a '0' in front */
	convertToFullDayMonth = (dayMonth) => {
		return (dayMonth.toString().match(/\d/)) ? "0" + dayMonth : dayMonth;
	}

	/* Convert the epoch date to a readable format 
		This is done by parsing the epoch into a Date object
		From there we can get days etc.. and build a new readable date */
	convertDate = (epochDate) => {
		const newDate = new Date(epochDate * 1000),
			month = this.convertToFullDayMonth(newDate.getMonth() + 1),
			day = this.convertToFullDayMonth(newDate.getDay());

		return newDate.getFullYear() + "-" + month + "-" + day;
	}

	render(){
		const { movie } = (this.props.movieData) ? this.props.movieData : this.state;

		/* render() is called before async data returns. 
			Therefore, I was getting 'movie.comments is undefined' errors */
		if(movie != null && !movie.comments) {
			return null;
		}

		/* Build all the movie data into the HTML we want */
		return(
			<div>
				{movie == null ? (
					<p>Movie doesn't exist</p>
				) : (
					<React.Fragment>
						<p>Title: {movie.title}</p>
						<p>Description: {movie.description}</p>
						<p>Producer: {movie.producer}</p>
						<p>Available in 3D? {movie.available_in_3d ? ("Yes") : ("No")}</p>
						<p>Age Rating: {movie.age_rating}</p>
						<p>Oscar Nominations: {movie.oscar_nominations}</p>
						<p>Likes: {movie.likes}</p>													
						{movie.comments === undefined && movie.comments.length <= 0 ? (
							<p>This movie has no comments</p>
						) : (
							<React.Fragment>
								<span>Comments:</span>									
								{movie.comments.map((comment, i) => (
									<ul key={i}>
										<li>User: {comment.user}</li>
										<li>Message: {comment.message}</li>
										<li>Date Created: {this.convertDate(comment.dateCreated)}</li>
										<li>Likes: {comment.like}</li>
									</ul>
								))}
							</React.Fragment>
						)}
						<hr />
					</React.Fragment>
				)}
			</div>
		);
	}
}

export default Movie;