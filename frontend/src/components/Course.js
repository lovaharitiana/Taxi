import { getCourses } from "../services/CourseService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import UpdateCourseModal from './UpdateCourseModal';
import { FaSearch } from "react-icons/fa";
import "../recherche.css";
import { confirmAlert } from 'react-confirm-alert';


const Course = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Recherche lancée pour : ${searchTerm}`);
    };

    const filteredCourses = courses.filter(crs =>
        crs.user.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        crs.taxi.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const [editModalShow, setEditModalShow] = useState(false);
    const [editCourse, setEditCourse] = useState([]);

    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        let mounted = true;
        getCourses()
            .then(data => {
                if (mounted) {
                    setCourses(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, courses]);

    const handleUpdate = (e, crs) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditCourse(crs);
    };
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

                        <th>Numero course</th>
                        <th>Depart</th>
                        <th>Destination</th>
                        <th>Description</th>
                        <th>Montant</th>
                        <th>Utilisateur</th>
                        <th>Date</th>
                        <th>Taxi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map((crs) =>
                        <tr key={crs.id}>
                            <td>{crs.id}</td>
                            <td>{crs.depart}</td>
                            <td>{crs.destination}</td>
                            <td>{crs.description.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}</td>
                            <td>{crs.montant}</td>
                            <td>{crs.user}</td>
                            <td>{crs.dateCrs}</td>
                            <td>{crs.taxi}</td>
                            <td>
                                <Button className="mr-2" variant="warning"
                                    onClick={event => handleUpdate(event, crs)}>
                                    <FaEdit />
                                </Button>


                                <UpdateCourseModal show={editModalShow} onHide={EditModalClose}
                                    course={editCourse} setUpdated={setIsUpdated}>
                                </UpdateCourseModal>

                            </td>
                        </tr>)}


                </tbody>
            </Table>


        </div>);
}
export default Course