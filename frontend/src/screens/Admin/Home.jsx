import React, { useState } from 'react'
import UserTableAdmin from '../../components/Admin/UserTableAdmin'
import { useAdminListUserQuery } from "../../slices/adminApiSlice"
import AddUser from '../../components/Admin/AddUser'
function Home() {
    const { data: users, refetch } = useAdminListUserQuery()
    const [OpenAddUser, setOpenAddUser] = useState(false)
  return (
    <div>
    {OpenAddUser? <AddUser setOpenAddUser={setOpenAddUser} refetch={refetch}/>:null}
      <UserTableAdmin OpenAddUser={OpenAddUser} setOpenAddUser={setOpenAddUser}users={users}/>
    </div>
  )
}

export default Home
