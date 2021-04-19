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
    hotelName: {
      type: String,
      required: true,
    },
    hotelId: {
      type: String,
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
    position: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "EmployeePosition",
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.methods.matchPassword = async (enteredPassword) =>
  await bcrypt.compare(enteredPassword, this.password);

export default mongoose.model("Employee", employeeSchema);
