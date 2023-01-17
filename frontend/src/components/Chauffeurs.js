import React, { useEffect, useState } from "react";

import { Table } from "react-bootstrap";
import { getChauffeurs, deleteChauffeurs } from "../services/ChauffeurService";
import "../App.css";
import "../recherche.css";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { Button, ButtonToolbar } from 'react-bootstrap';
import AddChauffeurModal from './AddChauffeurModal';
import UpdateChauffeurModal from './UpdateChauffeurModal';
import { FaSearch } from "react-icons/fa";

const Chauffeurs = () => {
  const [chauffeurs, setChauffeurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Recherche lancée pour : ${searchTerm}`);
  };

  const filteredChauffeurs = chauffeurs.filter(chf =>
    chf.nomChf.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chf.prenomChf.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chf.permis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chf.capacite.toString().includes(searchTerm));

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
    if (window.confirm('Etes-vous sure?')) {
      e.preventDefault();
      deleteChauffeurs(numChf)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        },
          (error) => {
            alert("Erreur de suppression de chauffeur");
          }
        )
    }

  };

  let AddModalClose = () => setAddModalShow(false);
  let EditModalClose = () => setEditModalShow(false);
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
      
      <Table striped bordered hover className="table-container" >
        <thead>
          <tr>

            <th>Numero chauffeur</th>
            <th>Nom</th>
            <th>Prénoms</th>
            <th>Adresse</th>
            <th>Catégories permis</th>
            <th>Numero capacité</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {filteredChauffeurs.map((chf) =>
            <tr key={chf.id}>
              <td>{chf.numChf}</td>
              <td>{chf.nomChf}</td>
              <td>{chf.prenomChf}</td>
              <td>{chf.adresse}</td>
              <td>{chf.permis}</td>
              <td>{chf.capacite}</td>

              {/* <td>{chf.date_naissance}</td>
              <td>{chf.lieu_naissance}</td>
              <td>{chf.adresse}</td>
              <td>{chf.profession}</td>
              <td>{chf.permi}</td>
              <td>{chf.capacite}</td> */}
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