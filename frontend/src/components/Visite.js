import { getVisites, deleteVisites } from "../services/VisiteService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddVisiteModal from './AddVisiteModal';
import UpdateVisiteModal from './UpdateVisiteModal';
import { FaSearch } from "react-icons/fa";
import "../recherche.css";

const Visites = () => {
    const [visites, setVisites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Recherche lancée pour : ${searchTerm}`);
    };

    const filteredVisites = visites.filter(vst =>
        vst.numVis.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        vst.taxi.toLowerCase().includes(searchTerm.toLowerCase())
        );

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
        <div className="row side-row" style={{ fontFamily: 'Times New Roman' }}>
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

                        <th>Numero de visite</th>
                        <th>Date de visite</th>
                        <th>Date de validité de visite</th>
                        <th>Immatriculation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVisites.map((vst) =>
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
                <Button variant="success" onClick={handleAdd}>Ajouter</Button>{' '}
                <AddVisiteModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
                </AddVisiteModal>
            </ButtonToolbar>
        </div>);
}
export default Visites