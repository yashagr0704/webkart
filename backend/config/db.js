import mongoose from "mongoose"

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    console.log("Connecting MongoDB", mongoURI)
    const conn = await mongoose.connect(mongoURI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB