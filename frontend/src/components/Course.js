import { getCourses } from "../services/CourseService";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import UpdateCourseModal from './UpdateCourseModal';





const Course = () => {
    const [courses, setCourses] = useState([]);
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
        <div className="row side-row">
            <Table striped bordered hover>
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
                    {courses.map((crs) =>
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
                            <td>{crs.date}</td>
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