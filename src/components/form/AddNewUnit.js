import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { async } from '@firebase/util';
import UnitDataService from "../../services/unit.services"
import unitService from '../../services/unit.service';
import Modal from 'react-bootstrap/Modal';

function AddUnitFrom({ id, setUnitId }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newUnit, setNewUnit] = useState("");

  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleUnitSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    if (newUnit === "") {
        setMessage({ error: true, msg: "Please Insert Unit No" });
        return;
      }
      const addNewUnit = {
        newUnit,
    }
    try {
      await unitService.addUnit(addNewUnit);
      setMessage({ error: false, msg: "New Unit added successfully!" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
    setNewUnit("");

  };
  return (
    <>
      {message?.msg && (
        <Alert
          variant={message?.error ? 'danger' : 'success'}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}
      <div className='create-new-form'>
          <Form onSubmit={handleUnitSubmit} >
              <Row>
                <Col> 
      
                  <Form.Group className="mb-3" controlId="formBasicModel">
                    <Form.Control fullWidth label="Unit No" placeholder='Unit No' id="unit-no" value={newUnit} onChange={(e) => setNewUnit(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='btn-align'>
                  <Button variant="primary" type="submit">
                    Save & Continue
                  </Button>
                </Col>
              </Row>
            </Form>

 
      </div>

    </>
  );
}

export default AddUnitFrom