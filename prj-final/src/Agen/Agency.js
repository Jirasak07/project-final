import axios from "axios";
import { MDBContainer, MDBDataTable, MDBDataTableV5 } from "mdbreact";
import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import Edit_agen from "./Edit_agen";
import Add_mainagency from "./Add_mainagency";
import Add_subagency from "./Add_subagency";
import Sidebar from "../Sidebar/Sidebar";

function Agency() {
  const [statesub, setSub] = useState(0);
  const [statemain, setMain] = useState(0);

  const handleClick = (e, sub, main) => {
    setSub(sub);
    setMain(main);
    setBasicModal(!basicModal);
    console.log("sub :", sub, "Main : ", main);
  };
  //openModal
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const [mainModal, setMainModal] = useState(false);
  const toggleShowMain = () => setMainModal(!mainModal);

  const [SubModal, setSubModal] = useState(false);
  const toggleShowSub = () => setSubModal(!SubModal);

  //datatable
  const [adata, setAdata] = useState([]);
  const [datatable, setDatatable] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3333/show-agen").then((res) => {
      setAdata(res.data);
      setDatatable({
        columns: [
          {
            label: "หน่วยงานหลัก",
            field: "main_agen",
          },
          {
            label: "หน่วยงานย่อย",
            field: "sub_agen",
          },
          {
            label: "จัดการ",
            field: "manage",
          },
        ],
        rows: [
          ...adata.map((item, i) => ({
            main_agen: <>{item.main_aname}</>,
            sub_agen: <>{item.sub_aname}</>,
            manage: (
              <>
                <div
                  onClick={(e) => handleClick(e, item.sub_aid, item.main_aid)}
                  className="btn btn-warning round btn-sm"
                >
                  แก้ไข
                </div>
              </>
            ),
            //  random: <h5 searchvalue={data.Curriculumopen_TEAM} >tourist <span className="badge badge-danger">narrow</span></h5>,
          })),
        ],
      });
    });
  });
  return (
    <>
    <Sidebar/>
      <MDBContainer>
      <div className="d-flex justify-content-end">
        <div onClick={toggleShowMain} className="btn btn-secondary">
          เพิ่มหน่วยงานหลัก
        </div>
        <MDBModal show={mainModal} setShow={setMainModal} tabIndex="-1">
          <MDBModalDialog centered size="md" >
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>เพิ่มหน่วยงานหลัก</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShowMain}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
               <Add_mainagency onClick={toggleShowMain} />
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        <div onClick={toggleShowSub} className="btn btn-info">
          เพิ่มหน่วยงานย่อย
        </div>
        <MDBModal show={SubModal} setShow={setSubModal} tabIndex="-1">
          <MDBModalDialog centered size="md" >
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>เพิ่มหน่วยงานหลัก</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShowSub}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
              
               <Add_subagency  onClick={toggleShowSub} />
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
        </div>
        <div className="row justify-content-center">
      ข้อมูลหน่วยงาน
      </div> 
        <MDBDataTableV5
          searchTop
          searchBottom={false}
          scrollY
          maxHeight="70vh"
          hover
          theadColor="dark"
          noBottomColumns
          // searching ={true}
          searchLabel="ค้นหา รายการ"
          striped
          bordered
          small
          entries={20}
          displayEntries={false}
          // entriesOptions={["10", "20"]}
          order={["age", "desc"]}
          data={datatable}
          entriesLabel="จำนวนที่แสดง "
          infoLabel={["แสดง", "ถึง", "จากทั้งหมด", "รายการ"]}
          // paginationLabel={["ย้อนกลับ", "ถัดไป"]}
          responsive
          // sortRows={["random"]}
          sortable={false}
        />
      </MDBContainer>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>แก้ไขข้อมูลหน่วยงาน</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Edit_agen
                sub_aid={statesub}
                main_aid={statemain}
                onClick={toggleShow}
              />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default Agency;
