import { getCarte_grises, deleteCarte_grises } from "../services/Carte_griseService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddCarte_griseModal from './AddCarte_griseModal';
import UpdateCarte_griseModal from './UpdateCarte_griseModal';




const Carte_grises = () => {
    const [carte_grises, setCarte_grises] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editCarte_grise, setEditCarte_grise] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        let mounted = true;
        getCarte_grises()
            .then(data => {
                if (mounted) {
                    setCarte_grises(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, carte_grises]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true)
    };

    const handleUpdate = (e, crt) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditCarte_grise(crt);
    };

    const handleDelete = (e, numSerie) => {
        if (window.confirm('Are you sure?')) {
          e.preventDefault();
          deleteCarte_grises(numSerie)
            .then((result) => {
              alert(result);
              setIsUpdated(true);
            },
              (error) => {
                alert("Failed to delete Carte_grise");
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

                        <th>Numero de serie</th>
                        <th>Date de fabrication</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {carte_grises.map((crt) =>
                        <tr key={crt.id}>
                            <td>{crt.numSerie}</td>
                            <td>{crt.date_fabrication}</td>

                            <td >
                                <Button className="mr-2" variant="warning"
                                    onClick={event => handleUpdate(event, crt)}>
                                    <FaEdit />
                                </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button className="mr-2" variant="danger"
                                onClick={event => handleDelete(event, crt.numSerie)}>
                                    <RiDeleteBin5Line />
                                </Button>
                                <UpdateCarte_griseModal show={editModalShow} onHide={EditModalClose}
                                    carte_grise={editCarte_grise} setUpdated={setIsUpdated}>
                                </UpdateCarte_griseModal>




                            </td>
                        </tr>)}


                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add</Button>{' '}
                <AddCarte_griseModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
                </AddCarte_griseModal>
            </ButtonToolbar>
        </div>);
}
export default Carte_grises