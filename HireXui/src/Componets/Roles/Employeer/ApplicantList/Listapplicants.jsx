import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap';
import instance from '../../../../axios';
import { useNavigate } from 'react-router-dom';
function Listapplicants() {
  // Replace this with your own list of applicants and followers
 
 
 
  const handlefollowersClick = (folowerid) => {
    console.log(`Row with applicant ID ${folowerid} clicked`);
  };

  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid = userinfoo.userInfo.id;
  const [loading, setLoading] = useState(true); // Track loading state
  const [applicant, setapplicant] = useState([]);
  const [followerss,setFollowerss ] = useState([]);
  const navigate = useNavigate();
  
 console.log(followerss)


   const handleRowClick = (postId) => {
    console.log(postId)
    navigate('/employeer/Postdetails', { state: { postId: postId }} );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/recruiter/employeer-home/${userid}/`);
        setapplicant(response.data.applicants
            );
        setFollowerss(response.data.followers)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userid]);



  

  return (
    <Container>
      <Row>
        <Col>
          <Card className="my-4">
            <Card.Header className="text-center bg-primary text-white">
              <h3>Applicants</h3>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <Table bordered hover>
                   <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Post</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                  <tbody>
                  {applicant.reverse().map((applicants, index) => (
                        <tr key={applicants.id} onClick={() => handleRowClick(applicants.postid)}>
                          <td>{index + 1}</td>
                          <td>{applicants.username}</td>
                          <td>{applicants.post_id}</td>
                          <td>{applicants.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="my-4">
            <Card.Header className="text-center bg-primary text-white">
              <h3>Followers</h3>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {followerss.map((follower,index) => (
                      <tr key={follower.id} onClick={() => handlefollowersClick(follower.userid)}>
                         <td>{index + 1}</td>
                        <td>{follower.username}</td>
                      
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Listapplicants;