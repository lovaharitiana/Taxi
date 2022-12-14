import { getAssurances, deleteAssurances } from "../services/AssuranceService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddAssuranceModal from './AddAssuranceModal';
import UpdateAssuranceModal from './UpdateAssuranceModal';


const Assurances = () => {
    const [assurances, setAssurances] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editAssurance, setEditAssurance] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        let mounted = true;
        getAssurances()
            .then(data => {
                if (mounted) {
                    setAssurances(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, assurances]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true)
    };

    const handleUpdate = (e, ass) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditAssurance(ass);
    };

    const handleDelete = (e, ref) => {
        if (window.confirm('Are you sure?')) {
          e.preventDefault();
          deleteAssurances(ref)
            .then((result) => {
              alert(result);
              setIsUpdated(true);
            },
              (error) => {
                alert("Failed to delete Assurance");
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

                        <th>Référence</th>
                        <th>Début assurance</th>
                        <th>Fin assurance</th>
                        <th>Immatriculation</th>
                        <th>Agence</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assurances.map((ass) =>
                        <tr key={ass.id}>
                            <td>{ass.ref}</td>
                            <td>{ass.debut_ass}</td>
                            <td>{ass.fin_ass}</td>
                            <td>{ass.taxi}</td>
                            <td>{ass.agence}</td>
                            <td >
                                <Button className="mr-2" variant="warning"
                                    onClick={event => handleUpdate(event, ass)}>
                                    <FaEdit />
                                </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button className="mr-2" variant="danger"
                                onClick={event => handleDelete(event, ass.ref)}>
                                    <RiDeleteBin5Line />
                                </Button>
                                <UpdateAssuranceModal show={editModalShow} onHide={EditModalClose}
                                    assurance={editAssurance} setUpdated={setIsUpdated}>
                                </UpdateAssuranceModal>




                            </td>
                        </tr>)}


                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add</Button>{' '}
                <AddAssuranceModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
                </AddAssuranceModal>
            </ButtonToolbar>
        </div>);
}
export default Assurances;