import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBModalFooter, MDBBtn } from "mdb-react-ui-kit";
import "./Agency.css";
import axios from "axios";
function Add_mainagency(props) {
  const [inputs, setInputs] = useState({});
  const [maxid, setMaxid] = useState(0);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    axios.get("http://localhost:3333/maxid-main-agen").then((res) => {
      console.log(res.data[0].maxid);
      setMaxid(res.data[0].maxid + 1);
    });
  };
  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    axios
      .post("http://localhost:3333/add-main-agency", {
        main_aid: maxid,
        main_aname: inputs.main_aname,
      })
      .then((res) => {});
  };
  return (
    <>
      <MDBContainer className="input">
        <form onSubmit={handleSubmit}>
          <div>
            <MDBRow>
              <MDBCol md="12" lg="12">
                <TextField
                  name="main_aname"
                  id="outlined-basic"
                  label="หน่วยงานหลัก"
                  variant="outlined"
                  fullWidth
                  value={inputs.main_aname || ""}
                  onChange={handleChange}
                />
              </MDBCol>
            </MDBRow>
          </div>
          <br/> 
          </form>
          <MDBModalFooter>
          <MDBBtn className="btn btn-success" type="submit" >บันทึก</MDBBtn>
          <MDBBtn className="btn btn-danger" onClick={props.onClick} >ยกเลิก</MDBBtn>
        </MDBModalFooter>
       
        
      </MDBContainer>
    </>
  );
}

export default Add_mainagency;
