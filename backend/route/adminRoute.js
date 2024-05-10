import express  from "express";
import { protect } from "../middleware/authMiddleware.js";
const router= express.Router()

import { authAdmin,logoutAdmin,registerUser,adminListUsers,adminSearchUsers,adminDeleteUser,adminEditUser,adminGetUser } from "../controllers/adminController.js";
import {addDevice,adminListDevices,adminEditDevice,adminDeleteDevice} from "../controllers/DeviceController.js"
router.post('/auth',authAdmin)
router.post('/logout',logoutAdmin)
router.post('/registerUser',protect,registerUser)
router.get("/adminListUsers",protect, adminListUsers);
router.get("/listDevices",protect, adminListDevices);
router.post("/addDevice",protect, addDevice);
router.put("/editDevice",protect, adminEditDevice);
router.delete("/deleteDevice",protect, adminDeleteDevice);


router.post("/search-users",protect, adminSearchUsers);
router.post("/get-user",protect, adminGetUser);
router.post("/delete-user",protect, adminDeleteUser);
router.post("/edit-user",protect, adminEditUser);


export default router
   


