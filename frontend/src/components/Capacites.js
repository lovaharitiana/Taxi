import { getCapacites, deleteCapacites } from "../services/CapaciteService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddCapaciteModal from './AddCapaciteModal';
import UpdateCapaciteModal from './UpdateCapaciteModal';


const Capacites = () => {
    const [capacites, setCapacites] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editCapacite, setEditCapacite] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        let mounted = true;
        getCapacites()
            .then(data => {
                if (mounted) {
                    setCapacites(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, capacites]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true)
    };

    const handleUpdate = (e, cap) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditCapacite(cap);
    };

    const handleDelete = (e, numCap) => {
        if (window.confirm('Are you sure?')) {
          e.preventDefault();
          deleteCapacites(numCap)
            .then((result) => {
              alert(result);
              setIsUpdated(true);
            },
              (error) => {
                alert("Failed to delete Capacite");
              }
            )
        }
    
      };

    let AddModalClose = () => setAddModalShow(false);
    let EditModalClose = () => setEditModalShow(false);

    return (
        <div className="row side-row">
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Numero capacite</th>
                        <th>Droit(Ariary)</th>
                        <th>Date certificat</th>
                        <th>Numero Permi</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {capacites.map((cap) =>
                        <tr key={cap.id}>
                            <td>{cap.numCap}</td>
                            <td>{cap.droit}</td>
                            <td>{cap.date_certificat}</td>
                            <td>{cap.permi}</td>
                            <td >
                                <Button className="mr-2" variant="warning"
                                    onClick={event => handleUpdate(event, cap)}>
                                    <FaEdit />
                                </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button className="mr-2" variant="danger"
                                onClick={event => handleDelete(event, cap.numCap)}>
                                    <RiDeleteBin5Line />
                                </Button>
                                <UpdateCapaciteModal show={editModalShow} onHide={EditModalClose}
                                    capacite={editCapacite} setUpdated={setIsUpdated}>
                                </UpdateCapaciteModal>




                            </td>
                        </tr>)}


                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add</Button>{' '}
                <AddCapaciteModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
                </AddCapaciteModal>
            </ButtonToolbar>
        </div>);
}
export default Capacites;