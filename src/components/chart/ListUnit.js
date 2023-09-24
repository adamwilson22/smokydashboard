import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Table from 'react-bootstrap/Table';
import { format, parseISO } from 'date-fns'; // Import format and parseISO functions
import '../../App.css';
import { AppImages } from '../../services/AppImages';

function Home({ finalArray = [], getUnitId }) {
  const history = useHistory();

  return (
    <>
      <Link className='back-btn' to="/home"><ArrowBackIcon /> Back to Home</Link>
      <div className='table-wrap'>
        <h3 className='main-third'>List of All Users</h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {finalArray.length !== 0 ? (
              finalArray.map((doc, index) => {
                // Parse and format the date of birth here
                const parsedDateOfBirth = parseISO(doc.dateOfBirth);
                const formattedDateOfBirth = !isNaN(parsedDateOfBirth.getTime()) // Check if it's a valid date
                  ? format(parsedDateOfBirth, 'dd-MM-yyyy')
                  : 'Invalid Date';

                return (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={doc.profilePicture != "" ? doc.profilePicture : AppImages.placeholder}
                        alt="Logo"
                        width={60}
                        height={60}
                        style={{ borderRadius: 8, objectFit: "cover", }}
                      />
                    </td>
                    <td>{doc.fullName}</td>
                    <td>{doc.userEmail}</td>
                    <td>{doc.gender}</td>
                    <td>{doc.phone}</td>
                    <td>{formattedDateOfBirth}</td> {/* Display the formatted date */}
                    <td>{doc.country}</td>
                    <td>{doc.state}</td>
                    <td>{doc.city}</td>
                    {/* <td>
                      <Button
                        variant=''
                        className='edit'
                        onClick={(e) => {
                          // getUnitId(doc.id)
                          history.push('/view-user', { selectedUser: doc });
                        }}
                      >
                        View
                      </Button>
                    </td> */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} >
                  <p>No record found</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Home;
