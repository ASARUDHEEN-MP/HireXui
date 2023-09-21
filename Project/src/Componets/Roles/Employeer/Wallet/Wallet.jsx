import { Table, Container, Row, Col } from 'react-bootstrap';
import './Wallet.css'; 
import instance from '../../../../axios';
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
function Wallet() {
  const [count,setcount]=useState([])
  const [loading, setLoading] = useState(true); 
  const [paymentHistory, setPaymentHistory] = useState([]);

  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid=userinfoo.userInfo.id;
  const companyname=userinfoo.userInfo.username

  useEffect(() => {
    instance
      .get(`recruiter/wallet-view/${userid}/`)
      
      .then((response) => {
       setcount(response.data.walletdetails.post_count)
      
       
       setLoading(false);
        
      })  
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
      instance
      .get(`recruiter/payment-details/${userid}/`) // Replace with your actual API endpoint
      .then((response) => {
        
        setPaymentHistory(response.data.payment_details);
      })
      .catch((error) => {
        console.error('Error fetching payment history:', error);
      });
  }, []);
  const pageSize = 5;
  const totalPages = Math.ceil(paymentHistory.length / pageSize);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, paymentHistory.length);
  const visiblePaymentHistory = paymentHistory.slice(startIndex, endIndex);






    const PostsCount = ''; // Fake wallet amount
 
    return (
        <Container className='wallet-container'>
         <Row>
  <Col md={13} className='amount-container'>
    <div className='small-box'>
      <h2 className='amount-label'>Wallet count:</h2>
      <h2 className='amount-value'>{count}</h2>
    </div>
  </Col>
</Row>
    
          <Row className='mt-4'>
            <Col>
              <h4 className='history-label'>Payment History:</h4>
              <Table striped bordered hover className='post-history-table'>
                <thead>
                  <tr>
                  <th>Payment ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {visiblePaymentHistory.reverse().map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.payment_id}</td>
                    <td>{new Date(payment.createdat).toLocaleDateString()}</td>
                    <td>{payment.amount}</td>
                    <td>
                      {payment.status === 'pending' ? (
                        <span className='status-pending'>{payment.status}</span>
                      ) : payment.status === 'failed' ? (
                        <span className='status-failed'>{payment.status}</span>
                      ) : (
                        <span className='status-success'>{payment.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              </Table>
              <Pagination className='pagination'>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
            </Col>
          </Row>
        </Container>
      );
    };

export default Wallet
