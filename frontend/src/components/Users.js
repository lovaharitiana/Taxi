import { getUsers } from "../services/UserService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';


const Users = () => {
    const [users, setUsers] = useState([]);
   

    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        let mounted = true;
        getUsers()
            .then(data => {
                if (mounted) {
                    setUsers(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, users]);

   
    
    return (
        <div className="row side-row">
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Numero Utilisateur</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((usr) =>
                        <tr key={usr.id}>
                            <td>{usr.id}</td>
                            <td>{usr.name}</td>
                            <td>{usr.email}</td>
                           
                        </tr>)}


                </tbody>
            </Table>
            
        </div>);
}
export default Users