import React from 'react';

const Card = ({ id, name, year, poster, onCardDown, onCardUp, addFavourite, removeFavourite, favourites }) => {
	return(
		<div className='addPointer tc white br3 pa2 ma2 grow bw2 shadow-5 card'>	
			{
				favourites.some(item => item.imdbid === id)
				?
				<p onClick={() => removeFavourite(id)} className='addPointer fw7 f2 link p1 pt1 pb1 mt0 mr3 br4 grow v-mid w2 v-top w2 v-top fixed w2 fr noneSelection'>❤️</p>
				:
				<p onClick={() => addFavourite(id, name, year, poster)} className='addPointer fw7 f2 link p1 pt1 pb1 mt0 mr3 br4 grow link v-mid w2 v-top fixed w2 fr noneSelection'>🤍</p>				
			}
			<div onMouseDown={() => onCardDown(id)} onMouseUp={onCardUp} >				
				<img 
					src={poster} 
     				alt='poster'
     				height='300'
     				width='200'
     			/>
				<div>
					<h2 className='autoFont'>{ name }</h2>
					<p>{ year }</p>
				</div>
			</div>
		</div>
	)
}

export default Card;