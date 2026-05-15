import "dotenv/config"  
import { Router } from "express";
const route=Router();
import {  sendotptomail, verifyotp ,registration,login} from "../controller/userController.js";

route.post("/otp", sendotptomail);

route.post("/verify-otp",verifyotp);

route.post("/registeration",registration);

route.post("/login",login);
export default route;