import React, { Component } from "react";
import './LoginPage.css';
import { login, setTokens } from "../actions/login";
import { connect } from "react-redux";
import { withRouter} from 'react-router-dom';


class LoginPage extends Component {

  constructor(){
    super();
    this.state ={
      error: '',
      username: '',
      password: '',
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    })
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleError(errorMessage) {    
    this.setState({
      error: errorMessage,
    })
  }

  handleSuccess(data) {
    this.props.setTokens(data);
    this.props.history.push('/');
  }

  onSubmit(values) {
  	values.preventDefault();
    
    this.setState({
      error: "",
    })
    
    let newUser = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.login(newUser, this.handleSuccess);  
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
		     				<form id="userForm" onSubmit={this.onSubmit.bind(this)}>
			     				<input id="username" name="login_username" className="authInput" type="text" style={{marginBottom: "20px"}} onChange={this.handleUsernameChange} placeholder="Username" ></input>
			     				<input id="password" name="login_password" className="authInput" type="password" placeholder="Password" onChange={this.handlePasswordChange} style={{marginBottom: "20px"}} ></input>

                  <div style={{display: this.props.error ? 'block' : 'none' }}  className="invalidFeedback">Invalid credentials</div>

			     				<button type="submit" className="buttonblue loginButton">Login</button>
			     				<a style={{marginLeft: "14px"}} href="/join">Sign up </a>
			     			</form>
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
    isLoadingData: state.login.isLoadingData,
    error: state.login.error,
  };
}

export default connect(mapStateToProps, { login, setTokens })(withRouter (LoginPage));
