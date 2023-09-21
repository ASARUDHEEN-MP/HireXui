import React, { useState, useEffect } from 'react';
import './Userlist.css';
import { FiSearch } from 'react-icons/fi';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import instance from '../../../../axios';
import Modal from 'react-bootstrap/Modal';

function Userlist() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');

  const handleClose = () => setShow(false);
  const showdlt = (userId,username) => {
    setUserId(userId);
    setUserName(username);
    setShow(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUserList = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleBlock = (userId, isBlocked) => {
    instance
      .patch(`admin/user-manage/${userId}/`, { is_blocked: isBlocked })
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, is_active: !isBlocked } : user
          )
        );
      })
      .catch((error) => {
        console.error('Error toggling block:', error);
      });
  };

  useEffect(() => {
    instance
      .get('admin/user-manage/')
      .then((response) => {
        const userData = response.data;
        setUsers(userData);
      })  
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  
  const deleteUser = async () => {
    try {
      handleClose();
      instance.delete(`admin/user-manage/${userId}/`);
      // Update the users list after deleting the user
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-search">
        <input
          type="text"
          placeholder="Search by username"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <FiSearch className="search-icon" />
      </div>
      <Table striped bordered hover variant="light" className="user-list-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Status</th>
            <th>Block and Unblock</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserList
            .sort((a, b) => a.id - b.id)
            .map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.is_active ? 'Active' : 'Not Active'}</td>
                <td>
                  <Button
                    variant={user.is_active ? 'outline-dark bg-danger' : 'outline-dark bg-success'}
                    onClick={() => toggleBlock(user.id, user.is_active)}
                  >
                    {user.is_active ? 'Block' : 'Unblock'}
                  </Button>
                </td>
                <td>
                  <Button variant="outline-danger" onClick={() => showdlt(user.id,user.username)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE User -- {userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete <span> {userName}</span> Permanently
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Userlist;
