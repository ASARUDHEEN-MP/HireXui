import React, { useEffect, useState } from 'react';
import './Joblist.css'; // Import the CSS file for styling
import Container from 'react-bootstrap/Container'; // Import Container component from React Bootstrap
import instance from '../../../../axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Joblist() {
  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userId = userinfoo.userInfo.id;
  
  const [originalJobData, setOriginalJobData] = useState([]); // State to store original job data
  const [jobData, setJobData] = useState([]);
  console.log(jobData)
  
  const navigate = useNavigate();
  const location = useLocation();
  const[leng,setlen]=useState('')
  const [searchResults, setSearchResults] = useState(location.state?.searchResults || []);
  console.log(searchResults)
  
  const viewMore = (jobpostid) => {
    // Implement your logic here
    navigate('/user/jobviewmore', { state: { postId: jobpostid }} );
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      setOriginalJobData(searchResults); // Set originalJobData if searchResults are available
    } else {
      instance.get(`/company-joblist/${userId}/`)
        .then(response => {
          setOriginalJobData(response.data); // Set originalJobData with fetched data
        })
        .catch(error => {
          console.error('Error fetching job data:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (searchResults.length > 0) {
      // If searchResults are available, set jobData to searchResults
      setJobData(searchResults);
    } else {
      // Otherwise, set jobData to originalJobData
      setJobData(originalJobData);
    }
  }, [searchResults, originalJobData]);

  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    setFilteredJobs(jobData); // Set filteredJobs when jobData changes
  }, [jobData]);

  const jobsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleFilter = (type) => {
    // Apply filter to originalJobData instead of jobData
    const filtered = originalJobData.reverse().filter(job => job.workmode === type);
    setFilteredJobs(filtered);
    setCurrentPage(1);
    if (searchResults.length > 0) {
      setSearchResults([]);
    }
  };

  const handleShowAll = () => {
    // Reset filteredJobs to originalJobData
    setFilteredJobs(originalJobData);
    setCurrentPage(1);
    if (searchResults.length > 0) {
      setSearchResults([]);
    }
  };

  const Related = () => {
    // Make an API request to fetch recommended job data
    instance.get(`/recommended-jobs/${userId}/`)
      .then(response => {
        console.log(response.data, 'bdfbjvjfsbnvj');
        setFilteredJobs(response.data); // Update filteredJobs with recommended data
      })
      .catch(error => {
        console.error('Error fetching recommended job data:', error);
      });
  };
  const handleIgnore = async (jobpostid, companyId) => {
    try {
      const response = await instance.post(
        `/ignore-job-post/${userId}/`,  // Pass companyId here
        {
          postid: jobpostid,
        }
      );
  
      if (response.status === 201) {
        // The job post was successfully ignored
        // You can update the UI to hide or mark the job post as ignored here
        console.log('Job post ignored successfully.');
  
        // After ignoring the job post, re-fetch the updated job data
        instance.get(`/company-joblist/${userId}/`)
          .then(response => {
            setOriginalJobData(response.data); // Set originalJobData with fetched data
            setJobData(response.data); // Update jobData with new data
          })
          .catch(error => {
            console.error('Error fetching job data:', error);
          });
      } else {
        // Handle the error if the request was not successful
        console.error('Error ignoring job post:', response.statusText);
      }
    } catch (error) {
      console.error('Error ignoring job post:', error);
    }
  };
  
  

  return (
    <div className="centered-paper mt-4">
      <h1 className="centered-header">Jobs</h1>
      <Container fluid> {/* Use the fluid prop for full-width container */}
        <div className="buttons-container">
          <button className="button" onClick={() => Related()}>Recommended</button>
          <button className="button" onClick={() => handleFilter("Full-Time")}>Full Time</button>
          <button className="button" onClick={() => handleFilter("Part-Time")}>Part Time</button>
          <button className="button" onClick={() => handleFilter("Remote")}>Remote</button>
          <button className="button" onClick={handleShowAll}>Show All</button>
        </div>
      </Container>
      <div className="job-list-container">
        {currentJobs.reverse().map(job => (
          <div className="job-item" key={job.id}>
            <img src={job.user_image} alt="Company Logo" className="company-image" />
            <div className="job-details">
              <h2 className="text-capitalize">{job.company_name}</h2>
              <p>{job.desgination}</p>
              <h6 className="text-muted">{job.skills}</h6>
              <p className="text-muted">Location: {job.location}</p>
            </div>
            <button>
              <p onClick={() => viewMore(job.id)}>View More</p>
              <svg
                strokeWidth="4"
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </button>
           
            {/* Add an "Ignore" button */}
            <button onClick={() => handleIgnore(job.id)} className="ignore-button">Ignore</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}/{totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Joblist;
