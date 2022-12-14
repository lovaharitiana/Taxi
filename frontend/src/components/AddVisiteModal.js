import React, { useEffect, useState } from "react";
import { getTaxis } from "../services/TaxiService";

import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addVisite } from '../services/VisiteService';
const AddVisiteModal = (props) => {
    const [taxis, setTaxis] = useState([]);
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
    
    const handleSubmit = (e) => {
       e.preventDefault();
        addVisite(e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to add Visite");
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
                        Ajouter Visite
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="numVis">
                                    <Form.Label>Numero de visite</Form.Label>
                                    <Form.Control type="text" name="numVis" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="date_vis">
                                    <Form.Label>Date de visite</Form.Label>
                                    <Form.Control type="date" name="date_vis" required placeholder=""></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="fin_vis">
                                    <Form.Label>Date de validité du visite</Form.Label>
                                    <Form.Control type="date" name="fin_vis" required placeholder=""></Form.Control>
                                </Form.Group>

                                <p></p>
                                <Form.Select aria-label="Default select example" name="numImm" >
                                    {taxis.map((txs) =>

                                        <option value={txs.numImm}>{txs.numImm}</option>
                                    )}
                                </Form.Select>

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
export default AddVisiteModal;
