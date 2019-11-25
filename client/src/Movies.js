import React, { Component } from 'react';
import Movie from './Movie';

class Movies extends Component {
	constructor(props){
		super(props);

		this.state = {
			movies: []
		}
	}

	/* Called when the component loads. */
	componentDidMount() {
		this.getDataFromDb();
	}

	/* Get our movie data from the backend.
		Set the state of the component so that it shows the data */
	getDataFromDb = () => {
		fetch("http://timubuntuvm:3001/api/getMovies")
		.then((data) => {
			if(!data.ok){
				return data.text().then(result => Promise.reject(new Error(result)));
			}

			return data.json();
		})
		.then((res) => {
			this.setState({ movies: res.data });
		})
		.catch((err) => {
			console.log(err);
		});
  	};

	render(){
		const { movies } = this.state;
		
		/* Loop through each movie and send the data to a Movie component */
		return (
			 <div className="movies-container">
				{movies.length <= 0
				? "No data"
				: movies.map(movie => (
				  <Movie key={movie.movie_id} movieData={{"movie" : movie}} />
				))}
			</div>
		);
	}
}

export default Movies;