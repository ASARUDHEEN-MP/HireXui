import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Container ,Spinner} from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PostPlans.css'; // Import your custom CSS file for styling
import instance from '../../../../axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Pagination } from 'react-bootstrap';

const PostPlan = () => {
  const [plans,setplans]=useState([])
  const [loading, setLoading] = useState(true); 
  const [paymentHistory, setPaymentHistory] = useState([]);
// userdetails
const userInfoString = localStorage.getItem('userInfo');
const userinfoo = JSON.parse(userInfoString);
const userid=userinfoo.userInfo.id;
const companyname=userinfoo.userInfo.username





  useEffect(() => {
    instance
      .get(`recruiter/plan-view/`)
      .then((response) => {
       setplans(response.data)
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


  useEffect(() => {
    // Initialize Razorpay script here
    const razorpayScript = document.createElement('script');
    razorpayScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
    razorpayScript.async = true;
    document.body.appendChild(razorpayScript);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(razorpayScript);
    };
  }, []);

const openRazorpay = (planid, amount,postcount) => {
    console.log(postcount)
    const options = {
      key: 'rzp_test_JbRbUhC0uhCUNe',
      amount: amount * 100,
      currency: 'INR',
      name: companyname,
      description: 'Subscription Payment',
    
      handler: function (response) {
        // Handle payment success
        console.log('Payment success:', response);
        handlePaymentSuccess(response, planid, amount,postcount); // Pass planid and amount
      },

      prefill: {
        email: 'user@example.com',
        contact: '1234567890',
        },
    }  
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    
  };


  const handlePaymentSuccess = (response, planid, amount,postcount) => {
    console.log(postcount,'yha mahdsjddfdf saa koaser')
    // Make an API call to your backend to save payment details
    const paymentData = {
      payment_id: response.razorpay_payment_id,
      order_id: response.razorpay_order_id,
      signature: response.razorpay_signature,
      user_id: userid,
      plan_id: planid,
      amount: amount,
      status: 'completed',
      postcount: postcount, // Pass the postcount value
    };
    console.log(paymentData,'nian aar pottana')
    // Make a POST request to your backend API to save payment details
     instance
      .post('admin/planpayment/', paymentData)
      
      .then((response) => {
        console.log('Payment status updated on the backend:', response.data);
        toast.success('Payment Successfull You can Check you wallet');
      })
      .catch((error) => {
        console.error('Error updating payment status:', error);
      });
  };

  const pageSize = 5;
  const totalPages = Math.ceil(paymentHistory.length / pageSize);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, paymentHistory.length);
  const visiblePaymentHistory = paymentHistory.slice(startIndex, endIndex);








 


  const sliderSettings = {
    dots: true,
    infinite: false, // Set to false to avoid repeating
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable auto movement
    autoplaySpeed: 3000, // Set auto movement speed (in milliseconds)
  };

  return (
    <Container className='container'>
      <ToastContainer />
<div className='title-container'>
        <span className='plans-title floating-text'>Recharge Plans</span>
        
      </div>
      {loading ? ( // Conditionally render loading indicator
         <div className='loading-spinner-container'>
         <Spinner animation='border' variant='primary' className='loading-spinner' />
       </div>
      ) : (  
      <>
      <Slider {...sliderSettings}>
      {plans.map((plan) => (
        <div key={plan.planid} className='plan-card'>
          <Card>
            <Card.Body>
              <Card.Title>{plan.postdescription}</Card.Title>
              <Card.Text>Price: {plan.postprice}</Card.Text>
              <Card.Text>Count: {plan.postcount}</Card.Text>
              <Button variant='primary' onClick={() => openRazorpay(plan.planid, plan.postprice,plan.postcount)}>Pay</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Slider>
    <div className='tabless'>
            <span className='paymenthistory'>Payment History</span>
            <Table striped bordered hover className='table'>
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
</div>

</>
)}
<ToastContainer />
    </Container>
    
  );
};

export default PostPlan;
