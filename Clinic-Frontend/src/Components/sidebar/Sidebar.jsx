import React from "react";
import "./sidebar.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaVirus,
  FaGamepad,
  FaToolbox,
  FaUserFriends,
  FaCapsules,
  FaFirstAid,
  FaClipboardList,
  FaPenSquare,
  FaAngleLeft,
  FaAngleRight,
  FaSignOutAlt,
  FaInfoCircle,
  FaUser,
  FaTicketAlt,
  FaListUl
} from "react-icons/fa";
import {GiMeditation , GiSkills }from "react-icons/gi"
import doctorIcon from "../../assest/img/doctorIcon.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(20);
  const navigate = useNavigate()

  useEffect(() => {
    if (window.innerWidth >= 992) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  const menuItem1 = [ 
    {
      title: "سلامت روان",
      icon: <GiSkills />,
      link: "/life-skills",
    },
  ];
  const menuItem2 = [
  
    {
      title: "داروخانه",
      icon: <FaFirstAid />,
      link: "/drug-store",
    },
    {
      title: "دارو ",
      icon: <FaCapsules />,
      link: "/drug",
    },
    {
      title: "سرگرمی ها",
      icon: <FaGamepad />,
      link: "/entertainment",
    },
    {
      title: "مدیتیشن",
      icon: <GiMeditation />,
      link: "/meditation",
    },
  
    {
      title: "دانستنی ها",
      icon: <FaInfoCircle />,
      link: "/information",
    },
    {
      title: "خدمات شرکت",
      icon: <FaToolbox />,
      link: "/CEO-services",
    },
    {
      title: "مراجعه حضوری",
      icon: <FaUserFriends />,
      link: "/face-to-face-visit",
    },
 
    {
      title: "آزمون",
      icon: <FaPenSquare/>,
      link: "/quiz",
    },
    {
      title: "تیکت ها",
      icon: <FaTicketAlt />,
      link: "/tickets",
    },
  ];
   const menuItem3 = [
    {
      title: "بیماری ها",
      icon: <FaVirus/>,
      link: "/disease",
    },
    {
      title: "نظرسنجی",
      icon: <FaClipboardList />,
      link: "/survey",
    },
    {
      title: "کاربران/دسترسی ها",
      icon: <FaUser />,
      link: "/users",
    },
    {
      title: "درخواست ها",
      icon: <FaListUl />,
      link: "/requestes",
    },
  ];

  const MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: ({ active }) => {
      return {
        color: active ? "#457e75" : "#787a7b",
        fontSize: "20px",
      };
    },
    MenuItem: {
      color: "#bbbec0",
    },
    label: ({ active }) => {
      return {
        color: active ? "#457e75" : "#787a7b",
        fontWeight: 900,
        fontSize: "15px",
      };
    },
    button: ({ level, active, disabled }) => {
      return {
        backgroundColor: active ? "#f0fcf6" : "",
        borderLeft: active ? "4px solid #457e75" :"",
        "&:hover": {
            backgroundColor: "#f0fcf6",
            color: "#457e75",
          },
      };
    },
  };

  return (
    <div className=" d-flex sidebar">
      <div className="sidebar-box ">
        <Sidebar
          style={{ minHeight: "100vh" }}
          collapsed={collapsed}
          rtl
          backgroundColor="#fff"
          rootStyles={{
            height: "100%",
          }}
        >
          <div
            className="text-center py-4"
            style={{ display: collapsed ? "none" : "block" }}
          >
            <img alt="icon" className="sidebar-logo" src={doctorIcon} />
            <p
              className="mt-2"
              style={{ fontWeight: "bolder", fontSize: "larger" }}
            >
              پنل ادمین
            </p>
          </div>
          <Menu menuItemStyles={MenuItemStyles}>
          <SubMenu label='اپلیکیشن1'>
          {menuItem1.map((i, index) => (
           <MenuItem
             onClick={() => {
               setSelected(index);
               navigate(i.link)
             }}
             active={selected === index ? true : false}
             key={index}
             icon={i.icon}
           >
             {i.title}
           </MenuItem>
         ))}
          </SubMenu>
           <SubMenu label='اپلیکیشن و پنل2'>
           {menuItem2.map((i, index) => (
            <MenuItem
              onClick={() => {
                setSelected(index);
                navigate(i.link)
              }}
              active={selected === index ? true : false}
              key={index}
              icon={i.icon}
            >
              {i.title}
            </MenuItem>
          ))}
           </SubMenu>
           <SubMenu label='مشترک'>
           {menuItem3.map((i, index) => (
            <MenuItem
              onClick={() => {
                setSelected(index);
                navigate(i.link)
              }}
              active={selected === index ? true : false}
              key={index}
              icon={i.icon}
            >
              {i.title}
            </MenuItem>
          ))}
           </SubMenu>
            <MenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login")
                }}
                key={20}
                icon={<FaSignOutAlt />}
              >
                خروج
              </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div className="mt-5 sidebar-toggel-btn">
        <button
          className="btn p-0"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
