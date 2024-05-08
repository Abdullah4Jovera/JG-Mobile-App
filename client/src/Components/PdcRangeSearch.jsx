import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { AuthContext } from '../Pages/AuthContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const PdcRangeSearch = () => {
    const [ownerData, setOwnerData] = useState([]);
    const [propertyData, setPropertyData] = useState([]);
    const [tenantData, setTenantData] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [selectedTenant, setSelectedTenant] = useState(null);
    const [filteredPDCs, setFilteredPDCs] = useState([]);
    const [editData, setEditData] = useState({}); // Define editData state
    const [paymentMethod, setPaymentMethod] = useState('bank');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [checkOrInvoice, setCheckOrInvoice] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [bank, setBank] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { state } = useContext(AuthContext);

    // Fetch owner data
    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const response = await axios.get('/api/users/all-owners', {
                    headers: {
                        Authorization: `Bearer ${state.user.token}`
                    }
                });
                setOwnerData(response.data);
            } catch (error) {
                console.error('Error fetching owner data:', error);
            }
        };
        fetchOwnerData();
    }, [state.user.token]);

    // Fetch properties by selected owner
    useEffect(() => {
        const fetchPropertiesByOwner = async () => {
            if (selectedOwner) {
                try {
                    const response = await axios.post('/api/properties/properties-by-user', {
                        userId: selectedOwner.value._id
                    }, {
                        headers: {
                            Authorization: `Bearer ${state.user.token}`
                        }
                    });
                    setPropertyData(response.data);
                } catch (error) {
                    console.error('Error fetching properties by owner:', error);
                }
            }
        };
        fetchPropertiesByOwner();
    }, [selectedOwner, state.user.token]);

    // Fetch tenants by selected property
    useEffect(() => {
        const fetchTenantsByProperty = async () => {
            if (selectedProperty) {
                try {
                    const response = await axios.post('/api/tenants/tenants-by-property', {
                        propertyId: selectedProperty.value._id
                    }, {
                        headers: {
                            Authorization: `Bearer ${state.user.token}`
                        }
                    });
                    setTenantData(response.data);
                } catch (error) {
                    console.error('Error fetching tenants by property:', error);
                }
            }
        };
        fetchTenantsByProperty();
    }, [selectedProperty, state.user.token]);

    // Filter PDCs based on selected tenant
    useEffect(() => {
        if (selectedTenant) {
            const filteredPDCs = tenantData
                .filter(tenant => tenant._id === selectedTenant.value._id)
                .map(tenant => tenant.contractInfo.pdc);
            setFilteredPDCs(filteredPDCs);
            console.log(selectedTenant.value._id);
        } else {
            setFilteredPDCs([]);
        }
    }, [selectedTenant, tenantData]);

    // Clear selection
    const clearSelection = () => {
        setSelectedOwner(null);
        setSelectedProperty(null);
        setSelectedTenant(null);
        setFilteredPDCs([]);
    };

    // Handle modal close
    const handleModalClose = () => {
        setShowModal(false);
    };
    const handlePayNow = (pdc) => {
        console.log("Selected PDC:", pdc);
        setShowModal(true);
        setEditData({ ...editData, tenantId: selectedTenant._id, check: pdc }); // Set tenantId and check
        setPaymentAmount(pdc.amount.toString()); // Set payment amount
        setCheckOrInvoice(pdc.checkNumber); // Set check/invoice
        setPaymentDate(new Date(pdc.date).toISOString().split('T')[0]); // Set payment date
        setBank(pdc.bank); // Set bank
    };
    


const handleSave = () => {
    if (editData.check) { // Check if editData.check exists
        const updatedPaymentData = {
            paymentmethod: paymentMethod,
            paymentstatus: 'pending',
            amount: parseFloat(paymentAmount),
            date: paymentDate,
            checkorinvoice: checkOrInvoice,
            bank: paymentMethod === 'bank' ? bank : '',
        };

        axios.put(`/api/tenants/${selectedTenant.value._id}/pdc/${editData.check._id}/payments`, updatedPaymentData, {
            headers: {
                Authorization: `Bearer ${state.user.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Payment information updated successfully:', response.data);
            return axios.get('/api/tenants/alltenants', {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            });
        })
        .then(response => {
            setTenantData(response.data);
            setShowModal(false);
        })
        .catch(error => console.error('Error updating payment information:', error));
    } else {
        console.error('Edit data check is undefined');
    }
};

    return (
        <div>
            <div style={{ width: '100%', maxWidth: '500px' }}>
                {/* Owner, Property, Tenant selection */}
                <Select
                    placeholder="Select Owner"
                    value={selectedOwner}
                    onChange={setSelectedOwner}
                    options={ownerData.map(owner => ({ label: owner.name, value: owner }))}
                    isClearable
                />
                <Select
                    placeholder="Select Property"
                    value={selectedProperty}
                    onChange={setSelectedProperty}
                    options={propertyData.map(property => ({ label: property.name, value: property }))}
                    isClearable
                />
                <Select
                    placeholder="Select Tenant"
                    value={selectedTenant}
                    onChange={setSelectedTenant}
                    options={tenantData.map(tenant => ({ label: tenant.name, value: tenant }))}
                    isClearable
                />
                {/* Clear selection button */}
                <button onClick={clearSelection}>Clear</button>
            </div>

            {filteredPDCs.length > 0 && (
                <>
                    {/* Table for displaying PDCs */}
                    <h3 className='mt-4'>Today's PDC</h3>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Property Name</th>
                                <th>Floor Name</th>
                                <th>Unit NO</th>
                                <th>PDC Information</th>
                                <th>Bank</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPDCs.map(pdcList =>
                                pdcList.map(pdc => (
                                    <tr key={pdc._id}>
                                        <td>{selectedTenant.label}</td>
                                        <td>{selectedProperty.label}</td>
                                        <td>{selectedTenant && selectedTenant.value.floorId ? selectedTenant.value.floorId.name : 'N/A'}</td>
                                        <td>{selectedTenant && selectedTenant.value.unitId && selectedTenant.value.unitId.length > 0 ? selectedTenant.value.unitId[0].unitNo : 'N/A'}</td>
                                        <td>{pdc.checkNumber}</td>
                                        <td>{pdc.bank}</td>
                                        <td>{new Date(pdc.date).toLocaleDateString()}</td>
                                        <td>{pdc.amount}</td>
                                        <td>
                                        <Button onClick={() => handlePayNow(pdc)}>Pay Now</Button>                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </>
            )}

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit PDC Information</Modal.Title>
                </Modal.Header>

                <form>
                    <Modal.Body>
                        <div>
                            <label>Select Payment By:</label>
                            <select value={paymentMethod} className='w-100 py-2' style={{ border: '1px solid #ebedf2' }} onChange={e => setPaymentMethod(e.target.value)}>
                                <option value="bank">Bank</option>
                                <option value="cash">Cash</option>
                            </select>
                        </div>

                        <div>
                            <label>Amount:</label>
                            <input type="text" value={paymentAmount} className="form-control" onChange={e => setPaymentAmount(e.target.value)} />
                        </div>

                        <div>
                            <label>Date:</label>
                            <input type="date" value={paymentDate} className="form-control" onChange={e => setPaymentDate(e.target.value)} />
                        </div>

                        <div>
                            <label>Check / Invoice:</label>
                            <input type="text" value={checkOrInvoice} className="form-control" onChange={e => setCheckOrInvoice(e.target.value)} />
                        </div>

                        {paymentMethod === 'bank' && (
                            <div>
                                <label>Bank:</label>
                                <input type="text" value={bank} className="form-control" onChange={e => setBank(e.target.value)} />
                            </div>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default PdcRangeSearch;