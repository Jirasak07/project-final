import { Select, FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import {
  MDBBtn,
  MDBCol,
  MDBFile,
  MDBInput,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";


function Check_form(prop) {
  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear() + 543;

  const [inputs, setInputs] = useState({});
  const [selectagen, setSelectAgen] = useState([]);
  const [pstatus, setPstatus] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  useEffect(() => {
    axios
    .post("http://localhost:3333/show-check", {
      check_id: prop.cid,
      pid: prop.id,
    })
    .then((res) => {
      console.log(res.data)
      if (day <= 30 && month <= 9) {
        console.log(year - 1);
        setInputs({
          sub_aid: res.data[0].sub_aid,
          pstatus_id: res.data[0].pstatus_id,
          fisicalyear: year - 1,
        });
      } else if (day >= 1 && month >= 10) {
        setInputs({
          sub_aid: res.data[0].sub_aid,
          pstatus_id: res.data[0].pstatus_id,
          fisicalyear: year,
        });
      }
    });
    axios.get("http://localhost:3333/subagen").then((res) => {
      setSelectAgen(res.data);
      console.log(res.data)
    });
    axios.get("http://localhost:3333/show-pstatus").then((res) => {
      setPstatus(res.data);
    });
  },[prop.id]);
  return (
    <div>
      <MDBModalHeader>
        <MDBModalTitle className="fs-6">
          ตรวจสอบครุภัณฑ์หมายเลข: {prop.id} : {prop.cid}{" "}
        </MDBModalTitle>
        <MDBBtn
          className="btn-close"
          color="none"
          onClick={prop.close}
        ></MDBBtn>
      </MDBModalHeader>
      <form>
      <TextField
            className="mb-3"
            name="fisicalyear"
            id="outlined-basic"
            label="ปีงบประมาณ"
            variant="outlined"
            fullWidth
            value={inputs.fisicalyear || ""}
            onChange={handleChange}
          />
        <FormControl fullWidth>
          <InputLabel>สถานะครุภัณฑ์</InputLabel>
          <Select
            label="สถานะครุภัณฑ์"
            name="pstatus_id"
            id="demo-simple-select-filled"
            value={inputs.pstatus_id || ""}
            onChange={handleChange}
          >
            {pstatus.map((item, index) => (
              <MenuItem key={index} value={item.pstatus_id}>
                {item.pstatus_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth className="mt-3 mb-3" >
          <InputLabel>หน่วยงานที่ติดตั้ง</InputLabel>
          <Select
            label="หน่วยงานที่ติดตั้ง"
            name="sub_aid"
            id="demo-simple-select-filled"
            value={inputs.sub_aid || ""}
            onChange={handleChange}
          >
            {selectagen.map((item, index) => (
              <MenuItem key={index} value={item.sub_aid}>
                {item.sub_aname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <span>หลักฐานอ้างอิง</span>
        <MDBFile className="" />
      </form>
      <MDBModalFooter>
        <MDBBtn color="success">บันทึกการตรวจสอบ</MDBBtn>
        <MDBBtn color="danger" onClick={prop.close}>
          ยกเลิก
        </MDBBtn>
      </MDBModalFooter>
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
   
</div>
    </div>
  );
}

export default Check_form;
