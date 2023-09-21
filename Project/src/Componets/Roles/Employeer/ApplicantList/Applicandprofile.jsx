import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import instance from '../../../../axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
 // Import your custom CSS for styling

function ApplicandProfile() {
  const [selectedStatus, setSelectedStatus] = useState('');
  
  const [userData, setdata] = useState({}); 
 
  const location = useLocation(); 
  const { state } = location; // Destructure the state object
  const userid = state ? state.user : null;
  const postId = state ? state.postId : null; 
  useEffect(() => {
    instance
      .get(`/user-details/${userid}/`)
      .then((response) => {
        const userData = response.data;
        setdata(response.data)
        
      })  
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userid]);

  const handleOptionalFieldChange = (e) => {
    // Handle the change in the optional field here
    const selectedValue = e.target.value;
    const dataToUpdate = {
      selectedValue: selectedValue,
    };
    instance
    .patch(`/recruiter/update-status/${userid}/${postId}/`, dataToUpdate).then((response) => {
      // Handle the response if needed
      toast.success('Status Update successfully');
      console.log('Updated successfully:', response.data);
    }).catch((error) => {
      // Handle the error if there's an issue with the request
      toast.error('Error updating user details:');
      console.error('Error updating user details:', error);
    });
  };


  return (
    <div className="applicand-profile">
      <Container>
        <Row>
          <Col md={8} className="mx-auto">
            <Card className="profile-card">
              <div className="text-center mt-4">
                <Image src={userData.image_url?.image_url}  alt="Profile"fluid style={{ width: '200px', height: '200px' }}  />
              </div>
              <Card.Body>
                <Card.Title className="text-center">{userData.user?.username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">{userData.user?.email}</Card.Subtitle>
                <div className="profile-data">
                  <strong>Phone Number:</strong> {userData.user?.phonenumber}
                </div>
                <div className="profile-data">
                  <strong>Current Position:</strong> {userData.userdetails?.current_position}
                </div>
                <div className="profile-data">
                  <strong>Worked Company:</strong> {userData.userdetails?.worked_company}
                </div>
                <div className="profile-data">
                  <strong>Experience:</strong> {userData.userdetails?.experience}
                </div>
                <div className="profile-data">
                  <strong>Education:</strong> {userData.userdetails?.education}
                </div>
                <div className="profile-data">
                  <strong>Skills:</strong> {userData.userdetails?.skills}
                </div>
                <div className="profile-data">
                  <strong>Location:</strong> {userData.userdetail?.location}
                </div>
                <div className="profile-data">
                  <strong>Position:</strong> {userData.userdetails?.position}
                </div>
                <div className="profile-data">
                  <strong>Expected Salary:</strong> {userData.userdetails?.Expected_salary}
                </div>
                <div className="text-center mt-4">
                  <Form>
                    <Form.Group controlId="optionalField">
                      <Form.Label>Edit The Status</Form.Label>
                      <Form.Control as="select" onChange={handleOptionalFieldChange}>
                        <option value="">Select an option</option>
                        <option value="reject">Reject</option>
                        <option value="interview">Interview</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="selected">Selected</option>
                      </Form.Control>
                    </Form.Group>
                    
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ApplicandProfile;
