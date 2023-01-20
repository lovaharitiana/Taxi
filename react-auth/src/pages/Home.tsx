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
import "./mapcont.css"


const Home = (props: any) => {
    const [showEstimatedTime, setShowEstimatedTime] = useState(false);
    const [description, setDescription] = useState('');
    const [firstClick, setFirstClick] = useState<[number, number] | null>(null);
    const [departValue, setDepartValue] = useState('');
    const [destinationValue, setDestinationValue] = useState('');
    const [distanceValue, setDistanceValue] = useState(0);
    const [calculMontant, setCalculMontant] = useState(0);
    console.log(distanceValue, destinationValue, departValue, calculMontant, description);


    const [show, setShow] = useState(false)

    // const [distance, setDistance] = useState(0)
    const [speed, setSpeed] = useState(2);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const currentDate = new Date();
    const estimatedTimeInMinutes = Math.ceil(estimatedTime * 40);
    const handleSubmit = (e: { preventDefault: () => void; target: any; }) => {
        e.preventDefault();
        

        addCourse(e.target, distanceValue, destinationValue, departValue, calculMontant)
            .then((result) => {
                alert(result.data);
                console.log(props)
                setDepartValue('');
                setDestinationValue('');
                setDistanceValue(0);
                setCalculMontant(0);
                setDescription('');
                setShowEstimatedTime(false);

            }).catch((error) => {
                alert("Failed to add Course");
                console.log(error)
            });

    }
    const handleCalculer = (e: { preventDefault: () => void; target: any; }) => {
        e.preventDefault();


        const depart = document.getElementById('depart');
        const destination = document.getElementById('destination');
        const description = document.getElementById('destination');

        if (!depart || !destination || !description) {
            // Return from the function if any of the form elements are empty
            return;
        }

        setShow(true);
        setShowEstimatedTime(true);
        // setDistance(Math.floor(Math.random() * 10) + 1)
    }
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);



    const Markers = () => {





        const getPlaceName = async (lat: number, lng: number) => {
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
                );
                const data = response.data;
                if (data.display_name) {
                    return data.display_name.split(',')[0];
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
                if (placeName) {
                    if (firstClick === null) {
                        const departInput = document.getElementById('depart') as HTMLInputElement;


                        if (departInput) {
                            departInput.value = placeName;
                            // console.log( departInput.value);
                            // localStorage.setItem("depart", JSON.stringify(departInput.value));
                            setDepartValue(departInput.value);


                        }
                        // Update the firstClick state variable with the clicked position
                        setFirstClick([lat, lng]);
                    } else {
                        const destinationInput = document.getElementById('destination') as HTMLInputElement;

                        if (destinationInput) {
                            destinationInput.value = placeName;
                            localStorage.setItem("destination", JSON.stringify(destinationInput.value));
                            setDestinationValue(destinationInput.value);
                        }
                        setFirstClick(null);

                        // Calculate the distance between the two positions
                        const departPos = new LatLng(firstClick[0], firstClick[1]);
                        const destinationPos = new LatLng(lat, lng);
                        const distanceInMeters = Number(departPos.distanceTo(destinationPos));
                        const distanceInKilometers = distanceInMeters / 1000;
                        const distanceInKilometersRounded = distanceInKilometers.toFixed(2); // round to 
                        console.log(distanceInKilometersRounded);
                        localStorage.setItem("distance", JSON.stringify(distanceInKilometersRounded));
                        setDistanceValue(+ distanceInKilometersRounded);
                        setCalculMontant(Number((Number(distanceInKilometersRounded) * 10000).toFixed(2).toString()));
                        console.log(Number((Number(distanceInKilometersRounded) * 10000).toFixed(2).toString()));
                        localStorage.setItem("montant", JSON.stringify(Number((Number(distanceInKilometersRounded) * 10000).toFixed(2).toString())));



                        const distanceElement = document.getElementById('distance') as HTMLInputElement;
                        if (distanceElement) {
                            distanceElement.value = distanceInKilometersRounded.toString();
                        }
                        // Calculate the estimated time based on the distance and speed
                        const timeInHours = distanceInKilometers / speed;
                        const timeInMinutes = Math.ceil(timeInHours) * 60;
                        setEstimatedTime(timeInHours);
                        console.log(timeInMinutes);

                        // Show the modal with the calculated distance and estimated time
                        //  setShow(true);
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


    // useEffect(() => {
    //     setEstimatedTime(distance / speed);
    // }, [distance, speed]);





    return (
        <div className="containerMap">

            <div className='map'>

                <MapContainer center={[-21.4534, 47.0761]} zoom={14} style={{ width: '100%', height: '700px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Markers />

                </MapContainer>
            </div>

            <div className='form' style={{ fontFamily: 'poppins' }}>
                <div className='formulaire'>
                    <Form onSubmit={handleSubmit}>
                        <div className='container'>
                            <div className='premier_formulaire'>
                                <Form.Group controlId="depart" >
                                    <Form.Label className='depart_ecriture'><strong>Depart</strong></Form.Label>
                                    <Form.Control value={departValue} type="text" name="depart" placeholder="" className='depart'></Form.Control>
                                </Form.Group>





                                <Form.Group controlId="destination">
                                    <Form.Label><strong>Destination</strong></Form.Label>
                                    <Form.Control value={destinationValue} type="text" name="destination" placeholder=""></Form.Control>
                                </Form.Group>

                            </div>
                            {/* <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" as="textarea" rows={parseInt('5', 10)} name="description" required placeholder="Indication pour notre chauffeur "></Form.Control>
                    </Form.Group> */}
                            <div className='deuxieme_formulaire'>
                                <Form.Group controlId="description">
                                    <Form.Label><strong>Description</strong></Form.Label>
                                    <Form.Control type="text" as="textarea" rows={parseInt('5', 10)} name="description" value={description} onChange={e => setDescription(e.target.value)} required placeholder="Indication pour notre chauffeur "></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group controlId="dateCrs">

                            <Form.Control type="hidden" name="dateCrs" required placeholder="" value={currentDate.toISOString().substr(0, 10)}></Form.Control>

                        </Form.Group>



                        <Form.Group controlId="distance">
                            {/* <Form.Label>Distance</Form.Label> */}
                            <Form.Control value={distanceValue} type="hidden" name="distance" placeholder="" ></Form.Control>
                        </Form.Group>


                        <Form.Group >
                            <p></p>
                            <Button variant="primary" onClick={handleCalculer} className='btn_calculer'>
                                Calculez
                            </Button>
                        </Form.Group>


                        <div className='troisième_formulaire'>
                            {show ? (<Form.Group controlId="calcul" className='formulaire_calcul' >
                                {/* <Form.Group controlId="distance">

                            <Form.Control type="hidden" name="distance" required placeholder="" ></Form.Control>

                        </Form.Group> */}



                                {/* <Form.Group controlId="montant">
                                <Form.Label>Tarif(Ariary)</Form.Label>
                                <Form.Control type="number" name="montant" required placeholder="" value={calculMontant}></Form.Control> */}
                                {/* <div>
                                <h2>Arrivé du taxi dans: {estimatedTimeInMinutes} minutes</h2>
                            </div> */}

                                {/* {showEstimatedTime ? (
                                    <div>
                                        <h2>Arrivé du taxi dans: {estimatedTimeInMinutes} minutes</h2>
                                    </div>
                                ) : null}
                            </Form.Group> */}
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Tarif (Ariary)</th>
                                            <th className='estimation'>Estimation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Form.Control
                                                    type="number"
                                                    name="montant"
                                                    required
                                                    placeholder=""
                                                    value={calculMontant}
                                                    className='montant'
                                                />
                                            </td>
                                            <td>
                                                {showEstimatedTime ? (
                                                    <p className='arrive_taxi'>Arrivé du taxi dans: {estimatedTimeInMinutes} minutes</p>
                                                ) : null}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                                <Form.Group >
                                    <p></p>
                                    <Button variant="primary" type="submit" className='btn_envoyer'>
                                        Envoyer
                                    </Button>
                                </Form.Group>
                            </Form.Group>) : null}

                        </div>

                    </Form>
                </div>
            </div>

        </div>
    );
};

export default Home;
