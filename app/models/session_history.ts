import mongoose, { mongo } from "mongoose";
import CompanianModel from "./companian";

const session_history_schema = new mongoose.Schema({
  user_id:String,
  companian_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"CompanianModel"
  }

});
const Session_Model= mongoose.models.session_history ||mongoose.model("session_history",session_history_schema) 

export default Session_Model;