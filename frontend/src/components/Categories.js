import { getCategories, deleteCategories } from "../services/CategorieService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddCategorieModal from './AddCategorieModal';
import UpdateCategorieModal from './UpdateCategorieModal';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editCategorie, setEditCategorie] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        let mounted = true;
        getCategories()
            .then(data => {
                if (mounted) {
                    setCategories(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, categories]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true)
    };

    const handleUpdate = (e, cat) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditCategorie(cat);
    };

    const handleDelete = (e, numCat) => {
        if (window.confirm('Are you sure?')) {
          e.preventDefault();
          deleteCategories(numCat)
            .then((result) => {
              alert(result);
              setIsUpdated(true);
            },
              (error) => {
                alert("Failed to delete Categorie");
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

                        <th>Numero Categorie</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) =>
                        <tr key={cat.id}>
                            <td>{cat.numCat}</td>
                            <td>{cat.type}</td>
                            
                            <td >
                                <Button className="mr-2" variant="warning"
                                    onClick={event => handleUpdate(event, cat)}>
                                    <FaEdit />
                                </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button className="mr-2" variant="danger"
                                onClick={event => handleDelete(event, cat.numCat)}>
                                    <RiDeleteBin5Line />
                                </Button>
                                <UpdateCategorieModal show={editModalShow} onHide={EditModalClose}
                                    categorie={editCategorie} setUpdated={setIsUpdated}>
                                </UpdateCategorieModal>




                            </td>
                        </tr>)}


                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add</Button>{' '}
                <AddCategorieModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
                </AddCategorieModal>
            </ButtonToolbar>
        </div>);
}
export default Categories;