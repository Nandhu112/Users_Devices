import asyncHandler from "express-async-handler"
import User from "../modles/userModel.js"  
import Admin from "../modles/AdminModel.js";     
import generateToken from "../utils/generateToken.js"


const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;   
    console.log('Checking admin123...',email, password);    
    const admin = await Admin.findOne({ email:email});   

    if (admin && (await admin.matchPassword(password))) {   
        generateToken(res, admin._id);
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});

const logoutAdmin = asyncHandler (async(req,res)=>{

  res.cookie('jwt',"",{
      httpOnly:true,
      expires: new Date(0)
  })
  res.status(200).json({message:" user logged out "})
 }) 

const registerUser = asyncHandler(async (req, res) => {
  const { name,userName, email,phone, password} = req.body;  
  console.log(name,userName, email,phone, password);   
  const mailExist = await User.findOne({ email: email});
  const phoneExist = await User.findOne({ phone: phone});
  const userNameExist = await User.findOne({ userName: userName});

  if (mailExist) {
    console.log("mail already exist");
    res.status(400);
    throw new Error("mail already exist");
  }
  if (phoneExist) {
    console.log("phone already exist");
    res.status(400);
    throw new Error("phone already exist");
  }
  if (userNameExist) {
    console.log("userName already exist");
    res.status(400);
    throw new Error("userName already exist");
  }
  const user = await User.create({
    name,
    userName,
    email,
    phone,
    password,   
  });
  res.status(201).json({ success: "User added successfully"});

}); 



const adminListUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.status(201).json({ users });
    } catch (error) {
      console.log(error.message);
    }
  });


  const adminSearchUsers = asyncHandler(async (req, res) => {
    console.log(req.body.search,'search');
    try {
      const users = await User.find({
        name: { $regex: req.body.search, $options: "i" },
        Admin: false,
      });
      console.log(users,'user')
      res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
    }
  });

  const adminDeleteUser = asyncHandler(async (req, res) => {
    try {
        console.log(req.body.userId,'userId')
      await User.deleteOne({ _id: req.body.userId });
      res
        .status(200)
        .json({ message: "User Profile Deleted Successfully", task: true });
    } catch (error) {
      console.log(error.message);
      res
        .status(200)
        .json({ message: "User Profile Delete Failed", task: false });
    }
  });

  const adminEditUser = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.body._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
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

  const adminGetUser = asyncHandler(async(req,res)=>{
    try {
      const user = await User.find({_id: req.body.user})
      res.status(200).json({user})
    } catch (error) {
      console.log(error.message)
    }
  })

export {
    authAdmin,
    logoutAdmin,
    registerUser,
    adminListUsers,
    adminSearchUsers,
    adminDeleteUser,
    adminEditUser,
    adminGetUser
}
