import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getChauffeurs, deleteChauffeurs } from "../services/ChauffeurService";
import "../App.css";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { Button, ButtonToolbar } from 'react-bootstrap';
import AddChauffeurModal from './AddChauffeurModal';
import UpdateChauffeurModal from './UpdateChauffeurModal';


const Chauffeurs = () => {
  const [chauffeurs, setChauffeurs] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editChauffeur, setEditChauffeur] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (chauffeurs.length && !isUpdated) {
      return;
    }
    getChauffeurs()
      .then(data => {
        if (mounted) {
          setChauffeurs(data)
        }
      })
    return () => {
      mounted = false;
      setIsUpdated(false);
    }
  }, [isUpdated, chauffeurs]);

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true)
  };

  const handleUpdate = (e, chf) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditChauffeur(chf);
  };

  const handleDelete = (e, numChf) => {
    if (window.confirm('Are you sure?')) {
      e.preventDefault();
      deleteChauffeurs(numChf)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        },
          (error) => {
            alert("Failed to delete Chauffeur");
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

            <th>Numero chauffeur</th>
            <th>Nom</th>
            <th>Prénoms</th>
            <th>Date de naissance</th>
            <th>Lieu de naissance</th>
            <th>Adresse</th>
            <th>Profession</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {chauffeurs.map((chf) =>
            <tr key={chf.id}>
              <td>{chf.numChf}</td>
              <td>{chf.nomChf}</td>
              <td>{chf.prenomChf}</td>
              <td>{chf.date_naissance}</td>
              <td>{chf.lieu_naissance}</td>
              <td>{chf.adresse}</td>
              <td>{chf.profession}</td>
              <td>
                <Button className="mr-2" variant="warning"
                  onClick={event => handleUpdate(event, chf)}>
                  <FaEdit />
                </Button>
                <span>&nbsp;&nbsp;</span>
                <Button className="mr-2" variant="danger"
                  onClick={event => handleDelete(event, chf.numChf)}>
                  <RiDeleteBin5Line />
                </Button>
                
                <UpdateChauffeurModal show={editModalShow} onHide={EditModalClose}
                  chauffeur={editChauffeur} setUpdated={setIsUpdated}>
                </UpdateChauffeurModal>
                
              </td>
            </tr>)}


        </tbody>
      </Table>
      <ButtonToolbar>
        <Button variant="success" onClick={handleAdd}>Add</Button>{' '}
        <AddChauffeurModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
        </AddChauffeurModal>
      </ButtonToolbar>
    </div>);

};
export default Chauffeurs