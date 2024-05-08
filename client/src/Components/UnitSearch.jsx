import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Form, Table } from 'react-bootstrap';
import { AuthContext } from '../Pages/AuthContext';

const UnitSearch = () => {
    const { state } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [floors, setFloors] = useState([]);
    const [units, setUnits] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [selectedFloor, setSelectedFloor] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('/api/properties/allproperties', {
                    headers: {
                        Authorization: `Bearer ${state.user.token}`,
                    },
                });
                setProperties(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch properties');
                setLoading(false);
            }
        };

        fetchProperties();
    }, [state.user.token]);

    const handlePropertyChange = (property) => {
        setSelectedProperty(property);
        const selectedProp = properties.find(p => p.name === property);
        if (selectedProp) {
            setFloors(selectedProp.floors);
            setSelectedFloor('');
            setUnits([]);
        }
    };

    const handleFloorChange = (floor) => {
        setSelectedFloor(floor);
        const selectedProp = properties.find(p => p.name === selectedProperty);
        if (selectedProp) {
            const selectedFloor = selectedProp.floors.find(f => f.name === floor);
            if (selectedFloor) {
                setUnits(selectedFloor.units);
            }
        }
    };

    const handleUnitChange = (unit) => {
        setSelectedUnit(unit);
        // Handle selected unit logic here
    };

    const renderUnitTable = () => {
        if (selectedProperty && selectedFloor && units.length > 0) {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Unit No</th>
                            <th>Type</th>
                            {/* Add more columns if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit, index) => (
                            <tr key={index}>
                                <td>{unit.unitNo}</td>
                                <td>{unit.type}</td>
                                {/* Add more columns if needed */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );
        }
        return null;
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', color: 'green' }} ><Spinner /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="search-field">
                <Form.Group controlId="propertySelect">
                    <Form.Label>Select Property</Form.Label>
                    <Form.Control as="select" onChange={(e) => handlePropertyChange(e.target.value)}>
                        <option value="">Select Property</option>
                        {properties.map((property, index) => (
                            <option key={index} value={property.name}>{property.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </div>

            <div className="search-field">
                <Form.Group controlId="floorSelect">
                    <Form.Label>Select Floor</Form.Label>
                    <Form.Control as="select" onChange={(e) => handleFloorChange(e.target.value)}>
                        <option value="">Select Floor</option>
                        {floors.map((floor, index) => (
                            <option key={index} value={floor.name}>{floor.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </div>

            <div className="search-field" style={{ marginBottom: '20px' }}>
                {selectedProperty && selectedFloor && (
                    <>
                        <p>Selected Property: {selectedProperty}</p>
                        <p>Selected Floor: {selectedFloor}</p>
                        {renderUnitTable()}
                    </>
                )}
            </div>
        </>
    );
}

export default UnitSearch;
