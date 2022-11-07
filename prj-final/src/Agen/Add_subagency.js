import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./Agency.css";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { MDBModalFooter } from "mdb-react-ui-kit";
function Add_subagency(props) {
  const [inputs, setInputs] = useState({});
  const [maxid, setMaxid] = useState(0);
  const [selectagen, setSelectAgen] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    axios
      .get("http://localhost:3333/maxid-sub-agen")
      .then((res) => {
        if (res.data[0].maxid == null) {
          setMaxid(1);
        } else {
          setMaxid(res.data[0].maxid + 1);
        }
      });
  };
  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    axios
      .post("http://localhost:3333/add-sub-agency", {
        sub_aid: maxid,
        sub_aname: inputs.sub_aname,
        main_aid: inputs.main_aid,
      })
      .then((res) => {});
  };
  useEffect(() => {
    axios.get("http://localhost:3333/show-main-agen-select").then((res) => {
      setSelectAgen(res.data);
    });
  },[maxid]);
  // console.log(selectagen);
  return (
    <>
      <MDBContainer className="input">
        <form onSubmit={handleSubmit}>
          <div className="add-center ">
            <MDBRow>
              <MDBCol md="12" >
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
              <MDBCol md="12" className="mt-2">
                <TextField
                  name="sub_aname"
                  id="outlined-basic"
                  label="หน่วยงานย่อย"
                  variant="outlined"
                  fullWidth
                  value={inputs.sub_aname || ""}
                  onChange={handleChange}
                />
              </MDBCol>
            </MDBRow>
          </div> 
         
          <MDBModalFooter>
            <button className="btn btn-success" type="submit">บันทึก</button>

            <div className="btn btn-danger" onClick={props.onClick} >ยกเลิก</div>
          </MDBModalFooter>
        </form>
      </MDBContainer>
    </>
  );
}
//<FormControl fullWidth>
{
  /* <InputLabel id="demo-simple-select-label">
  หน่วยงานหลัก
</InputLabel>
<Select
  value={inputs.main_aid || ""}
  label="หน่วยงานหลัก"
  onChange={handleChange}
>
   <MenuItem value={1}  >
         cc
        </MenuItem>
   <MenuItem value={2}  >
         bb
        </MenuItem>
  {selectagen.map((item, i) => {
    return (
      <>
      
       <MenuItem value={2} key={i} >
         dd
        </MenuItem>
      </>
       
    );
  })}{" "}
</Select>
</FormControl> */
}
export default Add_subagency;
