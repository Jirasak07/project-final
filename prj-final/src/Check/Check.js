import axios from "axios";
import {
  MDBContainer,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import { MDBDataTableV5 } from "mdbreact";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Check_form from "./Check_form";

function Check() {
  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear() + 543;
  const [fisicalyear, setFisicalyear] = useState("");
  useEffect(() => {
    setFisicalyear(year + 1);
    if (day <= 30 && month <= 9) {
      console.log(year - 1);
    } else if (day >= 1 && month >= 10) {
      console.log(year);
    }
    //       if(day>=30 && month>=10){
    //     setFisicalyear(year)

    // }else if(day<=1 && month<=9){
    //     setFisicalyear(year-1)
    // }
  });

  // หาปีงบประมาณล่าสุด
  const [id, setId] = useState()
  const [cid, setCid] = useState()

 const handleClick=(id,idc)=>{
    setId(id)
    setCid(idc)
    toggleShowCheck()
 }
  const [checkmodal, setCheckModal] = useState(false)
  const toggleShowCheck=(()=>{setCheckModal(!checkmodal)}) 

  const [loop, setLoop] = useState(0);
  const [data, setData] = useState([]);
  const [dataTable, setDatatable] = useState([]);
  const getData = () => {};
  useEffect(() => {
    axios.get("http://localhost:3333/check").then((res) => {
      setData(res.data);
    });
    setLoop(1);
    console.log("update");
  }, [loop]);
  useEffect(() => {
    setDatatable({
      columns: [
        {
          label: "หมายเลขครุภัณฑ์",
          field: "pid",
        },
        {
          label: "หน่วยงานที่ติดตั้ง",
          field: "pname",
        },
        // {
        //   label: "ผู้ตรวจ",
        //   field: "name",
        // },
        {
          label: "ปีงบประมาณที่ตรวจ",
          field: "check_year",
        },
        {
          label: "สถานะ",
          field: "pstatus",
        },
        {
          label: "จัดการ",
          field: "manage",
        },
      ],
      rows: [
        ...data.map((item) => ({
          pid: <div>{item.pid}</div>,
          pname: <>{item.sub_aname}</>,
          // name: <>{item.name}</>,
          check_year: <span>{item.check_year}</span>,
          pstatus: <div className={item.pstatus_id === "1"? "text-success":""}> {item.pstatus_name} </div>,
          manage: (
            <div key={item.pid} className="d-flex">
              {/* <button className="btn btn-warning btn-sm"   >แก้ไข</button> */}
              <button
                className="btn btn-secondary btn-sm"
                 onClick={(e) => handleClick(item.pid,item.check_id)}
              >
                ตรวจสอบ
              </button>
            </div>
          ),
        })),
      ],
    });
  }, [data]);
  return (
    <div>
      <Sidebar />
      <div className="row justify-content-center mt-5">
      ข้อมูลครุภัณฑ์ที่ยังไม่ได้ตรวจสอบ
      </div> 
      <MDBContainer>
        {/* <div className="d-flex justify-content-end">
          <Link to="/scan" className="btn btn-success" >สแกน</Link>
        </div> */}
        
        <MDBDataTableV5
          searchTop
          sortable={false}
          theadColor="dark"
          searchBottom={false}
          data={dataTable}
          searchLabel="ค้นหา รายการ"
          striped
          bordered
          small
          entries={20}
          displayEntries={false}
          // entriesOptions={["10", "20"]}
          order={["age", "desc"]}
          entriesLabel="จำนวนที่แสดง "
          infoLabel={["แสดง", "ถึง", "จากทั้งหมด", "รายการ"]}
          paginationLabel={["ย้อนกลับ", "ถัดไป"]}
          responsive
          sortRows={["random"]}
        />
      </MDBContainer>
      <MDBModal show={checkmodal} setShow={setCheckModal} tabIndex="-1">
        <MDBModalDialog centered size="md">
          <MDBModalContent>
           
            <MDBModalBody>
                <Check_form id={id} cid={cid} close={toggleShowCheck} />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* {day}
      {month}
      {year} */}
    </div>
  );
}

export default Check;
