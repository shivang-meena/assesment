import mongoose, { model } from "mongoose";
const { Schema }=mongoose
import bcrypt from 'bcryptjs';


const userSchema=new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    
});



userSchema.pre("save",async function() {
        if(!this.isModified("password")){
        return 
        }
   this.password=await bcrypt.hash(this.password,10);
   console.log(this.password)

});

userSchema.pre("findOneAndUpdate", async function(next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
 
});


export let User=mongoose.model("User",userSchema);
