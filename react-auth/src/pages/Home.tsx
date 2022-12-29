import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { addCourse } from '../services/CourseService';
import { Button, Modal, Row, Col, Form, FormControl } from "react-bootstrap";
import { TileLayer, TileLayerProps, MapContainer, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L, { icon } from 'leaflet';
import { LatLng } from 'leaflet';
import { Popup, Marker } from 'react-leaflet';
import { type } from '@testing-library/user-event/dist/type';


const Home = (props: any) => {


    const [show, setShow] = useState(false)

    const [distance, setDistance] = useState(0)
    const [speed, setSpeed] = useState(2);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const currentDate = new Date();
    const estimatedTimeInMinutes = Math.ceil(estimatedTime * 5);
    const handleSubmit = (e: { preventDefault: () => void; target: any; }) => {
        e.preventDefault();

        addCourse(e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
            },
                (error) => {
                    alert("Failed to add Course");
                });
    }
    const handleCalculer = (e: { preventDefault: () => void; target: any; }) => {
        e.preventDefault();
        setShow(true);
        setDistance(Math.floor(Math.random() * 10) + 1)
    }
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

   

    const Markers = () => {



        const [firstClick, setFirstClick] = useState<[number, number] | null>(null);

        const getPlaceName = async (lat: number, lng: number) => {
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
                );
                const data = response.data;
                if (data.display_name) {
                    return data.display_name;
                } else {
                    throw new Error('Nominatim API request failed');
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        };
        const map = useMapEvents({
            async click(e) {

                const lat = e.latlng.lat;
                const lng = e.latlng.lng;
                const placeName = await getPlaceName(lat, lng);
                // if (departInput) {
                //   departInput.value = `${lat}, ${lng}`;
                // }

                 // if (destinationInput) {
                //   destinationInput.value = `${lat}, ${lng}`;
                // }
                if (placeName){
                    if (firstClick === null) {
                         const departInput = document.getElementById('depart') as HTMLInputElement;
               
                        if (departInput) {
                            departInput.value = placeName;
                        }
                        // Update the firstClick state variable with the clicked position
                        setFirstClick([lat, lng]);
                    } else {
                        const destinationInput = document.getElementById('destination') as HTMLInputElement;
               
                        if (destinationInput) {
                            destinationInput.value = placeName;
                        }
                        setFirstClick(null);
                    }
                }
            },
        });
        return (
            // Render a marker at the position of the first click, if it exists
            firstClick ? (
                <Marker key={firstClick[0]} position={firstClick} interactive={false} />
            ) : null
        );
    };

    //     return (
    //         selectedPosition ?
    //             <Marker
    //                 key={selectedPosition[0]}
    //                 position={selectedPosition}
    //                 interactive={false}
    //             >

    //             </Marker >
    //             : null
    //     )

    // }


    useEffect(() => {
        setEstimatedTime(distance / speed);
    }, [distance, speed]);





    return (
        <div>

            <div className="container">

                <MapContainer center={[-21.4534, 47.0761]} zoom={14} style={{ width: '850px', height: '600px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Markers />

                </MapContainer>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="depart">
                        <Form.Label>Depart</Form.Label>
                        <Form.Control type="text" name="depart" required placeholder=""></Form.Control>
                    </Form.Group>





                    <Form.Group controlId="destination">
                        <Form.Label>Destination</Form.Label>
                        <Form.Control type="text" name="destination" required placeholder=""></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" as="textarea" rows={parseInt('5', 10)} name="description" required placeholder="Indication pour notre chauffeur "></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="dateCrs">

                        <Form.Control type="hidden" name="dateCrs" required placeholder="" value={currentDate.toISOString().substr(0, 10)}></Form.Control>

                    </Form.Group>

                    <Form.Group controlId="distance">
                        <Form.Label>Distance</Form.Label>
                        <Form.Control type="hidden" name="distance" required placeholder=""></Form.Control>
                    </Form.Group>




                    <Form.Group>
                        <p></p>
                        <Button variant="primary" onClick={handleCalculer}>
                            Calculez
                        </Button>
                    </Form.Group>

                    {show && <Form.Group controlId="calcul">
                        <Form.Group controlId="distance">

                            <Form.Control type="hidden" name="distance" required placeholder="" value={distance}></Form.Control>

                        </Form.Group>


                        <Form.Group controlId="montant">
                            <Form.Label>Tarif</Form.Label>
                            <Form.Control type="number" name="montant" required placeholder="" value={distance * 1500}></Form.Control>
                            <div>
                                <h2>Arrivé du taxi dans: {estimatedTimeInMinutes} minutes</h2>
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <p></p>
                            <Button variant="primary" type="submit">
                                Envoyer
                            </Button>
                        </Form.Group>
                    </Form.Group>}



                </Form>

            </div>
        </div>
    );
};

export default Home;
