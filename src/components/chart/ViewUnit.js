import React, { useEffect, useState } from 'react'
import { showErrorToast, showSuccessToast } from '../../services/AppConstant';
import { useLocation } from 'react-router-dom';
import { AppLogger } from '../../services/AppLogger';
import { AppImages } from '../../services/AppImages';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AppRoutes from '../../services/AppRoutes';
import UnitDataService from "../../services/unit.services"
import Table from 'react-bootstrap/Table';
import CustomModal from '../CustomModal';
import '../../App.css';

function Home({ }) {
  const history = useHistory()
  const { state } = useLocation();
  const [user, setUser] = useState(null);
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    setUser(state.selectedUser)
  }, [])


  const handleBlockUnBlockUser = async () => {
    try {
      var body = { status: !user.status }
      await UnitDataService.updateUser(user.uid, body);
      setUser({ ...user, status: !user.status })
      setShowBlockModal(false)
      history.push(AppRoutes.listUsers);
      showSuccessToast(`User ${user.status ? "Blocked" : "UnBlocked"} Succesfully`)
    } catch (error) {
      AppLogger("error blocking user ", error)
      showErrorToast(error)
    }
  }

  const handleRemoveUser = async () => {
    try {
      await UnitDataService.deleteUser(user.uid);
      setShowDeleteModal(false)
    } catch (error) {
      AppLogger("error deleting user ", error)
      showErrorToast(error)
    }
  }

  return (
    <>
      <div className='table-wrap'>
        <h3 className='main-third'>User Details:  {state.state}</h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Profile Photo</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Country</th>
              <th>City</th>
              <th>Date of Birth</th>
              {/* 
                <th>Is Verified</th>
                <th>Is Reported</th>
             */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user != null &&
              // units.map((doc, index) => {
              // return (
              <tr key={user.uid}>
                <td>
                  <img
                    src={user.profilePicture ?? AppImages.placeholder}
                    alt="Logo"
                    width={60}
                    height={60}
                    style={{ borderRadius: 60, objectFit: "cover" }}
                  />
                </td>
                <td>{user.fullName}</td>
                <td>{user.gender}</td>
                <td>{user.userEmail}</td>
                <td>{user.phone}</td>
                <td>{user.country}</td>
                <td>{user.city}</td>
                <td>{user.dateOfBirth}</td>
                {/*
                  <td>{user.isReported}</td>
                  <td>{user.isVerified}</td>
                */}
                {/* <td>{doc.setupdateDate ? doc.setupdateDate : '-'}</td> */}
                <td>
                  <Button
                    variant=''
                    className='edit'
                    onClick={(e) => {
                      // history.push('/update', { userId: user.uid })
                      setShowBlockModal(true)
                    }}
                  >
                    {`${user.status ? "Block" : "UnBlock"}`}
                  </Button>
                  {/* <Button
                    variant=''
                    className='edit'
                    onClick={(e) => {
                      // history.push('/update', { userId: user.uid })
                      setShowDeleteModal(true)
                    }}
                  >
                    Remove
                  </Button> */}
                </td>
              </tr>
              // )
              // })
            }
          </tbody>
        </Table>
        {/* <div className='text-center'>
          <a href="#" className='text-dark'>View All</a>
        </div> */}
        {user != null &&
          <>
            <CustomModal
              show={showBlockModal}
              setShow={(val) => setShowBlockModal(val)}
              title={`${user.status ? "Block" : "UnBlock"} User`}
              desc={`Are you sure you want to ${user.status ? "Block" : "UnBlock"} ${user.fullName}?`}
              btnText={`Yes`}
              onClickDone={() => handleBlockUnBlockUser()}
            />

            <CustomModal
              show={showDeleteModal}
              setShow={(val) => setShowDeleteModal(val)}
              title={`Remove User`}
              desc={`Are you sure you want to remove ${user.fullName}?`}
              btnText={`Yes`}
              onClickDone={() => handleRemoveUser()}
            />
          </>
        }
      </div>

    </>
  );
}

export default Home