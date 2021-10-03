import React from 'react';

const SearchBox = ({ onSearchChange, onButtonSubmit, route }) => {
	return (
		route === 'home' ?
			<div className='pa2'>
				<input
					className='pa3 ma2 ba b--black bg-light-gray br3'
					id='title'
					type='search' 
					placeholder='Title'
					onChange={ onSearchChange }
					onKeyPress={ onButtonSubmit }
				 />
				 <input
					className='pa3 ma2 ba b--black bg-light-gray br3'
					id="year"
					type='number'
					min="1930" 
					max="2021"
					step="10"
					placeholder='Year'
					onChange={ onSearchChange }
					onKeyPress={ onButtonSubmit }
				 />
				 <button 
						className='addPointer grow link ma2 pa3 pv2 v-mid ba f3 br3 b--black white bg-dark-red' 
						onClick= { onButtonSubmit }>
							Search
						</button>
			</div>
			:
			<div>
				<div className='pa2'>
					<input
						className='pa3 ma2 ba b--black bg-light-gray br3'
						id='filter'
						type='search' 
						placeholder='Filter your list'
						onChange={ onSearchChange }
					 />
				</div>
			</div>
	)
}

export default SearchBox;