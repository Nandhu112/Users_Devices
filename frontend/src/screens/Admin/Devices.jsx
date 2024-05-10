import React, { useState } from 'react'
import DeviceTable from '../../components/Admin/DeviceTable'
import { useAdminListDeviceQuery } from "../../slices/adminApiSlice"
import AddDevice from '../../components/Admin/AddDevice'
import EditDevice from '../../components/Admin/EditDevice'
function Devices() {
    const { data: devices, refetch } = useAdminListDeviceQuery()
    const [opernAddDevice, setopernAddDevice] = useState(false)
    console.log(devices);
  return (
    <div>
  
      {opernAddDevice? <AddDevice setopernAddDevice={setopernAddDevice} refetch={refetch}/> :null}
      <DeviceTable devices={devices} refetch={refetch} setopernAddDevice={setopernAddDevice}/>
    </div>
  )
}

export default Devices
