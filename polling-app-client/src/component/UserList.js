import React, { Component } from 'react';
//import {getAllUsers} from '../util/APIUtils';
//import LoadingIndicator  from '../common/LoadingIndicator';
import './UserList.css';
//import NotFound from "../common/NotFound";
//import ServerError from "../common/ServerError";
import { Table } from 'antd';
const { Column } = Table;


class UserList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/users/all")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div> Loading... </div>;
        } else {
            return (

                <Table dataSource={items}>
                        <Column title="Имя" dataIndex="name" key="name" />
                        <Column title="Никнейм" dataIndex="username" key="username"  />
                        <Column title="Email" dataIndex="email" key="email" />
                </Table>

                // <table>
                //     {items.map(item => (
                //         <tr key={item.id}>
                //          <div className="full-name">{item.name} @{item.username}</div>
                //         </tr>
                //  ))}
                // </table>
         )
     }


    }
}

export default UserList