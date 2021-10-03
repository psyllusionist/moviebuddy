import React, { Component } from 'react';

class SignIn extends Component {

	constructor() {
		super();
		this.state = {
			signInEmail: '',
			signInPassword: '',
			wrongCredentials: false
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
		if(event.key === 'Enter') this.onSubmitSignIn();
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
		if(event.key === 'Enter') this.onSubmitSignIn();
	}

	onSubmitSignIn = (e) => {
		fetch('https://aqueous-shore-58465.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail.toLowerCase(),
				password: this.state.signInPassword
			})
		})
			.then(res => res.json())
			.then(data => {
				if(data.id) {
					this.props.loadUser(data);
					this.props.handleList();
					this.props.onRouteChange('home');
			} else {
				this.setState({wrongCredentials: true})
			}
			})
			.catch(err => console.log('Something went wrong'))		
	}	

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 moon-gray">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6 moon-gray" htmlFor="email-address">Email</label>
				        <input
					        onKeyUp={this.onEmailChange}
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address" 
					    />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6 moon-gray" htmlFor="password">Password</label>
				        <input 
					        onKeyUp={this.onPasswordChange}
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" 
				        />
				      </div>
				      {
				      	this.state.wrongCredentials ?
				      	<div className="db fw6 lh-copy f6 moon-gray"><p>Incorrect email or password</p></div> :
				      	<div></div>
				      }		      
				    </fieldset>
				    <div className="">
				      <input 
					      onClick={this.onSubmitSignIn} 
					      className="b ph3 pv2 input-reset ba b--moon-gray bg-transparent grow pointer f6 dib moon-gray" 
					      type="submit" 
					      value="Sign in" 
				      />
				    </div>
				    <div className="lh-copy mt3 pointer">
				      <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db moon-gray">Register</p>			      
				    </div>
				  </div>
				</main>
			</article>
		)
	}
}

export default SignIn;