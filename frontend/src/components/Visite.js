import { getVisites, deleteVisites } from "../services/VisiteService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddVisiteModal from './AddVisiteModal';
import UpdateVisiteModal from './UpdateVisiteModal';


const Visites = () => {
    const [visites, setVisites] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editVisite, setEditVisite] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        let mounted = true;
        getVisites()
            .then(data => {
                if (mounted) {
                    setVisites(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, visites]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true)
    };

    const handleUpdate = (e, vst) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditVisite(vst);
    };

    const handleDelete = (e, numVis) => {
        if (window.confirm('Etes-vous sure?')) {
          e.preventDefault();
          deleteVisites(numVis)
            .then((result) => {
              alert(result);
              setIsUpdated(true);
            },
              (error) => {
                alert("Erreur de suppression de visite");
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

                        <th>Numero de visite</th>
                        <th>Date de visite</th>
                        <th>Date de validité de visite</th>
                        <th>Immatriculation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visites.map((vst) =>
                        <tr key={vst.id}>
                            <td>{vst.numVis}</td>
                            <td>{vst.date_vis}</td>
                            <td>{vst.fin_vis}</td>
                            <td>{vst.taxi}</td>
                            <td >
                                <Button className="mr-2" variant="warning"
                                    onClick={event => handleUpdate(event, vst)}>
                                    <FaEdit />
                                </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button className="mr-2" variant="danger"
                                onClick={event => handleDelete(event, vst.numVis)}>
                                    <RiDeleteBin5Line />
                                </Button>
                                <UpdateVisiteModal show={editModalShow} onHide={EditModalClose}
                                    visite={editVisite} setUpdated={setIsUpdated}>
                                </UpdateVisiteModal>




                            </td>
                        </tr>)}


                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add</Button>{' '}
                <AddVisiteModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
                </AddVisiteModal>
            </ButtonToolbar>
        </div>);
}
export default Visites