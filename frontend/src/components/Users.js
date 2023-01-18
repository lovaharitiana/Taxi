import { getUsers, deleteUsers } from "../services/UserService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddUserModal from './AddUserModal';
import { FaSearch } from "react-icons/fa";
import "../recherche.css";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Recherche lancée pour : ${searchTerm}`);
    };

    const filteredUsers = users.filter(usr =>
        usr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usr.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

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
             <div className="search-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="search-form">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        <button type="submit">
                            <FaSearch />
                        </button>
                    </div>
                </form>
            </div>
            <Table striped bordered hover className="table-container">
                <thead>
                    <tr>
                        <th>Numero Utilisateur</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((usr) =>
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