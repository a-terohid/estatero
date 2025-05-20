import { FAQ_Interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";


const FAQ_SCHEMA = new Schema<FAQ_Interface , Schema.Types.ObjectId>({
    question : { type: String , required: true , default: "" },
    answer : { type: String , required: true , default: "" },
} , { collection : "FAQ" });

const FAQ_MODEL = models.FAQ_MODEL || model("FAQ_MODEL" , FAQ_SCHEMA);

export default FAQ_MODEL;