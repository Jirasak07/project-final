import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { MDBDataTableV5 } from "mdbreact";
import "./Product.css";
import Product_add from "./Product_add";
import Sidebar from "../Sidebar/Sidebar";
import QrCode from "./QrCode";
import Product_detail from "./Product_detail";


function Product() {

  
  const [singlemodal, setSingleModal] = useState(false);
  const toggleShowSingle = () => setSingleModal(!singlemodal);
  const [multimodal, setMultiModal] = useState(false);
  const toggleShowmulti = () => setMultiModal(!multimodal);
  const [id, setId] = useState(0);
  const [cid, setCid] = useState(0);
  const [loop, setLoop] = useState([]);
  const handleClick = (idx) => {
    setId(idx);
    setBasicModal(!basicModal);
  };
  const [detail, setDetail] = useState(false);
  const togDetail = () => setDetail(!detail);

  const handleClickz = (idx) => {
    setId(idx);
    
    toggleQ();
  };

  const handleClickd = (idx) => {
    setId(idx);
    togDetail()
  };

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const [qrc, setQrc] = useState(false);
  const toggleQ = () => setQrc(!qrc);

  const [data, setData] = useState([]);
  const [dataTable, setDatatable] = useState([]);
  const getData = () => {};
  useEffect(() => {
    axios.get("http://localhost:3333/product").then((res) => {
      setData(res.data);
      // console.log(res.data[0])
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
          label: "รายการ",
          field: "pname",
        },
        {
          label: "จำนวน",
          field: "qty",
        },
        {
          label: "ประเภทครุภัณฑ์",
          field: "ptype_id",
        },
        {
          label: "หน่วยงานที่ประจำ",
          field: "sub_aid",
        },
        {
          label: "ปีงบประมาณ",
          field: "fisicalyear",
        },
        {
          label: "จัดการ",
          field: "manage",
        },
      ],
      rows: [
        ...data.map((item) => ({
          pid: <div>{item.pid}</div>,
          pname: <>{item.pname}</>,
          qty: (
            <>
              {" "}
              {item.qty} &nbsp; {item.unit}{" "}
            </>
          ),
          ptype_id: <span>{item.ptype_name}</span>,
          sub_aid: <> {item.sub_aname} </>,
          fisicalyear: <> {item.fisicalyear}</>,
          manage: (
            <div key={item.pid} className="d-flex">
              {/* <button className="btn btn-warning btn-sm"   >แก้ไข</button> */}
              <button
                className="btn btn-success btn-sm"
                onClick={(e) => handleClickd(item.pid)}
              >
                รายละเอียด
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={(e) => handleClick(item.pid)}
              >
                แก้ไข
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={(e) => handleClickz(item.pid)}
              >
                ดาวน์โหลด QRCODE
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

      <div className="d-flex justify-content-end mt-2">
        <div onClick={toggleShowSingle} className="btn btn-secondary">
          เพิ่มครุภัณฑ์แบบเดี่ยว
        </div>
        <div className="d-flex justify-content-center">
          <MDBModal show={singlemodal} setShow={setSingleModal} tabIndex="-1">
            <MDBModalDialog centered size="xl">
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>เพิ่มครุภัณฑ์แบบเดี่ยว</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShowSingle}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <Product_add toggleShowSingle={toggleShowSingle} />
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </div>

        <div className="btn btn-success" onClick={toggleShowmulti}>
          เพิ่มครุภัณฑ์แบบกลุ่ม
        </div>
        <MDBModal show={multimodal} setShow={setMultiModal} tabIndex="-1">
          <MDBModalDialog centered size="lg">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>เพิ่มครุภัณฑ์แบบกลุ่ม</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShowmulti}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>Coming Soon...</MDBModalBody>
              <MDBModalFooter>
                <div className="btn btn-danger" onClick={toggleShowmulti}>
                  Cancel
                </div>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        {/* testQrcode */}
        <MDBModal show={qrc} setShow={setQrc} tabIndex="-1">
          <MDBModalDialog centered size="lg">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>QRCode ครุภัณฑ์หมายเลข : {id}</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleQ}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <QrCode pid={id}  />
              </MDBModalBody>
              <MDBModalFooter>
                <div className="btn btn-danger" onClick={toggleQ}>
                  Cancel
                </div>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
     <div className="row justify-content-center">
      ข้อมูลครุภัณฑ์ทั้งหมด
      </div> 
      <MDBDataTableV5
        className="mx-5"
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
       <MDBModal show={detail} setShow={setDetail} tabIndex="-1">
            <MDBModalDialog  size="md">
              <MDBModalContent>
                <MDBModalBody>
                  <Product_detail close={togDetail} pid={id} />
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
    </div>
  );
}

export default Product;
