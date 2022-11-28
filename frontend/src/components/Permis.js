import { getPermis, deletePermis } from "../services/PermiService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddPermiModal from './AddPermiModal';
import UpdatePermiModal from './UpdatePermiModal';


const Permis = () => {
    const [permis, setPermis] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editPermi, setEditPermi] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        let mounted = true;
        getPermis()
            .then(data => {
                if (mounted) {
                    setPermis(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, permis]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true)
    };

    const handleUpdate = (e, per) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditPermi(per);
    };

    const handleDelete = (e, numPer) => {
        if (window.confirm('Are you sure?')) {
          e.preventDefault();
          deletePermis(numPer)
            .then((result) => {
              alert(result);
              setIsUpdated(true);
            },
              (error) => {
                alert("Failed to delete Permis");
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

                        <th>Numero Permis</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {permis.map((per) =>
                        <tr key={per.id}>
                            <td>{per.numPer}</td>
                            <td>{per.date}</td>
                            
                            <td >
                                <Button className="mr-2" variant="warning"
                                    onClick={event => handleUpdate(event, per)}>
                                    <FaEdit />
                                </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button className="mr-2" variant="danger"
                                onClick={event => handleDelete(event, per.numPer)}>
                                    <RiDeleteBin5Line />
                                </Button>
                                <UpdatePermiModal show={editModalShow} onHide={EditModalClose}
                                    permi={editPermi} setUpdated={setIsUpdated}>
                                </UpdatePermiModal>




                            </td>
                        </tr>)}


                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add</Button>{' '}
                <AddPermiModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
                </AddPermiModal>
            </ButtonToolbar>
        </div>);
}
export default Permis;