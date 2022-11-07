import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { MdUpdate } from "react-icons/md";
import { FaNewspaper, FaUserAlt } from "react-icons/fa";

export const SidebarData = [
  {
    title: "ครุภัณฑ์",
    path: "/product",
    icon: <AiFillHome className="align-middle" />,
  },
  {
    title: "ตรวจสอบครุภัณฑ์",
    path: "/check",
    icon: <BsFillCalendar2CheckFill />,
  },
  {
    title: "อัพเดทข้อมูลครุภัณฑ์",
    path: "/update",
    icon: <MdUpdate />,
  },
  {
    title: "หน่วยงาน",
    path: "/agency",
    icon: <FaNewspaper />,
  },
  {
    title: "เจ้าหน้าที่",
    path: "/officer",
    icon: <FaUserAlt />,
  },
];
