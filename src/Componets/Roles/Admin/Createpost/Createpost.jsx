import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import instance from '../../../../axios';
import { useNavigate } from 'react-router-dom';

function Createpost() {
    const navigate = useNavigate();
    const [postDescription, setPostDescription] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postCount, setPostCount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (postDescription && postPrice && postCount) {
       
        const formData = new FormData();
        formData.append('postdescription', postDescription);
        formData.append('postprice', postPrice);
        formData.append('postcount', postCount);
  
        const response = await instance.post('admin/create-post/', formData);

        console.log(response.data); // Display response data in the console
  
        if (response.status === 201) { // Check for the correct status code
          navigate('/admin/postcreation');
        } else {
          console.error('Plan upload failed.');
        }
      } else {
        console.error('Please fill in all the fields.');
      }
    } catch (error) {
      console.error('Error uploading plan:', error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="postDescription">
      <Form.Label>Post Description</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter post description"
        value={postDescription}
        onChange={(e) => setPostDescription(e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="postPrice">
      <Form.Label>Post Price</Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter post price"
        value={postPrice}
        onChange={(e) => setPostPrice(e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="postCount">
      <Form.Label>Post Count</Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter post count"
        value={postCount}
        onChange={(e) => setPostCount(e.target.value)}
      />
    </Form.Group>

    <Button variant="primary" type="submit">
      Create Post
    </Button>
  </Form>
  )
}

export default Createpost
