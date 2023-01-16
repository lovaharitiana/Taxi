import React from "react";
import { getTaxis } from "../services/TaxiService";
import { getAgences } from "../services/AgenceService";

import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { addAssurance } from '../services/AssuranceService';
import { useEffect, useState } from "react";

const AddAssuranceModal = (props) => {
    const [taxis, setTaxis] = useState([]);
    const [agences, setAgences] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    // TAXI
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
    // AGENCES
      useEffect(() => {
        let mounted = true;
        getAgences()
            .then(data => {
                if (mounted) {
                    setAgences(data)
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, agences]);


const handleSubmit = (e) => {
    e.preventDefault();
    addAssurance(e.target)
        .then((result) => {
            alert(result);
            props.setUpdated(true);
        },
            (error) => {
                alert("Erreur d'ajout d'assurance");
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
                    Ajouter Assurance
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="ref">
                                <Form.Label>Référence</Form.Label>
                                <Form.Control type="text" name="ref" required placeholder=""></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="debut_ass">
                                <Form.Label>Debut assurance</Form.Label>
                                <Form.Control type="date" name="debut_ass" required placeholder=""></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="fin_ass">
                                <Form.Label>Fin assurance</Form.Label>
                                <Form.Control type="date" name="fin_ass" required placeholder=""></Form.Control>
                            </Form.Group>
                            <p></p>
                            <Form.Label>Immatriculation</Form.Label>
                            <Form.Select aria-label="Default select example" name="numImm" >
                            
                            {taxis.map((txs) =>

                                <option value={txs.numImm}>{txs.numImm}</option>
                            )}
                            </Form.Select>
                            <p></p>
                            <Form.Label>Agence</Form.Label>
                            <Form.Select aria-label="Default select example" name="numAg" >
                            
                            {agences.map((ag) =>

                                <option value={ag.numAg}>{ag.numAg}</option>
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
export default AddAssuranceModal;
