import { TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBModalFooter } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
function Edit_user(props) {
  const [userselect, setUserSelect] = useState([]);
  const [update, setUpdate] = useState({});
  const [selectagen, setSelectAgen] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdate((values) => ({ ...values, [name]: value }));
    // console.log(update.username);
    // console.log(update.password);
    // console.log(update.name);
  };
  // const navigate = useNavigate();
  const onSubmit = () => {
    axios.put("http://localhost:3333/user-edited",{
      username: update.username,
      name:update.name,
      ustatus_id:update.ustatus_id,
      main_aid:update.main_aid,
      user_id: props.id
    }).then((res)=>{
      //not respons
    })
  };
  useEffect(() => {
    axios
      .post("http://localhost:3333/user-edit", {
        user_id: props.id,
      })
      .then((res) => {
        // console.log("ID", res.data[0].username);
        setUpdate({
          username: res.data[0].username,
          name: res.data[0].name,
          main_aid: res.data[0].main_aid,
          ustatus_id: res.data[0].ustatus_id,
        });
      });
    axios.get("http://localhost:3333/show-main-agen-select").then((res) => {
      setSelectAgen(res.data);
    });
    axios.get("http://localhost:3333/user-status-select").then((res) => {
      setUserSelect(res.data);
    });
  }, [props.id]);
  // console.log(propid)
  return (
    <MDBContainer>
      <form onSubmit={onSubmit}>
        {/* <form> */}
       
        <MDBRow>
          <MDBCol className="mt-3">
            <TextField
              fullWidth
              label="ชื่อผู้ใช้"
              name="username"
              id="outlined-basic"
              variant="outlined"
              value={update.username || ""}
              onChange={handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className="mt-3">
            <TextField
              fullWidth
              name="name"
              id="outlined-basic"
              variant="outlined"
              value={update.name || ""}
              onChange={handleChange}
              label="ชื่อ"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className="mt-3">
            <FormControl fullWidth>
              <InputLabel>ประจำอยู่หน่วยงานใด</InputLabel>
              <Select
                label="ประจำอยู่หน่วยงานใด"
                name="main_aid"
                id="demo-simple-select-filled"
                value={update.main_aid || ""}
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
          <MDBCol className="mt-3">
            <FormControl fullWidth>
              <InputLabel>สถานะ</InputLabel>
              <Select
                label="สถานะ"
                name="ustatus_id"
                id="demo-simple-select-filled"
                value={update.ustatus_id || ""}
                onChange={handleChange}
              >
                {userselect.map((item, index) => (
                  <MenuItem key={index} value={item.ustatus_id}>
                    {item.ustatus_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MDBCol>
        </MDBRow>

        <MDBModalFooter>
          <input
            className="btn btn-success btn-sm"
            value="บันทึก"
            type="submit"
          />
        </MDBModalFooter>
      </form>
    </MDBContainer>
  );
}

export default Edit_user;
