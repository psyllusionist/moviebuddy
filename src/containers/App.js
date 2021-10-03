import React, { Component } from 'react';
import './App.css';
import CardList from '../components/CardList/CardList';
import Watchlist from '../components/CardList/Watchlist';
import CardDetails from '../components/CardDetails/CardDetails'
import Scroll from '../components/Scroll/Scroll'
import SearchBox from '../components/SearchBox/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry/ErrorBoundry';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import ReactPaginate from 'react-paginate';


const initialState = {
	movies: [],
	searchfield: '',
	searchedtitle: '',
	filteredtitle: '',
	year: '',
	searchedyear: '',
	imdbId: '',
	instructions: true,
	pages: 0,
	details: {},
	route: 'signin',
	isSignedIn: false,
	favourites: [],
	user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  }
}

const initialHomePage = {

}

class App extends Component {
	constructor() {
		super()
		this.pageRef = React.createRef();
		this.state = initialState;
	}

	loadUser = (data) => {
	    this.setState({user: {
	      id: data.id,
	      name: data.name,
	      email: data.email,
	      entries: data.entries,
	      joined: data.joined
	    }})
 	}

	componentDidMount(){
		fetch(`http://www.omdbapi.com/?apikey=47726eab&s=${this.state.searchfield}&y=${this.state.year}`)
		.then(res => res.json())
		.then(data => this.setState({movies: [...this.state.movies, ...data.Search]}))
		.catch(err => console.log('Movie not found'))
	}	

	onSearchChange = (event) => {
		if(event.target.id === 'title'){
		this.setState({ searchfield: event.target.value })
		} else if (event.target.id === 'year'){
		this.setState({ year: event.target.value })
		} else if (event.target.id === 'filter'){
		this.setState({ filteredtitle: event.target.value })
		}
	}

	onButtonSubmit = (event) => {
		if(event.key === 'Enter' || event.target.innerText === 'Search'){	
		this.setState({pages: 0})		
		fetch(`http://www.omdbapi.com/?apikey=47726eab&s=${this.state.searchfield}&y=${this.state.year}`)
			.then(res => res.json())
			.then(data => {
				this.setState({movies: data.Search})
				this.setState({pages: Math.ceil(data.totalResults/10)})
				this.setState({searchedtitle: this.state.searchfield})
				this.setState({searchedyear: this.state.year})
				this.setState({instructions: false})
				})
			.catch(err => console.log('Movie not found'))
		}
	}

	handlePageClick = (event) => {
		fetch(`http://www.omdbapi.com/?apikey=47726eab&s=${this.state.searchedtitle}&y=${this.state.searchedyear}&page=${event.selected+1}`)
			.then(res => res.json())
			.then(data => {
				this.setState({movies: data.Search})
				this.setState({pages: Math.ceil(data.totalResults/10)})	
				})
			.catch(err => console.log('Movie not found'))
	}

	onCardDown = (id) => {
		this.setState({imdbId: id})
	}

	onCardUp = (e) => {
		if(!this.state.details.Title && e.button === 0){
			fetch(`http://www.omdbapi.com/?apikey=47726eab&i=${this.state.imdbId}&plot=full`)
				.then(res => res.json())
				.then(data => this.setState({details: data}))
				.catch(err => console.log('Movie not found'))
			this.pageRef.current.className = 'darker'
		}
		
	}

	closeDetails = () => {
		if(this.state.details.Title){
			this.setState({details: {}})
			this.pageRef.current.className = ''
		}
	}

	onRouteChange = (route) => {
    this.setState({route: route})
    if(route === 'signout') {
      this.setState(initialState)
    } else if ( route === 'home') {
    	this.setState({ movies: [] });
    	this.setState({ instructions: true });
    	this.setState({ pages: 0 })
      this.setState({isSignedIn: true})
    } else if ( route === 'watchlist') {
      this.setState({ filteredtitle: '' })
    }
  }

  handleList = (email) => {
	fetch('https://aqueous-shore-58465.herokuapp.com/list', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
             	email: this.state.user.email
              })            
          })
          .then(res => res.json())
          .then(data => {
          	this.setState({favourites: data})
          })
          .catch(err => console.log('Something went wrong'))
	}

  addFavourite = (id, name, year, poster) => {
  	fetch('https://aqueous-shore-58465.herokuapp.com/listadd', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: this.state.user.email,
            	title: name,
							year: year,
							imdbid: id,
							poster: poster
              })            
          })
          .then(res => res.json())
          .catch(err => console.log('Something went wrong'))
    this.setState({favourites: [...this.state.favourites, {
              email: this.state.user.email,
            	title: name,
							year: year,
							imdbid: id,
							poster: poster
              }          
          ]})
  }

  removeFavourite = (id) => {
  	fetch('https://aqueous-shore-58465.herokuapp.com/listdelete', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
             	email: this.state.user.email,
							imdbid: id,
              })            
          })
          .then(res => res.json())
          .catch(err => console.log('Something went wrong'))
    this.setState({favourites: this.state.favourites.filter((item) => item.imdbid !== id)})
  }

	render(){
		const filteredFavourites = this.state.favourites.filter((item) =>{
		return item.title.toLowerCase().includes(this.state.filteredtitle.toLowerCase());
		});
		const { isSignedIn, route } = this.state;
		return (
			<div className='tc'>				
					{ route === 'home' || route === 'watchlist'
				        ? 
				        <div>
				        	<div onClick={this.closeDetails}  ref={this.pageRef} >
							<Navigation 
								onRouteChange={this.onRouteChange} 
								isSignedIn={isSignedIn} 
								onWatchlist={this.onWatchlist} 
								favouritesLength={this.state.favourites.length}
								route={this.state.route}
							/>
							<h1 className='f1 ma0 pa0 tc'>MovieBuddy</h1>
							<SearchBox onSearchChange={this.onSearchChange} onButtonSubmit={this.onButtonSubmit} route={this.state.route}/>
							<Scroll>
								<ErrorBoundry>
									{ route === 'home' ?
										( this.state.instructions ?
											<div>
												<p className="f2 moon-gray">{`Hello ${this.state.user.name}!`}</p>
												<p className="f3 moon-gray">Welcome to MovieBuddy.</p>
												<p className="f3 moon-gray">I will help you keep track of your favourite shows and discover new shows and movies. </p>
											</div>											
											:
											<CardList
												movies={this.state.movies} 
												onCardDown={this.onCardDown} 
												onCardUp={this.onCardUp}
												addFavourite={this.addFavourite} 
												removeFavourite={this.removeFavourite} 
												favourites={this.state.favourites}
											/>										
										) : 
											<Watchlist
												movies={this.state.movies} 
												onCardDown={this.onCardDown} 
												onCardUp={this.onCardUp}
												addFavourite={this.addFavourite} 
												removeFavourite={this.removeFavourite} 
												favourites={filteredFavourites}
											/>								
									}
								</ErrorBoundry>
							</Scroll>			
							{ this.state.pages > 1 && route === 'home'
								?
								<ReactPaginate
								  previousLabel={'Previous'}
						          nextLabel={'Next'}
						          breakLabel={'...'}
						          breakClassName={'break-me'}
						          pageCount={this.state.pages}
						          marginPagesDisplayed={2}
						          pageRangeDisplayed={5}
						          onPageChange={this.handlePageClick}
						          containerClassName={'pagination'}
						          activeClassName={'active'}	          
								/> 
								: 
								<div></div>
							}
							</div>
						</div>
				        : 
				        (
			            route === 'register'
			            ? 
			            <div>
						<Navigation 
							onRouteChange={this.onRouteChange} 
							isSignedIn={isSignedIn} 
							onWatchlist={this.onWatchlist} 
							favouritesLength={this.state.favourites.length}
							route={this.state.route} 
						/>
						<h1 className='f1 ma0 pa0 tc'>MovieBuddy</h1>
						<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
						</div>
			            : 
			            <div>
						<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
						<h1 className='f1 ma0 pa0 tc'>MovieBuddy</h1>
						<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} handleList={this.handleList} /> 
						</div>
			          	)        
				    }
					
				<CardDetails 
					details={this.state.details} 
					closeDetails={this.closeDetails} 
					addFavourite={this.addFavourite} 
					removeFavourite={this.removeFavourite} 
					favourites={this.state.favourites} />
			</div>
		)
	}	
}

export default App;