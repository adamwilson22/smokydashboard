import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Col, Row } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { async } from '@firebase/util';
import UnitDataService from "../../services/unit.services"
import unitService from '../../services/unit.service';
import colorService from '../../services/color.service'
import Moment from 'moment';
import Modal from 'react-bootstrap/Modal';

function UnitCreateForm({ id, setUnitId }) {

  const setCurrentDate = Moment().format('DD-MM-YYYY')
  const [modelNo, setModelNo] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [poNo, setPoNo] = useState("");
  const [unitNo, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [colorUnit, setUnitColor] = React.useState('');
  const colorChange = (event) => {
    setUnitColor(event.target.value);
  };
  const [appliance, setApplianceType] = React.useState('');
  const applianceChange = (event) => {
    setApplianceType(event.target.value);
  };

  const [imgsrc, setimgSrc] = React.useState('');

  const handleInputFileChange = (event) => {

    //setimage(event)
    var file = event

    var reader = new FileReader();
    // console.log(file);

    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setimgSrc(reader.result)
    };
  }
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (modelNo === "") {
      setMessage({ error: true, msg: "All Fields are mandatory" });
      return;
    }
    const newUnit = {
      modelNo,
      poNo,
      serialNo,
      unitNo,
      colorUnit,
      appliance,
      imgsrc,
      setCurrentDate,
    }
    try {
      await UnitDataService.addUnits(newUnit);
      setMessage({ error: false, msg: "New Unit added successfully!" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
    setModelNo("");
    setPoNo("")
    setSerialNo("")
    setApplianceType("")
    setUnitColor("")
    setAge("")
    setimgSrc("")
    imgsrc("")

  };

  const [units, setUnits] = useState([]);
  useEffect(() => {
    getUnits();
  }, [])
  const getUnits = async () => {
    const data = await unitService.getAllUnit();
    setUnits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow(false);
  const handleShow2 = () => setShow(true);
  const [newUnit, setNewUnit] = useState("");
  const handleUnitSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newUnit === "") {
      setMessage({ error: true, msg: "All Fields are mandatory" });
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
    getUnits();

  };

  const [newColor, setNewColor] = useState("");
  const handleColorSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newColor === "") {
      setMessage({ error: true, msg: "Please Insert Color" });
      return;
    }
    const addNewColor = {
      newColor,
    }
    try {
      await colorService.addColor(addNewColor);
      setMessage({ error: false, msg: "New Color added successfully!" });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
    setNewColor("");
    getColor();

  };
  const [colors, setColors] = useState([]);
  useEffect(() => {
    getColor();
  }, [])
  const getColor = async () => {
    const data = await colorService.getAllColor();
    setColors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Unit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message?.msg && (
              <Alert
                variant={message?.error ? 'danger' : 'success'}
                dismissible
                onClose={() => setMessage("")}
              >
                {message?.msg}
              </Alert>
            )}
            <Form onSubmit={handleUnitSubmit} >
              <Row>
                <Col>
                  <Form.Group className="mb-lg-3 mb-2" controlId="formBasicModel">
                    <Form.Control type='text' placeholder='Unit No' fullWidth label="Unit No" id="unit-no" value={newUnit} onChange={(e) => setNewUnit(e.target.value)} />
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
          </Modal.Body>
        </Modal>
        <Modal show={show} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Color</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message?.msg && (
              <Alert
                variant={message?.error ? 'danger' : 'success'}
                dismissible
                onClose={() => setMessage("")}
              >
                {message?.msg}
              </Alert>
            )}
            <Form onSubmit={handleColorSubmit} >
              <Row>
                <Col>
                  <Form.Group className="mb-lg-3 mb-2" controlId="formBasicModel">
                    <Form.Control type='text' placeholder='Color' fullWidth label="Color" id="Color" value={newColor} onChange={(e) => setNewColor(e.target.value)} />
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
          </Modal.Body>
        </Modal>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-lg-3 mb-2" controlId="formBasicUnit">
                <FormControl fullWidth>
                  <InputGroup className="">
                    {/* <InputLabel id="unitNoLabel">Unit No.</InputLabel> */}
                    <Form.Select
                      labelId="unitNoLabel"
                      id="unitNoSelect"
                      value={unitNo}
                      label="Age"
                      onChange={handleChange}
                    >
                      {units.map((doc, index) => {
                        return (
                          <option value={doc.newUnit}>{doc.newUnit}</option>
                        )
                      })
                      }
                    </Form.Select>
                    <Button onClick={handleShow}> + </Button>
                  </InputGroup>
                </FormControl>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-lg-4 mb-2" controlId="formBasicColor">
                <FormControl fullWidth>
                  <InputGroup className="">
                    {/* <InputLabel id="colorLabel">Color</InputLabel> */}
                    <Form.Select
                      labelId="colorLabel"
                      id="colorSelect"
                      value={colorUnit}
                      label="Color"
                      onChange={colorChange}
                    >{colors.map((doc, index) => {
                      return (
                        <option value={doc.newColor}>{doc.newColor}</option>
                      )
                    })
                      }

                    </Form.Select>
                    <Button onClick={handleShow2}> + </Button>
                  </InputGroup>
                </FormControl>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-lg-4 mb-2" controlId="formBasictype">
                <FormControl fullWidth>
                  {/* <InputLabel id="applianceType">Appliance Type</InputLabel> */}
                  <Form.Select
                    labelId="applianceType"
                    id="applianceTypeSelect"
                    value={appliance}
                    label="Appliance Type"
                    onChange={applianceChange}
                  >
                    <option value={'Refrigerator'}>Refrigerator</option>
                    <option value={'Stove'}>Stove</option>
                    <option value={'Dishwasher'}>Dishwasher</option>
                    <option value={'Rangehood'}>Rangehood</option>
                    <option value={'Microwave'}>Microwave</option>
                    <option value={'GarbageDisposal'}>Garbage Disposal</option>
                    <option value={'Washer'}>Washer</option>
                    <option value={'Dryer'}>Dryer</option>
                    <option value={'WaterHeater'}>Water Heater</option>
                    <option value={'Condenser'}>Condenser</option>
                    <option value={'AirHandler'}>Air Handler</option>
                  </Form.Select>
                </FormControl>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-lg-4 mb-2" controlId="formBasicModel">
                <Form.Control type="number" placeholder='Model No.' fullWidth label="Model No." id="model-no" value={modelNo} onChange={(e) => setModelNo(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-lg-4 mb-2" controlId="formBasicSerial">
                <Form.Control type="number" placeholder='Serial No.' fullWidth label="Serial No." id="serial-no" value={serialNo} onChange={(e) => setSerialNo(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-lg-4 mb-2" controlId="formBasicpo">
                <Form.Control type="number" placeholder='PO No.' fullWidth label="PO No." id="po-no" value={poNo} onChange={(e) => setPoNo(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <h4 className='text-left mt-4'>Add Images</h4>
            <Col md="6">
              <div className='image-field mt-2'>
                <img src={imgsrc ? imgsrc : ''} className="upload_photo_main" />
              </div>
            </Col>
            <Col md="6">
              <Form.Group className="image-file mt-2" controlId="formBasicimage">
                <input type="file" onChange={(e) => { handleInputFileChange(e.target.files[0]) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='btn-align mt-3'>
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

export default UnitCreateForm