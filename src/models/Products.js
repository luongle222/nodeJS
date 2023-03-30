import { ObjectId } from "mongodb";
import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        require: true,
    },

},
    { timestamps: true, versionKey: false }
)

export default mongoose.model("products", productSchema)