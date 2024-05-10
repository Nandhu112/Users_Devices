import  express  from "express";
import dotevn from "dotenv"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
dotevn.config();

import connectDB from "./config/db.js";
const port=process.env.PORT || 5000;
import userRoutes from "./route/userRoute.js"
import adminRoutes from "./route/adminRoute.js"


connectDB()

const app = express()  

app.use(express.json())

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

app.get('/' ,(req,res)=>res.send('server is running'))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`server is running ${port}`))