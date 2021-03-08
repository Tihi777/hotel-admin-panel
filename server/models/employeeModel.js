import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    position: {},
  },
  {
    timestamps: true,
  }
);

employeeSchema.methods.matchPassword = async (enteredPassword) =>
  await bcrypt.compare(enteredPassword, this.password);

export default mongoose.model("Employee", employeeSchema);
