import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBBtn, MDBModalFooter } from "mdb-react-ui-kit";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
function Edit_agenURL(props) {
  const { id } = useParams();

  const [inputs, setInputs] = useState({});
  const [selectagen, setSelectAgen] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  useEffect(() => {
    axios
      .post("http://localhost:3333/show-agen-edit", {
        sub_aid: props.sub_aid,
      })
      .then((res) => {
      setInputs({
        sub_aname:res.data[0].sub_aname,
        main_aid:props.main_aid
      })
      });
      axios.get("http://localhost:3333/show-main-agen-select").then((res) => {
      setSelectAgen(res.data);
    });
  }, [props.sub_aid]);
  const onSubmit=()=>{
     axios.put("http://localhost:3333/agen-edited",{
        sub_aname:inputs.sub_aname,
        main_aid:inputs.main_aid,
        sub_aid:props.sub_aid,
        main_aid_props: props.main_aid
    }).then((res)=>{

    })
  }
  return (
    <div> 
    {id}
      <MDBContainer>
       
      <form onSubmit={onSubmit} >
     
        <MDBRow>
          <MDBCol className="mt-2">
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
        </MDBRow>
        <MDBRow>
          <MDBCol className="mt-2">
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
         </form>
        <MDBModalFooter>
          <MDBBtn className="btn btn-success btn-sm" type="submit" >บันทึก</MDBBtn>
          <MDBBtn className="btn btn-danger btn-sm" onClick={props.onClick} >บันทึก</MDBBtn>
        </MDBModalFooter>
      </MDBContainer>
   
    </div>
  );
}

export default Edit_agenURL;
