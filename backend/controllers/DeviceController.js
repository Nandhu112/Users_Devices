import asyncHandler from "express-async-handler"
import Device from "../modles/DeviceModel.js";

const addDevice = asyncHandler(async (req, res) => {
    console.log("chkk 1234");
    const { name,type} = req.body;  
    console.log(name,type);   
  
    console.log("ttt");
    const device = await Device.create({
      name,
      type, 
    });
    console.log("kkk");
    res.status(201).json({ success: "Device added successfully"});
  
  }); 

  const adminListDevices = asyncHandler(async (req, res) => {
    console.log("list device");
    try {
      const device = await Device.find().sort({ createdAt: -1 });
      console.log("chk data",device);
      res.status(201).json({ device });
    } catch (error) {
      console.log(error.message);
    }
  });
  const adminEditDevice = asyncHandler(async (req, res) => {
    console.log('chk adminEditDevice');
    try {
      const device = await Device.findById(req.body._id);
    if (device) {
        device.name = req.body.name || device.name;
        device.type = req.body.type || device.email;
        device.status = req.body.status || device.status;
      const updatedDevice = await device.save();
      res.status(200).json({
        _id: updatedDevice._id,
        name: updatedDevice.name,
        type: updatedDevice.type,
        status: updatedDevice.status,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
      res.status(200).json({ message: "hello world" });
    } catch (error) {
      console.log(error.message);
    }
  });

  const adminDeleteDevice = asyncHandler(async (req, res) => {
    try {
        
        const deviceIds = req.body.deleteItem;
        console.log(deviceIds);
        await Device.deleteMany({ _id: { $in:deviceIds} });
        res.status(200).json({ message: "User Profiles Deleted Successfully", task: true });
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ message: "User Profiles Delete Failed", task: false });
    }
});

  export {
    addDevice,
    adminListDevices,
    adminEditDevice,
    adminDeleteDevice

}