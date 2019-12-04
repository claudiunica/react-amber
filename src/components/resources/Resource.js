import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import EditModal from './EditModal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Resource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            columnNames: [
                'name', 'email', 'hire_date', 'job_title', 'options'
            ],
            isEditModalOpen: false,
            selectedResource: {},
        }
    }


    componentWillMount() {
        const apiUrl = 'http://localhost:3003';
        axios.post(`${apiUrl}/resources/getResources`, {
            offset: 0, limit: 60,
            filters: { order: [], props: {} }
        })
            .then((resources => {
                this.setState({ resources: resources.data.rows });
            }))
    }

    handleEditClick = resource => {
        this.setState({ isEditModalOpen: true, selectedResource: resource });
    }

    handleModalClose = () => {
        this.setState({ isEditModalOpen: false });
    }

    render() {
        return (
            <div>
                <EditModal open={this.state.isEditModalOpen} resource={this.state.selectedResource} closeModal={this.handleModalClose} submitValues={(values) => this.updateResource(values)} />

                <MuiThemeProvider>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {this.state.columnNames.map((column, index) => <TableCell key={index}>{column}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.renderTableBody()
                            }
                        </TableBody>
                    </Table>
                </MuiThemeProvider>
            </div>
        );
    }

    renderTableBody = () => {
        return this.state.resources.map((resource, index) => {
            return ((
                <TableRow key={index}>
                    {
                        this.state.columnNames.map((column, index) => {

                            {
                                if (column !== 'options')
                                    return (<TableCell key={index} >{resource[column]}</TableCell>)
                            }
                        })
                    }
                    <TableCell key={1000}>
                        <EditIcon style={{ cursor: 'pointer' }} onClick={this.handleEditClick.bind(this, resource)} />
                    </TableCell>
                </TableRow>
            ))
        })
    }

    updateResource = (newValues)=> {
        console.log(newValues);
    }
}

export default Resource;


// jsx table
// this.state.resources.map((resource, index) =>
//     (
//         <TableRow key={index}>
//             {
//                 this.state.columnNames.map(column =>
//                     (<TableCell >{resource[column]}</TableCell>))
//             }
//         </TableRow>
//     )
// )