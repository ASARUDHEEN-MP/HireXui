import React, { useEffect, useState } from 'react';
import { Container, Row, Table, Pagination,Button } from 'react-bootstrap';
import './Paymenthistory.css'; // Import your custom CSS file for styling
import instance from '../../../../axios';
import * as XLSX from 'xlsx';

function Paymenthistory() {
  
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentHistory, setPaymentHistory] = useState([]);
  console.log(paymentHistory)
  useEffect(() => {
    instance.get('/admin/paymenthistory/').then((response) => {
      setPaymentHistory(response.data);
    });
  }, []);

  // Calculate total income amount
  const totalIncome = paymentHistory.reduce((total, payment) => total + parseFloat(payment.amount), 0);

  // Calculate the start and end index of the current page's data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the payment history data based on the current page
  const currentPayments = paymentHistory.slice(startIndex, endIndex).reverse();

  // Calculate the total number of pages
  const totalPages = Math.ceil(paymentHistory.length / pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const exportToExcel = () => {
    const data = currentPayments.map((payment) => ({
      'Payment ID': payment.payment_id,
      'Plan ID': payment.plan_id,
      'User ID': payment.user_id,
      Amount: parseFloat(payment.amount).toFixed(2),
      Status: payment.status,
      'Created At': new Date(payment.createdat).toLocaleDateString(),
    }))
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payment History');

    // Save the Excel file and trigger the download
    XLSX.writeFile(wb, 'payment_history.xlsx');
  }
  

  return (
    <Container fluid className="payment-history-container">
      <h1 className="page-title">Payment History</h1>
      <div className="total-income-box">
        <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
      </div>
      <Table striped bordered hover className="payment-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Plan ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {currentPayments.map((payment) => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>{payment.plan_id}</td>
              <td>{payment.user_id}</td>
              <td>{parseFloat(payment.amount).toFixed(2)}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.createdat).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="pagination">
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
      <Button variant="success" onClick={exportToExcel}>
        Export to Excel
      </Button>
    </Container>
  );
}

export default Paymenthistory;
