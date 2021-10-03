import React from 'react';
import Card from '../Card/Card';
import nopicture from '../no_picture.png'

const Watchlist = ({ movies, onCardDown, onCardUp, addFavourite, removeFavourite, favourites }) => {
	return (
		<div className="flex flex-wrap justify-center listPosition">
			{	
				favourites.map((user, index) => {
						return (
							<Card 
							key={index} 
							id={favourites[index].imdbid} 
							name={favourites[index].title} 
							year={favourites[index].year}
							poster={
								favourites[index].poster === "N/A" 
								?
							 	nopicture
							 	:
							  	favourites[index].poster
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
	)
}

export default Watchlist;