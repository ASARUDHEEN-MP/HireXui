import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './CompanyDetails.css'; // Create this CSS file in the same directory
import { Card, Row, Col, Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import instance from '../../../../axios';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AboutCompany() {
  const location = useLocation();
  const { state } = location;
  const companyId = state ? state.Companyid : null;
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  console.log(isFollowing.is_following)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`Companydetails-view/${companyId}/`);
        setdata(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function checkIsFollowing() {
      try {
        const response = await instance.get(`is_following/${companyId}/`);
        setIsFollowing(response.data.is_following);
      } catch (error) {
        console.error('Error checking if following:', error);
      }
    }

    checkIsFollowing();
  }, [companyId]);

  const handleChatClick = (data) => {
    const username=data.custom_user?.username
    const imageurl=data.imageurl
    navigate('/user/chat-page',{ state: { Companyid: companyId,username:username ,imageurl:imageurl}});
    
  };
  const handleFollowClick = async () => {
    try {
      if (isFollowing) {
        // Send a DELETE request to unfollow the company
        await instance.delete(`unfollow/${companyId}/`);
        setIsFollowing(false);
      } else {
        // Send a POST request to follow the company
        await instance.post(`follow/${companyId}/`);
        setIsFollowing(true);
      }
    } catch (error) {
      // Handle error
      console.error('Error following/unfollowing company:', error);
    }
  };

  return (
    <div className="container my-6">
      <div className="text-center"> {/* Center the container */}
        <Row className="justify-content-center">
          <Col lg={8} className="mx-3"> {/* Add mx-3 for equal spacing on left and right */}
            <Card className='box'>
              <Card.Body className='box11'>
                <div className="text-center">
                  <div className="company-logossssss">
                    <img
                      src={data.imageurl}
                      alt="Company Logo"
                      className="company-logoxxxx img-fluid"
                      style={{ width: '100px' }} // Adjust the width here as needed
                    />
                  </div>
                  <h1 className="company-namelllmsd text-primary">
                    {data.custom_user?.username}
                  </h1>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h2>About Us</h2>
                    <p>{data.recruiter_details?.about_us}</p>
                  </div>
                  <div className="col-md-6">
                    <h2>Contact Information</h2>
                    <address>
                      <p>{data.recruiter_details?.district}</p>
                      <p>
                        {data.recruiter_details?.state}, {data.recruiter_details?.country}
                      </p>
                      <p>Email: {data.custom_user?.email}</p>
                      <p>Phone: (+91) {data.custom_user?.phonenumber}</p>
                    </address>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                <button
                      className="btn btn-primary"
                      onClick={handleFollowClick}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                  <Button variant="success"   onClick={() => handleChatClick(data)}>
                    <FontAwesomeIcon icon={faComment} /> Chat
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AboutCompany;
