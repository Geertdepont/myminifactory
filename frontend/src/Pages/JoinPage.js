import React, { Component } from "react";
import { withRouter} from 'react-router-dom';
import './LoginPage.css';
import { createUser } from "../actions/join";
import { setTokens } from "../actions/login";
import { connect } from "react-redux";


class JoinPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      username: '',
      password: '',
    }

    this.successfulCreation = this.successfulCreation.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  usernameHandler(e){
    this.setState({
      username: e.target.value,
    })
  }

  passwordHandler(e){
    this.setState({
      password: e.target.value,
    })
  }

  successfulCreation(data) {
    console.log(data);
    this.props.setTokens(data);
  	this.props.history.push('/');
  }

  createUser() {
    if (this.state.username && this.state.password) {
      let newUser = {
        username: this.state.username,
        password: this.state.password
      }

      this.props.createUser(newUser, this.successfulCreation);
    }
  }


  render() {
    return (
		<div >
	     	<section id="login" className="login">
	     		<div className="middle">
		     		<div id="content" className="loginContainer loginContainerBordered">
		     			<header>
		     				<p role="img" aria-label="myminifactory Logo" className="myminifactory-logo myminifactory-logo-long"></p>
		     			</header>

		     			<div className="newForm">
		     				<input onChange={this.usernameHandler.bind(this)} style={{marginBottom: '20px'}} id="username" name="login_email" type="text" placeholder="Username" ></input>


		     				<input onChange={this.passwordHandler.bind(this)} style={{marginBottom: '10px'}} id="password" name="login_password" type="password" placeholder="Password (min 8 characters)" ></input>
							   
                <div style={{display: this.props.error ? 'block' : 'none' }}  className="invalidFeedback">Could not create user with these details</div>

		     				<button onClick={this.createUser} type="button" className="buttonblue signUpButton">Sign up</button>
                <a href="/login">Login </a>
		     			</div>

		    
		     		</div>
		     	</div>

	     	</section>
	     </div>

    );
  }
}

function mapStateToProps(state) {
  return { 
    isLoadingData: state.join.isLoadingData,
    error: state.join.error,
  };
}

export default connect(mapStateToProps, { createUser, setTokens })(withRouter (JoinPage));
