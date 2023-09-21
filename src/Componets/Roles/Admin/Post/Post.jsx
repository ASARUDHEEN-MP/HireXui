import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import './Post.css'
import Loaders from "../../../Loaders/Loaders";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import instance from "../../../../axios";

function Post() {


  
  const [posts, setPosts] = useState([]);
  const [postsid, setPostsid] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    instance.get('admin/postview/').then((response)=>{
      const postdetails=response.data;
      console.log(response.data)
      setPosts(postdetails)

    }) .catch((error) => {
      console.error('Error fetching post data:', error);
    });
   
  }, []);



  const handleClose = () => setShow(false);
  const showdlt = (planid) => {
    
    setPostsid(planid);
    setShow(true);
    
  };



    
      const [currentPage, setCurrentPage] = useState(1);
      const postsPerPage = 3;
    
      const handleEdit = (id) => {
        // Implement edit functionality here
        console.log(`Edit post with ID: ${id}`);
      };


      const handleDelete = async (id) => {
        try {
          handleClose();
          await instance.delete(`admin/postview/${postsid}/`);
          // Update the users list after deleting the user
          setPosts(posts.filter((post) => post.planid !== postsid));
         
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
          }
        }
      };
      const reversedPosts = [...posts].reverse(); // Reverse the posts array

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = reversedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
      const createNewPost = () => {
        // Implement create new post functionality here
        
      };
   
  return (

         <Container>
      <div className="d-flex justify-content-end mb-4">
        <Button variant="success" href="/admin/createpost/">
          Create New Post
        </Button>
      </div>
      <Row className="justify-content-center">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <Col key={post.planid} md={13} className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                  <span style={{ textDecoration: 'underline' }}>Description</span>

                    <Card.Title>{post.postdescription}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                  </div>
                  <div>
                    <div>
                      <strong>Price:</strong> {post.postprice}
                    </div>
                    <div>
                      <strong>Post Count:</strong> {post.postcount}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end ">
                      <Button variant="primary" className="buttons" onClick={() => handleEdit(post.planid)}>
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                       
                      <Button variant="danger"  onClick={() => showdlt(post.planid)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>

              </Card.Body>
            </Card>
          </Col>
          ))
        ) : (
          <Col md={12} className="text-center">
            <p>No posts available.</p>
          </Col>
        )}
      </Row>
     <div className=" custom-margin-top ">
      <div className="d-flex justify-content-center">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? 'primary' : 'light'}
            className="mx-1"
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE post -- {postsid}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete <span> {postsid}</span> Permanently
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>

    
        
     
  )
}

export default Post
