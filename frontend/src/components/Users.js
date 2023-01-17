import { getUsers, deleteUsers } from "../services/UserService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddUserModal from './AddUserModal';



const Users = () => {
    const [users, setUsers] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
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

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true)
    };

    const handleDelete = (e, id) => {
        if (window.confirm('Etes-vous sure?')) {
            e.preventDefault();
            deleteUsers(id)
                .then((result) => {
                    alert(result);
                    setIsUpdated(true);
                },
                    (error) => {
                        alert("Erreur de suppression de cet utilisateur");
                    }
                )
        }

    };
    let AddModalClose = () => setAddModalShow(false);




    return (
        <div className="row side-row" style={{ fontFamily: 'Times New Roman'}}>
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
                            <td>
                                <Button className="mr-2" variant="danger"
                                    onClick={event => handleDelete(event, usr.id)}>
                                    <RiDeleteBin5Line />
                                </Button>
                            </td>

                        </tr>)}


                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add</Button>{' '}
                <AddUserModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
                </AddUserModal>
            </ButtonToolbar>

        </div>);
}
export default Users