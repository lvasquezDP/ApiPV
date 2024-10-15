import mongoose, { Schema } from "mongoose";

const ventaScrema = new mongoose.Schema({
  id_tienda:{
    type:Schema.Types.ObjectId,
    ref:'Tiendas',
    required:false,
  },
  id_usuario:{
    type:Schema.Types.ObjectId,
    ref:'Usuarios',
    required:false,
  },
  costo:{
    type:Number,
    required:[true, "El costo es requerido"],
  },
});


ventaScrema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
   delete ret._id;
  },
});

export const UserModel = mongoose.model("Ventas", ventaScrema);
