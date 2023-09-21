import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Postcrreation.css';
import instance from '../../../../axios';
import { useNavigate } from 'react-router-dom';

function Postcreation() {
  const [posts, setPost] = useState([]); // Use the useState hook
  
  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid = userinfoo.userInfo.id;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/recruiter/jobpost-view/${userid}/`);
        setPost(response.data); // Set the array of posts in the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const view=(id)=>{
    
    navigate('/employeer/Postdetails', { state: { postId: id }} );
  }

  return (
    <div className="post-listing">
      <div className="header">
        <h2>Job Posts</h2>
        <a href='Createpost'>
          <button type="button" className="addbuttons ml-5">
            <span className="button__text">Add Post</span>
            <span className="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                className="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </a>
      </div>
      <div className="posts">
        {posts.reverse().map((post) => (
          <Card key={post.id} className="post-card">
            <Card.Body>
              <Card.Text>{post.id}</Card.Text>
              <Card.Title>{post.skills}</Card.Title>
              <div className="d-flex justify-content-end mt-3">
                
              <button className="custom-btn btn-2"onClick={() => view(post.id)}>Read More</button>
                   
                
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Postcreation;
