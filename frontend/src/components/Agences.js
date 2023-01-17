import { getAgences, deleteAgences } from "../services/AgenceService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddAgenceModal from './AddAgenceModal';
import UpdateAgenceModal from './UpdateAgenceModal';


const Agences = () => {
    const [agences, setAgences] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editAgence, setEditAgence] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        let mounted = true;
        getAgences()
            .then(data => {
                if (mounted) {
                    setAgences(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, agences]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true)
    };

    const handleUpdate = (e, ag) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditAgence(ag);
    };

    const handleDelete = (e, numAg) => {
        if (window.confirm('Are you sure?')) {
          e.preventDefault();
          deleteAgences(numAg)
            .then((result) => {
              alert(result);
              setIsUpdated(true);
            },
              (error) => {
                alert("Failed to delete Agence");
              }
            )
        }
    
      };

    let AddModalClose = () => setAddModalShow(false);
    let EditModalClose = () => setEditModalShow(false);

    return (
        <div className="row side-row" style={{ fontFamily: 'Times New Roman'}}>
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Numero Agence</th>
                        <th>Nom agence</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {agences.map((ag) =>
                        <tr key={ag.id}>
                            <td>{ag.numAg}</td>
                            <td>{ag.nomAg}</td>
                            
                            <td >
                                <Button className="mr-2" variant="warning"
                                    onClick={event => handleUpdate(event, ag)}>
                                    <FaEdit />
                                </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button className="mr-2" variant="danger"
                                onClick={event => handleDelete(event, ag.numAg)}>
                                    <RiDeleteBin5Line />
                                </Button>
                                <UpdateAgenceModal show={editModalShow} onHide={EditModalClose}
                                    agence={editAgence} setUpdated={setIsUpdated}>
                                </UpdateAgenceModal>




                            </td>
                        </tr>)}


                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add</Button>{' '}
                <AddAgenceModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
                </AddAgenceModal>
            </ButtonToolbar>
        </div>);
}
export default Agences;