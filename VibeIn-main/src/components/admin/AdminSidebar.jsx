import React from 'react'
import { MdLibraryMusic } from 'react-icons/md';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="h-[calc(100vh-70px)] w-[20%] bg-slate-600 px-7 sticky top-[70px] text-[18px] py-12 text-white shrink-0">
<ul className='flex flex-col gap-5'>
<li>
          <NavLink
            to="/admin"
            end
            className={(obj) => {
              let { isActive } = obj;
              return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-900 ${
                isActive && "bg-slate-800"
              }`;
            }}
          >
            <span><TbLayoutDashboardFilled />
            </span>
             <span>Dashboard</span>
            
          </NavLink>
        </li>
<li>
          <NavLink
            to="/admin/AddAlbum"
            className={(obj) => {
              let { isActive } = obj;
              return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-900 ${
                isActive && "bg-slate-800"
              }`;
            }}
          >
            <span><MdLibraryMusic />
        
            </span>
             <span>Add Album</span>
            
          </NavLink>
        </li>

</ul>
    </div>
  )
}

export default AdminSidebar