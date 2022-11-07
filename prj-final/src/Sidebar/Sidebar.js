import React, { useState, useEffect } from "react";
import { FaBars, FaUserCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [side, setSite] = useState(false);
  const show = () => setSite(!side);

  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  useEffect(() => {
    const uid = localStorage.getItem("user_id");
    axios
      .post("http://localhost:3333/show-user-login", { user_id: uid })
      .then((res) => {
        if(res.data[0] == null){
          setName("")
        }else{
           setName(res.data[0].name);
        }
       
        // console.log(res.data[0].name)
      });
  },);
  const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem("login")
    navigate('/')
    // window.location.reload();
    
  }
 useEffect(() => {
 
 }, [])
  return (
    <>
      <div className="nav">
        <div className="nav-iconbar">
          <FaBars onClick={show} />
        </div>
        &nbsp; &nbsp; &nbsp;{" "}
        <Link to="/product" className="logoSystem">
          {" "}
            ระบบตรวจสอบครุภัณฑ์ สำนักส่งเสริมวิชาการและงานทะเบียน{" "}
        </Link>
        <div className="d-flex  name  px-2 ">
          <FaUserCheck className="text-success " />
          <span className="">{name}</span>
          <div className="btn btn-danger btn-sm  in-logout" onClick={logout} >ออกจากระบบ</div>
        </div>
      </div>
      <nav className={side ? "sidebarnav active" : "sidebarnav"}>
        <div className="sidebarwrap">
          <div className="spacefabar">
            <Link to="#" className={side ? "navicon active" : "navicon"}>
              <FaBars onClick={show} />
            </Link>
          </div>
          {SidebarData.map((item, idx) => {
            return (
              <>
                <div className="menuu">
                  <Link
                    className={menu ? "SidebarLink active " : "SidebarLink"}
                    to={item.path}
                  >
                    <div>
                      {item.icon}
                      <span className="SidebarLabel"> {item.title} </span>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
