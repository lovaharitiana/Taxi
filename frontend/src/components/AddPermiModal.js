import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addPermi} from '../services/PermiService';
const addPermiModal = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addPermi(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to add Permi");
        }); 
    }
    return (
        <div className="container">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ajouter Permi
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="numPer">
                                    <Form.Label>Numero Permi</Form.Label>
                                    <Form.Control type="text" name="numPer" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" name="date" required placeholder=""></Form.Control>
                                </Form.Group>

                                
                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Ajouter
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};
export default addPermiModal;
