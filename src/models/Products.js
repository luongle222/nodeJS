import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";



const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
        },
    ],

},
    { timestamps: true, versionKey: false }
)
productSchema.plugin(mongoosePaginate);
export default mongoose.model("products", productSchema)