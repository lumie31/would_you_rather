// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Action Creators
import { setAuthedUser } from '../actions/authedUser';
// Assets
import user_question from '../assets/user_question.jpg';
// Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { MuiThemeProvider } from '@material-ui/core/styles';
// Utils
import { loginTheme as theme } from '../utils/theme';
class Login extends Component {

  // Component state contains selected user_id, boolean to display snackbar alert
  // and boolean to indicate login
  state = {
    user_id: 'none',
    open: false,
    loggedIn: false
  }

  handleUserChange = event => {
    this.setState({ user_id: event.target.value });
  };

  handleLogin = () => {
    // Display snackbar alert if no user is selected
    if (this.state.user_id === 'none') {
      this.setState({ open: true });
    }
    // Set authed user & loggedIn if user is selected
    else {
      this.props.dispatch(setAuthedUser(this.state.user_id));
      this.setState({ loggedIn: true });
    }
  }

  handleSnackbarClose = () => {
    this.setState({ open: false });
  };

  render() {

    const { users } = this.props;
    let afterLogin = '/home';
    if (this.props.location.state) {
      afterLogin = this.props.location.state.afterLogin;
    }

    // Redirect to required page after log in
    if (this.state.loggedIn) {
      return <Redirect to={afterLogin} />
    }

    return (
      <div className='login'>
        <h1 className='title'>Would You Rather?</h1>
        <div className='login-container'>
          <img className='login-image' src={user_question} alt='login' />
          <MuiThemeProvider theme={theme}>
            <div className='user-select'>
              <Select
                value={this.state.user_id}
                onChange={this.handleUserChange}
              >
                <MenuItem value='none'>
                  <em>Select your character?</em>
                </MenuItem>
                {
                  Object.keys(users).map((user_id) => (
                    <MenuItem key={user_id} value={user_id}>{users[user_id]['name']}</MenuItem>
                  ))
                }
              </Select>
            </div>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.handleLogin}
            >
              Log In
            </Button>
            <Snackbar
              open={this.state.open}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={this.handleSnackbarClose}
              autoHideDuration={2000}
              message={<span id="message-id">Please select a user before logging in!</span>}
            />
            </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(Login);
