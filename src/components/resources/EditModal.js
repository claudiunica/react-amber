import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';
import { Card } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: 50,
        left: 50
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
});

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            job_title: ''
        };
    }



    render() {
        const { classes } = this.props;
        console.log(classes);
        return (
            <MuiThemeProvider>
                <Modal
                    open={this.props.open}
                    onClose={this.handleModalClose}
                >
                    <Card className={classes.paper}>
                        <TextField
                            defaultValue={this.props.resource.name}
                            id="standard-search"
                            label="Resource Name"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                        <TextField
                            defaultValue={this.props.resource.email}
                            id="standard-search"
                            label="Email"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ email: e.target.value })}

                        />
                        <TextField
                            defaultValue={this.props.resource.job_title}
                            id="standard-search"
                            label="Job Title"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ job_title: e.target.value })}
                        />

                        <Divider />
                        <Button onClick={this.handleSubmit}>SUBMIT</Button>
                        <Button onClick={this.handleModalClose}>CLOSE</Button>
                    </Card>
                </Modal>
            </MuiThemeProvider>
        );
    }

    handleModalClose = () => {
        this.props.closeModal();
    }

    handleSubmit = () => {
        this.props.submitValues({
            name: this.state.name,
            email: this.state.email,
            job_title: this.state.job_title
        })
    }
}

export default withStyles(useStyles)(EditModal)