import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {Switch} from 'react-dom'
import Login from "../Auth/Login";
import Product from "../Product/Product";
import Sidebar from "../Sidebar/Sidebar";
import Agency from "../Agen/Agency";
import User from "../User/User";
import axios from "axios";
import Check from "../Check/Check";
import Check_form from "../Check/Check_form";
import Update from "../Update/Update";
import Edit_agen from "../Agen/Edit_agen";
import Edit_agenURL from "../Agen/Edit_agenURL";
import Check_formQRCode from "../Check/Check_formQRCode";

function Router(props) {
  

  return (
    <div>
      <Routes> 
        <Route path="/" element={<Login />} exact />
        <Route path="/product" element={<Product />} exact />
        <Route path="/check" element={<Check/>} exact />
        <Route path="/update" element={<Update/>} exact />
        <Route path="/agency" element={<Agency />} exact />
        {/* <Route path="/agency-edit/:id" element={<Edit_agenURL/>} exact /> */}

        <Route path="/officer" element={<User />} exact />
        <Route path="/check-qr/:pid/:cid" element={<Check_formQRCode/>} exact />
        {/* <Route path="/check_form" element={<Check_form/>} exact /> */}
      </Routes>
    </div>
  );
}

export default Router;
