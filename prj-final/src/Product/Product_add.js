import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { MDBFile, MDBModalFooter } from "mdb-react-ui-kit";
import axios from "axios";

function Product_add(props) {
  const [inputs, setInputs] = useState({});
  const [selectagen, setSelectAgen] = useState([]);
  const [ptype, setPtype] = useState([]);
  const [pstatus, setPstatus] = useState([]);
  const [subagen, setSubAgen] = useState([]);
  const [num, setNum] = useState(1);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const onSubmit = () => {
    axios
      .post("http://localhost:3333/product-added", {
        pid: inputs.pid,
        pname: inputs.pname,
        pdetail: inputs.pdetail,
        qty: num,
        unit: inputs.unit,
        price: inputs.price,
        finance: inputs.finance,
        acquirement: inputs.acquirement,
        ptype_id: inputs.ptype_id,
        seller: inputs.seller,
        sub_aid: inputs.sub_aid,
        pstatus_id: inputs.pstatus_id,
        buydate: inputs.buydate,
        pickdate: inputs.pickdate,
        fisicalyear: inputs.fisicalyear,
      })
      .then((res) => {
        //not respons
      });
  };
  useEffect(() => {
    axios.get("http://localhost:3333/show-product-type").then((res) => {
      setPtype(res.data);
    });

    axios.get("http://localhost:3333/show-pstatus").then((res) => {
      setPstatus(res.data);
    });

    axios.get("http://localhost:3333/show-main-agen-select").then((res) => {
      setSelectAgen(res.data);
    });
  
  }, []);
  useEffect(()=>{
    axios
    .post("http://localhost:3333/show-sub-agen-where-main", {
      main_aid: inputs.main_aid,
    })
    .then((res) => {
      setSubAgen(res.data);
      console.log(res.data);
    });
  },[inputs.main_aid])
  return (
    <div>
      {" "}
      <MDBContainer fluid>
        <form onSubmit={onSubmit}>
          <MDBRow>
            <MDBCol className="mt-4" md="6" lg="5">
              <TextField
                name="pid"
                fullWidth
                label="หมายเลขครุภัณฑ์"
                variant="outlined"
                onChange={handleChange}
                value={inputs.pid || ""}
              />
            </MDBCol>
            <MDBCol className="mt-4" md="6" lg="5">
              <TextField
                name="pname"
                fullWidth
                label="ชื่อครุภัณฑ์"
                variant="outlined"
                onChange={handleChange}
                value={inputs.pname || ""}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="mt-4" md="4" lg="3">
              <TextField
                name="buydate"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                fullWidth
                label="วันเดือนปีที่ซื้อ"
                variant="outlined"
                onChange={handleChange}
                value={inputs.buydate || ""}
              />
            </MDBCol>
            <MDBCol className="mt-4" md="4" lg="3">
              <TextField
                name="pickdate"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                fullWidth
                label="วันเดือนปีที่รับ"
                variant="outlined"
                onChange={handleChange}
                value={inputs.pickdate || ""}
              />
            </MDBCol>
            <MDBCol className="mt-4" md="4" lg="4">
              <TextField
                name="fisicalyear"
                fullWidth
                label="ปีงบประมาณ"
                variant="outlined"
                onChange={handleChange}
                value={inputs.fisicalyear || ""}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="mt-4" md="4" lg="4">
              <FormControl fullWidth>
                <InputLabel>ประเภทครุภัณฑ์</InputLabel>
                <Select
                  label="ประเภทครุภัณฑ์"
                  name="ptype_id"
                  id="demo-simple-select-filled"
                  value={inputs.ptype_id || ""}
                  onChange={handleChange}
                >
                  {ptype.map((item, index) => (
                    <MenuItem key={index} value={item.ptype_id}>
                      {item.ptype_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBCol>
            <MDBCol className="mt-4" md="2" lg="2" sm="">
              <TextField
                name="qty"
                fullWidth
                type="number"
                label="จำนวน"
                variant="outlined"
                onChange={handleChange}
                value={num}
              />
            </MDBCol>
            <MDBCol className="mt-4" md="3" lg="2">
              <TextField
                name="unit"
                fullWidth
                label="หน่วยนับ"
                variant="outlined"
                onChange={handleChange}
                value={inputs.unit || ""}
              />
            </MDBCol>
            <MDBCol className="mt-4" md="3" lg="2">
              <TextField
                name="price"
                fullWidth
                label="ราคา"
                variant="outlined"
                onChange={handleChange}
                value={inputs.price || ""}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="mt-4" md="6" lg="5">
              <TextField
                multiline
                name="pdetail"
                fullWidth
                label="คุณลักษณะครุภัณฑ์"
                variant="outlined"
                onChange={handleChange}
                value={inputs.pdetail || ""}
              />
            </MDBCol>
            <MDBCol className="mt-4" md="6" lg="5">
              <MDBFile label="อัพโหลดรูปภาพ" id="customFile" />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="mt-4" md="6" lg="5">
              <TextField
                name="finance"
                fullWidth
                label="เงินงบประมาณ"
                variant="outlined"
                onChange={handleChange}
                value={inputs.finance || ""}
              />
            </MDBCol>
            <MDBCol className="mt-4" md="6" lg="5">
              <TextField
                name="acquirement"
                fullWidth
                label="ที่มาครุภัณฑ์"
                variant="outlined"
                onChange={handleChange}
                value={inputs.acquirement || ""}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="mt-4" md="6" lg="5">
              <TextField
                name="seller"
                fullWidth
                label="รายละเอียดผู้ขาย"
                variant="outlined"
                onChange={handleChange}
                value={inputs.seller || ""}
              />
            </MDBCol>
            <MDBCol className="mt-4" md="6" lg="5">
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
            </MDBCol>
          </MDBRow>
          {/* //========================================================================== */}
          <label className="mt-4 ms-5 ps-5 fw-bold">หน่วยงานที่ติดตั้ง</label>
          <MDBRow className="mb-3">
            <MDBCol className="mt-1" md="6" lg="5">
              <FormControl fullWidth>
                <InputLabel>หน่วยงานหลัก</InputLabel>
                <Select
                  label="หน่วยงานหลัก"
                  name="main_aid"
                  id="demo-simple-select-filled"
                  value={inputs.main_aid || ""}
                  onChange={handleChange}
                >
                  {selectagen.map((item, index) => (
                    <MenuItem key={index} value={item.main_aid}>
                      {item.main_aname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBCol>
            <MDBCol className="mt-1" md="6" lg="5">
              <FormControl fullWidth>
                <InputLabel>หน่วยงานย่อย</InputLabel>
                <Select
                  label="หน่วยงานย่อย"
                  name="sub_aid"
                  id="demo-simple-select-filled"
                  value={inputs.sub_aid || ""}
                  onChange={handleChange}
                >
                  {subagen.map((item, index) => (
                    <MenuItem key={index} value={item.sub_aid}>
                      {item.sub_aname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBModalFooter>
              <button className="btn btn-success rounded" type="submit">
                บันทึก
              </button>
              <div
                className="btn btn-danger rounded"
                onClick={props.toggleShowSingle}
              >
                ยกเลิก
              </div>
            </MDBModalFooter>
          </MDBRow>
        </form>

        <div></div>

        {/* <UploadAndDisplayImage/> */}
      </MDBContainer>
    </div>
  );
}

export default Product_add;
