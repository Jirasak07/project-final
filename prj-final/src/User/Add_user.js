import { TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MDBModalFooter } from "mdb-react-ui-kit";

function Add_user(props) {
  const MySwal = withReactContent(Swal);
  const [register, setRegister] = useState({});
  const [selectagen, setSelectAgen] = useState([]);
  const [maxid, setMaxid] = useState(0);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegister((values) => ({ ...values, [name]: value }));
  };
  axios.get("http://localhost:3333/maxid-userid").then((res) => {
    setMaxid(res.data[0].maxid + 1);
  });
  const navigate = useNavigate();
  const onSubmit = () => {
    axios
      .post("http://localhost:3333/add-user", {
        user_id: maxid,
        username: register.username,
        password: register.password,
        name: register.name,
        ustatus_id: "1",
        main_aid: register.main_aid,
      })
      .then((res) => {});
  };
  useEffect(() => {
    axios.get("http://localhost:3333/show-main-agen-select").then((res) => {
      setSelectAgen(res.data);
    });
  }, []);

  const Cancel = () => {
    navigate("/user");
  };
  return (
    <MDBContainer>
      <form onSubmit={onSubmit} className="form">
        <MDBRow>
          <MDBCol  sm="12" lg="12" md="12" >
            <TextField
              fullWidth
              label="ชื่อผู้ใช้"
              name="username"
              id="outlined-basic"
              variant="outlined"
              value={register.username || ""}
              onChange={handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="12" lg="12" md="12" className="mt-3">
            <TextField
              type="password"
              fullWidth
              name="password"
              id="outlined-basic"
              variant="outlined"
              value={register.password || ""}
              onChange={handleChange}
              label="รหัสผ่าน"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol  sm="12" lg="12" md="12" className="mt-3">
            <TextField
              fullWidth
              name="name"
              id="outlined-basic"
              variant="outlined"
              value={register.name || ""}
              onChange={handleChange}
              label="ชื่อ"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol  sm="12" lg="12" md="12" className="mt-3">
            <FormControl fullWidth>
              <InputLabel>ประจำอยู่หน่วยงานหลักใด</InputLabel>
              <Select
                label="ประจำอยู่หน่วยงานหลักใด"
                name="main_aid"
                id="demo-simple-select-filled"
                value={register.main_aid || ""}
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
          <MDBModalFooter>
            <input className="btn btn-success" type="submit" value="บันทึก" />
            <div className="btn btn-danger" onClick={props.toggleShow}>
              ยกเลิก
            </div>
          </MDBModalFooter>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default Add_user;
