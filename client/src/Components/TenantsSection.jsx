import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Pages/AuthContext';

const TenantsSection = () => {
    const [vacantUnits, setVacantUnits] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { state } = useContext(AuthContext);

    useEffect(() => {
        const fetchVacantUnits = async () => {
            try {
                const response = await axios.get('/api/properties/allproperties', {
                    headers: {
                        Authorization: `Bearer ${state.user.token}`
                    }
                });
                const vacantUnitsData = response.data.flatMap(property =>
                    property.floors.flatMap(floor =>
                        floor.units.filter(unit => !unit.occupied).map(unit => ({
                            propertyId: property._id,
                            propertyName: property.name,
                            propertyOwner: property.user.name,
                            floorName: floor.name,
                            unitName: unit.unitNo
                        }))
                    )
                );
                setVacantUnits(vacantUnitsData);
            } catch (error) {
                setError('Failed to fetch vacant units');
            }
        };
        fetchVacantUnits();
    }, [state]);

    const handleViewDetails = (propertyId) => {
        navigate(`/singleproperty/${propertyId}`);
    };
    const handleShowMore = () => {
        navigate('/allproperties');
    };

    return (
        <div className="row">
            <div className="card" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                    <h3 style={{color: '#4b2f00'}}>Vacant Units</h3>
                    {error && <p>Error: {error}</p>}
                    <Table responsive striped bordered hover className='mt-1'>
                        <thead style={{  backgroundColor: '#005f75' }} >
                            <tr>
                                <th style={{ color: 'white' }}>Property Name</th>
                                <th style={{ color: 'white' }}>Property Owner</th>
                                <th style={{ color: 'white' }}>Floor Name</th>
                                <th style={{ color: 'white' }}>Unit Name</th>
                                <th style={{ color: 'white' , textAlign :"center"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vacantUnits.map((unit, index) => (
                                <tr key={index}>
                                    <td>{unit.propertyName}</td>
                                    <td>{unit.propertyOwner}</td>
                                    <td>{unit.floorName}</td>
                                    <td>{unit.unitName}</td>
                                    <td   style={{  display: "flex" , justifyContent:"center", alignItems: "center"}}> 
                                        <Button
                                          
                                        
                                            className='py-2 px-3'
                                            onClick={() => handleViewDetails(unit.propertyId)}
                                        >
                                            View Details
                                        </Button>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="text-center mt-2">
                        <button className="btn btn-primary" onClick={handleShowMore}>Show All Properties</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantsSection;
