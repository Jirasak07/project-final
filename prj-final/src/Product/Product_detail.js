import axios from "axios";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
function Product_detail(props) {
  const newDate = new Date();
  const date = newDate.getFullYear()+543;
  const [detail, setDetail] = useState([]);
  useEffect(() => {
   
    axios
      .post("http://localhost:3333/product-detail", {
        pid: props.pid,
      })
      .then((res) => {
        setDetail(res.data);
      });
  }, [props.pid]);

  return (
    <div>
      {detail.map((item, id) => {
        return (
          <>
            <div key={id}>
              <span className="fw-bold">หมายเลขครุภัณฑ์ :</span> {item.pid}
            </div>
            <div key={id}>
              <span className="fw-bold">วันที่รับ : </span>{item.buydate}
            </div>
            <div key={id}>
              {" "}
              <span className="fw-bold">วันที่ซื้อ : </span> {item.pickdate}
            </div>

            <div key={id}>
              <span className="fw-bold">รายการ :</span> {item.pname}
            </div>
            <div key={id}>
              <span className="fw-bold">ครุณลักษณะ :</span> {item.pdetail}
            </div>
            <div key={id}>
              <span className="fw-bold">จำนวน :</span> {item.qty}&nbsp;
              {item.unit}
            </div>
            <div key={id}>
              {" "}
              <span className="fw-bold">ราคา :</span> {item.price} บาท
            </div>
            <div key={id}>
              <span className="fw-bold">ประเภทเงิน :</span> {item.finance}
            </div>
            <div key={id}>
              <span className="fw-bold">ที่มาครุภัณฑ์ : </span>
              {item.acquirement}
            </div>
            <div key={id}>
              <span className="fw-bold">ประเภทครุภัณฑ์ :</span> {item.ptype_name}
            </div>
            <div key={id}>
              <span className="fw-bold">รายละเอียดผู้ขาย :</span> {item.seller}
            </div>
            <div key={id}>
              <span className="fw-bold">หน่วยงานที่ติดตั้ง :</span>{" "}
              {item.sub_aname}
            </div>
            <div key={id}>
              <span className="fw-bold">สถานะ :</span> {item.pstatus_name}
            </div>
            <div key={id}>
              <span className="fw-bold">ปีงบประมาณ :</span> {item.fisicalyear}
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Product_detail;
