import React from 'react';
import './CardDetails.css'
import nopicture from '../no_picture.png'

const CardDetails = ({ details, closeDetails, addFavourite, removeFavourite, favourites }) => {
	if(details.Title){
		return (
			<div className='link tc white br3 pa2 ma2 bw2 shadow-5 cardDetails'>				
				{
				favourites.some(item => item.imdbid === details.imdbID)
				?
				<p onClick={() => removeFavourite(details.imdbID)} className='addPointer fw7 f2 link p1 pt0 pb1 mt0 grow w2 sticky fl noneSelection'>❤️</p>
				:
				<p onClick={() => addFavourite(details.imdbID, details.Title, details.Year, details.Poster)} className='addPointer fw7 f2 link p1 pt0 pb1 mt0  grow w2 sticky fl noneSelection'>🤍</p>				
				}
				<p onClick={ closeDetails } className='addPointer fw7 f6 link p1 pt2 pb2 ma0 br4 bg-dark-gray hover-bg-moon-gray v-top w2 sticky fr noneSelection'>✖️</p>
				<h2 className='f3'>{ details.Title }</h2>
				<div className='flex flex-wrap justify-center'>
					<img 
							src={
								details.Poster === "N/A" 
								?
								nopicture 
								:
								details.Poster
							} 
		     				alt='poster'
		     				height='300'
		     				width='200'
		     				className='mt3'
		     			/>
					<div>
						<div className='ma3 tl pa2 scroll-container shadow-1 br3 light-gray cardDetailsBox'>
							<p><span className='dark-gray b'>Year:</span> { details.Year }</p>
							<p><span className='dark-gray b'>Genre:</span> { details.Genre }</p>
							<p><span className='dark-gray b'>Type:</span> { details.Type }</p>
							<p><span className='dark-gray b'>IMDb Rating:</span> { details.imdbRating }</p>
							<p>
								<span className='dark-gray b'>
								IMDb Link:
								</span>
								<a 
									href={`https://www.imdb.com/title/${details.imdbID}`} 
									target="_blank"
									rel="noreferrer"
									className="link black fw7 pa1 ma1 br2 f4 bg-yellow hover-bg-gold"
								>
								IMDb
								</a>
							</p>
							<p><span className='dark-gray b'>Plot:</span> { details.Plot }</p>
							<p><span className='dark-gray b'>Actors:</span> { details.Actors }</p>
							<p><span className='dark-gray b'>Runtime:</span> { details.Runtime }</p>
							<p><span className='dark-gray b'>Director:</span> { details.Director }</p>
							<p><span className='dark-gray b'>Writer:</span> { details.Writer }</p>
							<p><span className='dark-gray b'>Released:</span> { details.Released }</p>
							<p><span className='dark-gray b'>Awards:</span> { details.Awards }</p>
							<p><span className='dark-gray b'>Box Office:</span> { details.BoxOffice }</p>
							<p><span className='dark-gray b'>Country:</span> { details.Country }</p>
							<p><span className='dark-gray b'>Language:</span> { details.Language }</p>
							<p><span className='dark-gray b'>Production:</span> { details.Production }</p>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return <div></div>
	}	 
}

export default CardDetails;