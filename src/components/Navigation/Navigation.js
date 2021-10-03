import React from 'react';
import './Navigation.css'

const Navigation = ({ onRouteChange, isSignedIn, onMyList, favouritesLength, route }) => {
	return (
		isSignedIn ?
		<nav className={'flexNavigation'}>			
			<p onClick={() => {if(route !== 'home')onRouteChange('home')}} className='f3-ns white pa1 mr3 mt1 mb1 pointer hover-bg-light-red br3'>Search</p>
			<p onClick={() => onRouteChange('watchlist')} className='f3-ns white pa1 mr3 mt1 mb1 pointer hover-bg-light-red br3'>Watchlist <span className='bg-dark-red br3 tc pr1 pl1'>{`${favouritesLength}`}</span></p>
			<p onClick={() => onRouteChange('signout')} className='f3-ns white pa1 mr3 mt1 mb1 pointer hover-bg-light-red br3'>Sign Out</p>
		</nav>		
		:
		<nav className={'flexNavigation'}>
			<p onClick={() => onRouteChange('signin')} className='f3-ns white pa1 mr3 mt1 mb1 pointer hover-bg-light-red br3'>Sign In</p>
			<p onClick={() => onRouteChange('register')} className='f3-ns white pa1 mr3 mt1 mb1 pointer hover-bg-light-red br3'>Register</p>
		</nav>
	)
}

export default Navigation;