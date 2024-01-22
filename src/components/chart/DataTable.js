import React, { useEffect, useState } from 'react'
import '../../App.css';
import UnitDataService from "../../services/unit.services"
import UnitDataServ from "../../services/unit.service"
import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppRoutes from '../../services/AppRoutes';


function Home({ getUnitId }) {
  const [units, setUnits] = useState([]);
  useEffect(() => {
    // getUnits();
  }, [])
  const getUnits = async () => {
    const data = await UnitDataService.getAllUnit();
    setUnits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };
  const [filterUnits, setFilterUnits] = useState([]);
  useEffect(() => {
    // getFilterUnits();
  }, [])

  const getFilterUnits = async () => {
    const dataFilter = await UnitDataServ.getAllUnit();
    setFilterUnits(dataFilter.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };
  const [unitNo, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const deleteHandler = async (id) => {
    await UnitDataService.deleteUnit(id);
    // getUnits();
  };

  const history = useHistory();
  return (
    <>
      <Link className='back-btn override' to={AppRoutes.home}><ArrowBackIcon /> Back to Dashboard </Link>
      <div className='table-wrap'>
        <h3 className='main-third'>Appliances List</h3>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Unit No</th>
              <th>Appliance Type</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {units.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.setCurrentDate}</td>
                  <td>{doc.unitNo}</td>
                  <td>{doc.appliance}</td>
                  <td>{doc.setupdateDate ? doc.setupdateDate : '-'}</td>
                  <td>
                    <Button
                      variant=''
                      className='edit'
                      onClick={(e) => {
                        getUnitId(doc.id)
                        history.push('/update', { state: doc.id })
                      }
                      }
                    >
                      Edit
                    </Button>
                    /
                    <Button
                      variant=''
                      className='delete'
                      onClick={(e) => deleteHandler(doc.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </Table>
        <div className='text-center'>
          <a href="/list" className='text-dark view-all'>View All</a>
        </div>
      </div>
    </>
  );
}

export default Home