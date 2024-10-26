import { useContext, useEffect, useRef, useState } from "react";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
// import "./Sidebar.scss";

import { useDispatch } from "react-redux";


const SidebarAdmin = () => {
  // const [activeLink, setActiveLink] = useState("/admin");

  // const navbarRef = useRef(null);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // // const handleLogOut = () => {
  // //   logOut(dispatch, navigate);
  // // };

  // const handleClickOutside = (event) => {
  //   console.log("Event target:", event.target);
  //   if (
  //     navbarRef.current &&
  //     !navbarRef.current.contains(event.target) &&
  //     event.target.className !== "sidebar-open-btn"
  //   ) {
  //     closeSidebar();
  //   }
  // };

  // useEffect(() => {
  //   // document.addEventListener("mousedown", handleClickOutside);
  //   // return () => {
  //   //   document.removeEventListener("mousedown", handleClickOutside);
  //   // };
  // }, []);

  // const handleLinkClick = (link) => {
  //   setActiveLink(link);
  // };

  return (
    // <nav
      
    //   ref={navbarRef}
    // >
    //   <div className="sidebar-top">
    //     <div className="sidebar-brand">
    //       <img
    //         src={theme === LIGHT_THEME ? LogoBlue : LogoWhite}
    //         width={200}
    //         alt=""
    //       />
    //     </div>
    //     <button className="sidebar-close-btn" onClick={closeSidebar}>
    //       <MdOutlineClose size={24} />
    //     </button>
    //   </div>
    //   <div className="sidebar-body">
    //     <div className="sidebar-menu">
    //       <ul className="menu-list">
    //         <li className="menu-item">
    //           <Link
    //             to="/admin/dashboard"
    //             className={`menu-link ${
    //               activeLink === "/admin" ? "active" : ""
    //             }`}
    //             onClick={() => handleLinkClick("/admin")}
    //           >
    //             <span className="menu-link-icon">
    //               <MdOutlineGridView size={18} />
    //             </span>
    //             <span className="menu-link-text">Thống Kê</span>
    //           </Link>
    //         </li>
    //         <li className="menu-item">
    //           <Link to="/admin/contract" className="menu-link">
    //             <span className="menu-link-icon">
    //               <MdOutlineBarChart size={20} />
    //             </span>
    //             <span className="menu-link-text">Hợp đồng</span>
    //           </Link>
    //         </li>
    //         <li className="menu-item">
    //           <Link
    //             to="/admin/ManageHR"
    //             className={`menu-link ${activeLink === "/HR" ? "active" : ""}`}
    //             onClick={() => handleLinkClick("/HR")}
    //           >
    //             <span className="menu-link-icon">
    //               <MdOutlineShoppingBag size={20} />
    //             </span>
    //             <span className="menu-link-text">Danh Sách Quản Lý</span>
    //           </Link>
    //         </li>
    //         <li className="menu-item">
    //           <Link
    //             to="/admin/ManageStaff"
    //             className={`menu-link ${
    //               activeLink === "/staff" ? "active" : ""
    //             }`}
    //             onClick={() => handleLinkClick("/staff")}
    //           >
    //             <span className="menu-link-icon">
    //               <MdOutlineShoppingBag size={20} />
    //             </span>
    //             <span className="menu-link-text">Quản lý nhân viên</span>
    //           </Link>
    //         </li>

    //         {/* <li className="menu-item">
    //           <Link
    //             to="/customer"
    //             className={`menu-link ${
    //               activeLink === "/customer" ? "active" : ""
    //             }`}
    //             onClick={() => handleLinkClick("/customer")}
    //           >
    //             <span className="menu-link-icon">
    //               <MdOutlinePeople size={20} />
    //             </span>
    //             <span className="menu-link-text">Customer</span>
    //           </Link>
    //         </li>
    //         <li className="menu-item">
    //           <Link to="/" className="menu-link">
    //             <span className="menu-link-icon">
    //               <MdOutlineMessage size={18} />
    //             </span>
    //             <span className="menu-link-text">Messages</span>
    //           </Link>
    //         </li> */}
    //       </ul>
    //     </div>

    //     <div className="sidebar-menu sidebar-menu2">
    //       <ul className="menu-list">
    //         {/* <li className="menu-item">
    //                         <Link to="/" className="menu-link">
    //                             <span className="menu-link-icon">
    //                                 <MdOutlineSettings size={20} />
    //                             </span>
    //                             <span className="menu-link-text">Settings</span>
    //                         </Link>
    //                     </li> */}
    //         <li className="menu-item">
    //           <Link onClick={handleLogOut} className="menu-link">
    //             <span className="menu-link-icon">
    //               <MdOutlineLogout size={20} />
    //             </span>
    //             <span className="menu-link-text">Logout</span>
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <></>
  );
};

export default SidebarAdmin;