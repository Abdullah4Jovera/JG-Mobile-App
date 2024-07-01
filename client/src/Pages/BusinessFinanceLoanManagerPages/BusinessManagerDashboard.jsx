import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BusinessFinanceNavbar from './BusinessFinanceNavbar';
import SideBar from '../SuperAdminPages/SideBar';
import ReactCardFlip from 'react-card-flip';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './BusinessManager.css';

const BusinessManagerDashboard = () => {
  const { state } = useContext(AuthContext);
  const [isFlipped, setIsFlipped] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  const { loans } = state;

  const handleStatusChange = (status) => {
    setFilterStatus(status);
  };

  const filteredLoans = loans?.businessFinanceLoans?.filter((loan) =>
    filterStatus === 'all' ? true : loan.status === filterStatus
  );

  const handleClick = (loanId) => {
    setIsFlipped((prevState) => ({
      ...prevState,
      [loanId]: !prevState[loanId],
    }));
  };

  const handleDetailsClick = (loanId) => {
    navigate(`/businessDetails/${loanId}`);
  };

  return (
    <div>
      <BusinessFinanceNavbar />
      <Container fluid>
        <Row>
          <Col xs={12} md={2} className="d-none d-md-block">
            <SideBar />
          </Col>
          <Col xs={12} md={10}>
            <div className='AllBtnNav' >
              <Link to={'/marketing'} className='linkClassNav' >Personal Loan</Link>
              <Link to={'/marketing'} className='linkClassNav' >Bank</Link>
              <Link to={'/marketing'} className='linkClassNav' >Business Banking</Link>
              <Link to={'/marketing'} className='linkClassNav' >Mortgage</Link>
              <Link to={'/marketing'} className='linkClassNav' >CEO Mortgage</Link>
              <Link to={'/marketing'} className='linkClassNav' >Real Estate</Link>
              <Link to={'/marketing'} className='linkClassNav' >CEO</Link>
              <Link to={'/marketing'} className='linkClassNav' >Ajman Branch</Link>
            </div>
            <Row className="AllleadsCardsContainer">
              <Col className='mt-3' xs={12} sm={12} md={2} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }} >

                <div className='leadsClass mt-2' >
                  <p style={{ fontWeight: '700px' }} >New Lead</p>
                  <div className='NumberValueCount' >
                    <p style={{ color: 'white' }} >30</p>
                  </div>
                </div>

                {filteredLoans &&
                  filteredLoans.map((loan, index) => (
                    <div key={loan._id} className="p-2" >
                      <Draggable axis="both">
                        <div>
                          <ReactCardFlip
                            isFlipped={isFlipped[loan._id]}
                            flipDirection="vertical"
                            className="reactClipcard"
                          >
                            <div className="card front" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(#f9f0ea, #eff9fd)', textAlign: 'start' }}>
                              <p>{`Company : ${loan.companyName || 'Jovera Group'}`}</p>
                              <p>Name: {loan.userId?.name || 'User Deleted'}</p>
                              <p>Email: {loan.userId?.email || 'Email Not Found'}</p>
                              <p>Service: {loan.services}</p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                            <div className="card back" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(to right, #f8f7f6 0%, #d2d8e4  51%, #f8f7f6  100%)', textAlign: 'start' }}>
                              <p>Status : {loan.status}</p>
                              <p>Company POS : {loan.companyPOS ? 'True' : 'False'}</p>
                              <p>Source: {loan.source}</p>
                              <p>
                                Date:{' '}
                                {new Date(loan.applicationDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                          </ReactCardFlip>
                        </div>
                      </Draggable>
                    </div>
                  ))}
              </Col>
              <Col className='mt-3' xs={12} sm={12} md={2} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
                <div className='leadsClass mt-2' >
                  <p style={{ fontWeight: '700px' }} >Marketing Lead</p>
                  <div className='NumberValueCount' >
                    <p style={{ color: 'white' }} >20</p>
                  </div>
                </div>
                {filteredLoans &&
                  filteredLoans.map((loan, index) => (
                    <div key={loan._id} className="p-2" >
                      <Draggable axis="both">
                        <div>
                          <ReactCardFlip
                            isFlipped={isFlipped[loan._id]}
                            flipDirection="vertical"
                            className="reactClipcard"
                          >
                            <div className="card front" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(#f9f0ea, #eff9fd)', textAlign: 'start' }}>
                              <p>{`Company : ${loan.companyName || 'Jovera Group'}`}</p>
                              <p>Name: {loan.userId?.name || 'User Deleted'}</p>
                              <p>Email: {loan.userId?.email || 'Email Not Found'}</p>
                              <p>Service: {loan.services}</p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                            <div className="card back" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(to right, #f8f7f6 0%, #d2d8e4  51%, #f8f7f6  100%)', textAlign: 'start' }}>
                              <p>Status : {loan.status}</p>
                              <p>Company POS : {loan.companyPOS ? 'True' : 'False'}</p>
                              <p>Source: {loan.source}</p>
                              <p>
                                Date:{' '}
                                {new Date(loan.applicationDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                          </ReactCardFlip>
                        </div>
                      </Draggable>
                    </div>
                  ))}
              </Col>
              <Col className='mt-3' xs={12} sm={12} md={2} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }} >

                <div className='leadsClass mt-2' >
                  <p style={{ fontWeight: '700px' }} >Follow Up</p>
                  <div className='NumberValueCount' >
                    <p style={{ color: 'white' }} >5</p>
                  </div>
                </div>

                {filteredLoans &&
                  filteredLoans.map((loan, index) => (
                    <div key={loan._id} className="p-2" >
                      <Draggable axis="both">
                        <div>
                          <ReactCardFlip
                            isFlipped={isFlipped[loan._id]}
                            flipDirection="vertical"
                            className="reactClipcard"
                          >
                            <div className="card front" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(#f9f0ea, #eff9fd)', textAlign: 'start' }}>
                              <p>{`Company : ${loan.companyName || 'Jovera Group'}`}</p>
                              <p>Name: {loan.userId?.name || 'User Deleted'}</p>
                              <p>Email: {loan.userId?.email || 'Email Not Found'}</p>
                              <p>Service: {loan.services}</p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                            <div className="card back" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(to right, #f8f7f6 0%, #d2d8e4  51%, #f8f7f6  100%)', textAlign: 'start' }}>
                              <p>Status : {loan.status}</p>
                              <p>Company POS : {loan.companyPOS ? 'True' : 'False'}</p>
                              <p>Source: {loan.source}</p>
                              <p>
                                Date:{' '}
                                {new Date(loan.applicationDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                          </ReactCardFlip>
                        </div>
                      </Draggable>
                    </div>
                  ))}
              </Col>
              <Col className='mt-3' xs={12} sm={12} md={2} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
                <div className='leadsClass mt-2' >
                  <p style={{ fontWeight: '700px' }} >Under Calculation</p>
                  <div className='NumberValueCount' >
                    <p style={{ color: 'white' }} >40</p>
                  </div>
                </div>
                {filteredLoans &&
                  filteredLoans.map((loan, index) => (
                    <div key={loan._id} className="p-2" >
                      <Draggable axis="both">
                        <div>
                          <ReactCardFlip
                            isFlipped={isFlipped[loan._id]}
                            flipDirection="vertical"
                            className="reactClipcard"
                          >
                            <div className="card front" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(#f9f0ea, #eff9fd)', textAlign: 'start' }}>
                              <p>{`Company : ${loan.companyName || 'Jovera Group'}`}</p>
                              <p>Name: {loan.userId?.name || 'User Deleted'}</p>
                              <p>Email: {loan.userId?.email || 'Email Not Found'}</p>
                              <p>Service: {loan.services}</p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                            <div className="card back" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(to right, #f8f7f6 0%, #d2d8e4  51%, #f8f7f6  100%)', textAlign: 'start' }}>
                              <p>Status : {loan.status}</p>
                              <p>Company POS : {loan.companyPOS ? 'True' : 'False'}</p>
                              <p>Source: {loan.source}</p>
                              <p>
                                Date:{' '}
                                {new Date(loan.applicationDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                          </ReactCardFlip>
                        </div>
                      </Draggable>
                    </div>
                  ))}
              </Col>
              <Col className='mt-3' xs={12} sm={12} md={2} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }} >
                <div className='leadsClass mt-2' >
                  <p style={{ fontWeight: '700px' }} >Final discussion</p>
                </div>
                {filteredLoans &&
                  filteredLoans.map((loan, index) => (
                    <div key={loan._id} className="p-2" >
                      <Draggable axis="both">
                        <div>
                          <ReactCardFlip
                            isFlipped={isFlipped[loan._id]}
                            flipDirection="vertical"
                            className="reactClipcard"
                          >
                            <div className="card front" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(#f9f0ea, #eff9fd)', textAlign: 'start' }}>
                              <p>{`Company : ${loan.companyName || 'Jovera Group'}`}</p>
                              <p>Name: {loan.userId?.name || 'User Deleted'}</p>
                              <p>Email: {loan.userId?.email || 'Email Not Found'}</p>
                              <p>Service: {loan.services}</p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                            <div className="card back" onClick={() => handleClick(loan._id)} style={{ background: 'linear-gradient(to right, #f8f7f6 0%, #d2d8e4  51%, #f8f7f6  100%)', textAlign: 'start' }}>
                              <p>Status : {loan.status}</p>
                              <p>Company POS : {loan.companyPOS ? 'True' : 'False'}</p>
                              <p>Source: {loan.source}</p>
                              <p>
                                Date:{' '}
                                {new Date(loan.applicationDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                              <Button onClick={() => handleDetailsClick(loan._id)} className="Businessdetails">
                                Details
                              </Button>
                            </div>
                          </ReactCardFlip>
                        </div>
                      </Draggable>
                    </div>
                  ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BusinessManagerDashboard;






