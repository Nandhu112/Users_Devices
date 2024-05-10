import React from 'react'
import UserDevices from './UserDevices'
import { useAdminListDeviceQuery } from "../../slices/adminApiSlice"

function UserTableAdmin({OpenAddUser,setOpenAddUser,users}) {
    const { data: devices, refetch } = useAdminListDeviceQuery()

    const handleOperAdduser=()=>{
        setOpenAddUser(true)
    }
    return (
        <div>
        <UserDevices/>
        <div className="container mx-auto py-8">
            <div className='j flex items-center justify-between'>
                <h1 className="text-2xl font-bold mb-4">Table Example</h1>
                <button onClick={handleOperAdduser} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add User</button>
            </div>

            <div className="-mx-4 overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2 text-center">Name</th>
                            <th className="px-4 py-2 text-center">Email</th>
                            <th className="px-4 py-2 text-center">Phone</th>
                            <th className="px-4 py-2 text-center">Status</th>
                            <th className="px-4 py-2 text-center">Devices</th>
                            <th className="px-4 py-2 text-center">Option</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users && Array.isArray(users.users) && users.users.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center">{item.userName}</td>
                                <td className="border px-4 py-2 text-center">{item.email}</td>
                                <td className="border px-4 py-2 text-center">{item.phone}</td>
                                <td className="border px-4 py-2 text-center">{item.status}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button className="text-green-500 hover:text-green-700">Show</button>
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
        </div>
    )
}

export default UserTableAdmin
