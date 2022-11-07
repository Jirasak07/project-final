import React, { useState, useEffect } from "react";
import { MDBContainer,  MDBDataTableV5 } from "mdbreact";
import axios from "axios";
import "./User.css";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Edit_user from "./Edit_user";
import Add_user from "./Add_user";
import Sidebar from "../Sidebar/Sidebar";

function User() {
  const [stateid, setId] = useState(0);
  const handleClick = (idx) => {
    setId(idx);
    setBasicModal(!basicModal);
  };
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const [basicModalAdd, setBasicModalAdd] = useState(false);
  const toggleShowAdd = () => setBasicModalAdd(!basicModalAdd);

  const [user, setUser] = useState([]);
  const [tbuser, setTbuser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3333/show-user").then((res) => {
      setUser(res.data);
      setTbuser({
        columns: [
          // {
          //   label: "รหัสเจ้าหน้าที่",
          //   field: "user_id",
          // },
          {
            label: "ชื่อเจ้าหน้าที่",
            field: "uname",
          },
          {
            label: "หน่วยงาน",
            field: "main_aid",
          },
          {
            label: "สถานะ",
            field: "ustatus_name",
          },
          {
            label: "จัดการ",
            field: "manage",
          },
        ],
        rows: [
          ...user.map((item) => ({
            // user_id: <div id_send={item.user_id}>{item.user_id}</div>,
            uname: <>{item.name}</>,
            main_aid: <> {item.main_aname} </>,
            ustatus_name: (
              <span className={item.ustatus_id == 1 ? "have" : "dont"}>
                {item.ustatus_name}
              </span>
            ),
            manage: (
              <div>
                {/* <button className="btn btn-warning btn-sm"   >แก้ไข</button> */}
                <MDBBtn
                  className="btn btn-warning btn-sm"
                  onClick={(e) => handleClick(item.user_id)}
                >
                  แก้ไข
                </MDBBtn>
              </div>
            ),
          })),
        ],
      });
    });
  },);

  return (
    <>
    <Sidebar/>
      <MDBContainer>
        <label className="mt-4 lb ">ข้อมูลเจ้าหน้าที่</label>
        <div className="d-flex justify-content-end">
          <MDBBtn  onClick={toggleShowAdd} className="btn btn-primary ">
            เพิ่มเจ้าหน้าที่
          </MDBBtn>
        </div>
        <MDBDataTableV5
          searchTop
          sortable={false}
          theadColor="dark"
          searchBottom={false}
          data={tbuser}
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
      <MDBModal
                  show={basicModal}
                  setShow={setBasicModal}
                  tabIndex="-1"
                >
                  <MDBModalDialog centered>
                    <MDBModalContent>
                      <MDBModalHeader >
                        <MDBModalTitle>แก้ไขข้อมูลเจ้าหน้าที่</MDBModalTitle>
                        <MDBBtn
                          className="btn-close"
                          color="none"
                          onClick={toggleShow}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <Edit_user id={stateid} toggleShow={toggleShow} />
                      </MDBModalBody>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>

                <MDBModal
                  show={basicModalAdd}
                  setShow={setBasicModalAdd}
                  tabIndex="-1"
                >
                  <MDBModalDialog centered>
                    <MDBModalContent>
                      <MDBModalHeader >
                        <MDBModalTitle>แก้ไขข้อมูลเจ้าหน้าที่</MDBModalTitle>
                        <MDBBtn
                          className="btn-close"
                          color="none"
                          onClick={toggleShowAdd}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <Add_user toggleShow={toggleShowAdd} />
                      </MDBModalBody>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
    </>
  );
}

export default User;
