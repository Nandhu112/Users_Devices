import React, { useState } from 'react';
import EditDevice from './EditDevice';
import { useDeleteDeviceMutation } from '../../slices/adminApiSlice';
import { toast } from "react-toastify";

function DeviceTable({ devices, setopernAddDevice,refetch }) {
    const [openEditDevice, setopenEditDevice] = useState(false)
    const [deleteItem, setdeleteItem] = useState([])
    const [item, setitem] = useState({})
    const [deleteDevice, { isLoading }] = useDeleteDeviceMutation();
    const handleOperAddDevice=()=>{
        setopernAddDevice(true)
    }
    const handleEditDevice=(item)=>{
        setitem(item)
        setopenEditDevice(true)
    }

    const handleCheckBox = (_id, checked) => {
        if (checked) {
          // Checkbox is checked
          if (!deleteItem.includes(_id)) {
            // If _id is not in the deleteItem array, add it
            setdeleteItem(prevDeleteItem => [...prevDeleteItem, _id]);
          }
        } else {
          // Checkbox is unchecked
          if (deleteItem.includes(_id)) {
            // If _id is in the deleteItem array, remove it
            setdeleteItem(prevDeleteItem => prevDeleteItem.filter(id => id !== _id));
          }
        }
      
      };

     const deleteHandler =async()=>{
        console.log("chk deleteHandler");
        try {
            const res = await deleteDevice({deleteItem}).unwrap();
            console.log(res, 'chkkk response');
            toast.success("Devices deleted successfully!");
            setopenEditDevice(false);
            refetch();
            setdeleteItem([])
          } catch (error) {
            console.error('API call failed:', error);
            toast.error(error.data.message);
          } 
     }


     
  return (
    <div>
     
       {openEditDevice? <EditDevice setopenEditDevice={setopenEditDevice} item={item} refetch={refetch}/> : null}
    <div className="container mx-auto py-8">
      <div className='flex items-center justify-between mb-4'>
        <h1 className="text-2xl font-bold">Table Example</h1>
     {deleteItem?.length<=0?   <button onClick={handleOperAddDevice} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Device</button> 
     :<button onClick={deleteHandler} type="button" class="focus:outline-none w-40 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>}
      </div>

      <div className="-mx-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-center"></th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Type</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Option</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {devices && Array.isArray(devices.device) && devices.device.map((item, index) => (
              <tr key={index}>
                 <td className="border px-4 py-2 text-center">
                    <input onChange={(e)=>handleCheckBox(item._id, e.target.checked)} type="checkbox" />
                </td>
                <td className="border px-4 py-2 text-center">{item.name}</td>
                <td className="border px-4 py-2 text-center">{item.type}</td>
                <td className={item?.status === 'Deactive' ? 'text-red-600 border px-4 py-2 text-center' : 'text-black border px-4 py-2 text-center' }>{item.status}</td>
                <td className="border px-4 py-2 text-center">
                  <button onClick={() => handleEditDevice(item)} className="text-blue-500 hover:text-blue-700">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default DeviceTable;
