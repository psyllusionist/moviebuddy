import React from 'react';
import Card from '../Card/Card';
import nopicture from '../no_picture.png'

const CardList = ({ movies, onCardDown, onCardUp, addFavourite, removeFavourite, favourites }) => {
		return movies ?
		(
			<div className="flex flex-wrap justify-center listPosition">
				{	
					movies.map((user, index) => {
							return (
								<Card 
								key={index} 
								id={movies[index].imdbID} 
								name={movies[index].Title} 
								year={movies[index].Year}
								poster={
									movies[index].Poster === "N/A" 
									?
								 	nopicture
								 	:
								  	movies[index].Poster
								  }
								onCardDown={onCardDown}
								onCardUp={onCardUp}
								addFavourite={addFavourite}
								removeFavourite={removeFavourite}
								favourites={favourites}
								/>
							)
						})	
				}
			</div>
		) :	
		<div>
			<h2 className="fw8 red">We're having trouble finding this title. Please try another one.</h2>
		</div>		
}

export default CardList;