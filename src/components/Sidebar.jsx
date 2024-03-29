import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock, 
} from "react-icons/ai";
import MessageIcon from '@mui/icons-material/Message';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import "./Sidebar.css";

const Sidebar = () => {
  const [tabActive, setTabActive] = useState("thongke")
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  console.log('ffffffffffffffffffffffffffffff', sessionStorage.getItem("role"))
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            {/* <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Shoppy</span>
            </Link> */}
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10">
            <p style={{textAlign: 'center', fontSize: 20, fontWeight: 2000}}>
              QUẢN LÝ
            </p>
            <ul>
              {JSON.parse(localStorage.getItem("role")) === "Shipper" && (
                <div>
                  <Link to="/shipper" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineShoppingCart className="icon" />
                      <span>Giao hàng</span>
                    </li>
                  </Link>
                </div>
              )}

              {JSON.parse(localStorage.getItem("role")) === "Admin" && (
                <div>
                  <div className="status__content" style={{backgroundColor: tabActive === 'thongke' ? '#efd8f0' : null}} 
                  onClick={() => setTabActive('thongke')}>
                  <Link to="/" >
                    <li>
                      <BarChartIcon className="icon" />
                      <span>Thống kê</span>
                    </li>
                  </Link>
                  </div>

                  <div className="status__content" style={{backgroundColor: tabActive === 'donhang' ? '#efd8f0' : null}} 
                  onClick={() => setTabActive('donhang')}>
                  <Link to="/orders" style={{ textDecoration: "none" }}>
                    <li>
                      <LocalMallIcon className="icon" />
                      <span>Đơn hàng</span>
                    </li>
                  </Link>
                  </div>

                  <div className="status__content" style={{backgroundColor: tabActive === 'nguoidung' ? '#efd8f0' : null}} 
                  onClick={() => setTabActive('nguoidung')}>
                  <Link to="/employees" style={{ textDecoration: "none" }}>
                    <li>
                      <AccountBoxIcon className="icon" />
                      <span>Người dùng</span>
                    </li>
                  </Link>
                  </div>

                  <div className="status__content" style={{backgroundColor: tabActive === 'khachhang' ? '#efd8f0' : null}} 
                  onClick={() => setTabActive('khachhang')}>
                  <Link to="/customers" style={{ textDecoration: "none" }}>
                    <li>
                      <AccountBoxIcon className="icon" />
                      <span>Khách hàng</span>
                    </li>
                  </Link>
                  </div>

                  <div className="status__content" style={{backgroundColor: tabActive === 'sanpham' ? '#efd8f0' : null}} 
                  onClick={() => setTabActive('sanpham')}>
                  <Link to="/products" style={{ textDecoration: "none" }}>
                    <li>
                      <ShoppingCartIcon className="icon" />
                      <span>Sản phẩm</span>
                    </li>
                  </Link>
                  </div>

                  <div className="status__content" style={{backgroundColor: tabActive === 'thuonghieu' ? '#efd8f0' : null}} 
                  onClick={() => setTabActive('thuonghieu')}>
                  <Link to="/brands" style={{ textDecoration: "none" }}>
                    <li>
                      <CategoryIcon className="icon" />
                      <span>Thương hiệu</span>
                    </li>
                  </Link>
                  </div>

                  <div className="status__content" style={{backgroundColor: tabActive === 'loaisanpham' ? '#efd8f0' : null}} 
                  onClick={() => setTabActive('loaisanpham')}>
                  <Link to="/producttypes" style={{ textDecoration: "none" }}>
                    <li>
                      <CategoryIcon className="icon" />
                      <span>Loại sản phẩm</span>
                    </li>
                  </Link>
                  </div>

                  <div className="status__content" style={{backgroundColor: tabActive === 'tinnhan' ? '#efd8f0' : null}} 
                  onClick={() => setTabActive('tinnhan')}>
                  <Link to="/chatbox" style={{ textDecoration: "none" }}>
                    <li>
                      <MessageIcon className="icon" />
                      <span>Tin nhắn</span>
                    </li>
                  </Link>

                  </div>
                </div>
              )}
            </ul>
          </div>

          {/* <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div> */}
        </>
      )}
    </div>
  );
};

export default Sidebar;
