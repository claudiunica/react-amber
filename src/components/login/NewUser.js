import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const style = {
  margin: 15,
}


class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      user_role_id: '',
      password: '',
    }
  }

  handleChange = event => {
    console.log(this);
    this.setState({ user_role_id: event.target.value });

  };

  render() {
    return (
      <div >
        <MuiThemeProvider >
          <div>
            <AppBar
              title="Register"
            />
            <div style={{ padding: 50 }}>
              <TextField
                hintText="Enter your First Name"
                floatingLabelText="First Name"
                onChange={(event, newValue) => this.setState({ first_name: newValue })}
              />
              <br />
              <TextField
                hintText="Enter your Last Name"
                floatingLabelText="Last Name"
                onChange={(event, newValue) => this.setState({ last_name: newValue })}
              />
              <br />
              <TextField
                hintText="Enter your Email"
                type="email"
                floatingLabelText="Email"
                onChange={(event, newValue) => this.setState({ email: newValue })}
              />
              <br />
              <TextField
                hintText="Enter your password"
                type="password"
                floatingLabelText="Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <FormControl required >
                <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  // value={age}
                  onChange={this.handleChange}
                // className={classes.selectEmpty}
                >
                  {this.roles.map((role, index) => <MenuItem key={index} value={role.id} >{role.name}</MenuItem>)}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>



              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
              {/* <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/> */}
            </div>
          </div>

        </MuiThemeProvider>
      </div>
    );
  }

  roles = [
    {
      name: 'Admin',
      id: 1
    },
    {
      name: 'Power Manager',
      id: 2
    },
    {
      name: 'Basic Manager',
      id: 3
    },
    {
      name: 'Finance Accountant',
      id: 4
    },
    {
      name: 'Basic Partner',
      id: 5
    },
    {
      name: 'Power Partner',
      id: 6
    },
  ]

  handleClick = (event) => {
    console.log(this)
    const apiUrl = 'http://localhost:3003';
    axios.post(`${apiUrl}/users/register`, {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      user_role: this.state.user_role_id,
      password: this.state.password
    }, {
        headers: { 'Authorization': "bearer " + localStorage.getItem('token') }
      }
    )
  }


}

export default NewUser;