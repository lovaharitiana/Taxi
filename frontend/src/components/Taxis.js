
import { getTaxis, deleteTaxis } from "../services/TaxiService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddTaxiModal from './AddTaxiModal';
import UpdateTaxiModal from './UpdateTaxiModal';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaSearch } from "react-icons/fa";
import "../recherche.css";


const Taxis = () => {
  const [taxis, setTaxis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Recherche lancée pour : ${searchTerm}`);
  };

  const filteredTaxis = taxis.filter(txs =>
    txs.numImm.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editTaxi, setEditTaxi] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (taxis.length && !isUpdated) {
      return;
    }
    getTaxis()
      .then(data => {
        if (mounted) {
          setTaxis(data)
        }
      })
    return () => {
      mounted = false;
      setIsUpdated(false);
    }
  }, [isUpdated, taxis]);

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true)
  };

  const handleUpdate = (e, txs) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditTaxi(txs);
  };

  const handleDelete = (e, numImm) => {
    if (window.confirm('Etes-vous sure?')) {
      e.preventDefault();
      deleteTaxis(numImm)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        },
          (error) => {
            alert("Erreur de suppression de taxi");
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
      <Table striped bordered hover className="table-container">
        <thead>
          <tr>

            <th>Numero immatriculation</th>
            <th>Marque du véhicule</th>
            <th>Nombre de place</th>
            <th>Carte grise</th>
            <th>Chauffeur</th>
            {/* <th>Numero moteur</th>
            <th>Poids total</th>
            <th>Poids à vide</th>
            <th>Charge utile</th>
            <th>Carrosserie du vehicule</th>
            <th>Numero Carte_Grise</th>
            <th>Chauffeur</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTaxis.map((txs) =>
            <tr key={txs.id}>
              <td>{txs.numImm}</td>
              <td>{txs.marque}</td>
              <td>{txs.nb_place}</td>
              <td>{txs.carte_grise}</td>
              <td>{txs.chauffeur}</td>
              <td >
              <Button className="mr-2" variant="warning"
                  onClick={event => handleUpdate(event, txs)}>
                  <FaEdit />
                </Button>
                
                <Button className="mr-2" variant="danger"
                  onClick={event => handleDelete(event, txs.numImm)}>
                  <RiDeleteBin5Line />
                </Button>
                <span>&nbsp;&nbsp;</span>
                

                <UpdateTaxiModal show={editModalShow} onHide={EditModalClose}
                  taxi={editTaxi} setUpdated={setIsUpdated}>
                </UpdateTaxiModal>

              </td>
            </tr>)}


        </tbody>
      </Table>
      <ButtonToolbar>
        <Button variant="success" onClick={handleAdd}>Ajouter</Button>{' '}
        <AddTaxiModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
        </AddTaxiModal>
      </ButtonToolbar>
    </div>);
}
export default Taxis