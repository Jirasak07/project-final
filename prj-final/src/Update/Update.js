import { MDBContainer } from 'mdb-react-ui-kit'
import { MDBDataTableV5 } from 'mdbreact'
import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'

function Update() {
    const [dataUpdate, setDataUpdate] = useState({
            columns:[
                {
                    label:"หมายเลขครุภัณฑ์",
                    field:"pid",

                },
                {
                    label:"ตรวจสอบล่าสุด",
                    field:"lastCheck",

                },
                {
                    label:"หน่วยงานที่ติดตั้ง",
                    field:"csub_aid",
                },
                {
                    label:"สถานะ",
                    field:"pstatus_id",
                },
                {
                    label:"ผู้ตรวจสอบ",
                    field:"user_id",
                },
                {
                    label:"อัพเดทล่าสุด",
                    field:"lastUpdate",
                },
                {
                    label:"หน่วยงานที่ติดตั้ง",
                    field:"usub_aid",
                },
                {
                    label:"รายละเอียดสถาณที่",
                    field:"usub_aid",
                },
                {
                    label:"สถานะ",
                    field:"pstatus_id",
                },
                {
                    label:"เจ้าหน้าที่อัพเดท",
                    field:"user_id",
                },
                {
                    label:"จัดการ",
                    field:"manage",
                },
            ],
            rows:[
                {
                    pid:"",
                    lastCheck:"",
                    csub_aid:"",
                    pstatus_id:"",
                    manage:<div className='btn btn-secondary btn-sm'>อัพเดท</div>
                }
            ]
    })
  return (
    <div>
        <Sidebar/>
        <div className="row justify-content-center mt-4">
      ข้อมูลอัพเดทครุภัณฑ์
      </div> 
        <MDBContainer fluid>
        <MDBDataTableV5
          searchTop
          sortable={false}
          theadColor="dark"
          searchBottom={false}
          data={dataUpdate}
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
          responsive-md
          sortRows={["random"]}
        />
        </MDBContainer>
    </div>
  )
}

export default Update