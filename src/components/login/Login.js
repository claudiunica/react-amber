import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import App from '../../App'
import Resource from '../resources/Resource';
const style = {
    margin: 15,
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }


    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );

    }


    handleClick = (event) => {
        const apiUrl = 'http://localhost:3003';
        const payload = {
            "email": this.state.username,
            "password": this.state.password
        }
        var self = this;

        console.log(event);
        axios.post(`${apiUrl}/users/login`, payload).then(response => {
            console.log('Login successfull !', response);
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('token', response.data.token);
            let uploadScreen = [];
            console.log(this);
            uploadScreen.push(<Resource appContext={self.props.appContext} />);
            self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen });
        }).catch(error => {
            console.log(error);
        })
    }
}

export default Login;