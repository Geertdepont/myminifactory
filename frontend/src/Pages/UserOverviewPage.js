import React, { Component } from "react";
import { withRouter} from 'react-router-dom';
import { fetchUsers } from "../actions/users";
import { connect } from "react-redux";
import './UserOverviewPage.css';
import {authenticationService} from '../service/authentication.service.js';

class UserOverviewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      error: ''
    }
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  logout() {
    authenticationService.logout();
    this.props.history.push('/login');
  }

  render() {
    if (!this.props.users.data) {
      return (
        <div className="userOverview">
          Could not load users
        </div>
      ) 
    }


    return (
    	<div className="userOverview">
        <table className="tableStyle">
          <thead>
            <tr>
              <th>Username </th>
            </tr>
          </thead>
          <tbody>

            {this.props.users.data.map((user,index) =>
              <tr key={index}>
                <td>{user.username}</td>
             </tr>
            )}
          </tbody>
         </table>
         <button className="buttonStyle buttonblue" onClick={() => this.logout()} >Log out</button>
		  </div>

    );
  }
}

function mapStateToProps(state) {
  return { 
    users: state.users,
    isLoadingData: state.users.isLoadingData,
  };
}

export default connect(mapStateToProps, { fetchUsers })(withRouter (UserOverviewPage));