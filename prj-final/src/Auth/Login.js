import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import Logo from "./KPRULOGO.png";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
function Login() {
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3333/login", {
        username: input.username,
        password: input.password,
      })
      .then((res) => {
        // console.log(res.data.token)
        if (res.data.status === "ok") {
          // axios.get("").then((res)=>{

          // })
          // console.log("Login success")
          MySwal.fire({
            html: <i>{res.data.message}</i>,
            icon: "success",
          }).then((value) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.userid);
            localStorage.setItem("login", "ok");
            navigate("/product");
          });
        } else {
          MySwal.fire({
            html: <i>{res.data.message}</i>,
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div  className="  container-fulid   " >
      <div className="bag" ></div>
      <div className=" pad d-flex justify-content-center pt-5 ">
        <div className=" formLogin d-flex justify-content-center ">
          <MDBCol size="9">
            <div>
              <div className="logo d-flex justify-content-center mt-4 ">
                <img src={Logo} width="150" />
              </div>
              <div className="d-flex justify-content-center">
                <span className="fw-bold">ระบบตรวจสอบครุภัณฑ์</span>
              </div>

              <form className="mt-3" onSubmit={handleSubmit}>
                <MDBInput
                  label="ชื่อผู้ใช้ / Username"
                  id="form1"
                  name="username"
                  type="text"
                  value={input.username || ""}
                  onChange={handleChange}
                />
                <MDBInput
                  className="mt-3"
                  label="รหัสผ่าน / password"
                  id="form1"
                  name="password"
                  type="password"
                  value={input.password || ""}
                  onChange={handleChange}
                />
                {/* <MDBBt className="btn btn-success lg mt-2 ">เข้าสู่ระบบ</MDBBt> */}
                <div className="d-grid gap-2 mb-4 mt-2">
                  <MDBBtn color="success" type="submit">
                    เข้าสู่ระบบ
                  </MDBBtn>
                </div>
              </form>
            </div>
          </MDBCol>
        </div>
      </div>
    </div>
  );
}

export default Login;
