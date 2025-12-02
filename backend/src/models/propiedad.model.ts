import { Schema, model, Model } from "mongoose";
import { PropiedadInterface } from "../interfaces/propiedad.interface";

const PropiedadSchema = new Schema<PropiedadInterface>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ["Casa", "Departamento"] },
  listingType: { type: String, required: true, enum: ["Venta", "Alquiler"] },
  price: { type: Number, required: true },
  baths: { type: Number, required: true },
  rooms: { type: Number, required: true },
  address: { type: String, required: true },
  area: { type: Number, required: true },
  image: { type: String }
});

const Propiedad: Model<PropiedadInterface> = model("Propiedad", PropiedadSchema);

export { Propiedad }
