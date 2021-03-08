import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB connected: ${connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDatabase;
