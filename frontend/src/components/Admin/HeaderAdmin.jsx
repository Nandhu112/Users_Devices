import React, { useState } from 'react';
import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { adminLogout } from "../../slices/adminAuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [adminLogoutApiCall] = useAdminLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSubmenu = () => {
    setSubmenuVisible(!submenuVisible);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const logoutHandler=async()=>{
    console.log('chk admin logout');
    try {
      await adminLogoutApiCall().unwrap()
      dispatch(adminLogout())
      navigate('/admin/login')
    } catch (error) {
      console.error(error);
    }
  }

  const userHandler=()=>{
    navigate('/admin/user')
  }

  return (
    
    <div className="relative">
      <div className="bg-gray-900 h-16 w-full fixed top-0 z-50"></div>
      <div className="absolute top-0 left-0 bg-gray-900 h-full w-16 z-50"></div>
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer z-50"
        onClick={toggleSidebar}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>
      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${sidebarVisible ? '' : 'hidden'}`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-16 flex items-center"> {/* Adjusted margin-top */}
            <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
            <h1 className="font-bold text-gray-200 text-[20px] ml-3">Admin Panel</h1>
            <i className="bi bi-x cursor-pointer ml-28 lg:hidden" onClick={toggleSidebar}></i>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>

        <div onClick={userHandler} className="p-2.5 mt-11 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <i className="bi bi-house-door-fill"></i>
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Users</span>
        </div>
        <div onClick={()=>{ navigate('/admin/device')}} className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <i className="bi bi-bookmark-fill"></i>
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Devices</span>
        </div>
        <div className="my-4 bg-gray-600 h-[1px]"></div>
     
        <div onClick={logoutHandler}  className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>

        </div>
      </div>  
    </div>   
  );
}

export default HeaderAdmin;
