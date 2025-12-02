import mongoose from "mongoose"

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.log(error);
  }
}

export { connect }