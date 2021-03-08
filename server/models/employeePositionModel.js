import mongoose from "mongoose";

const employeePositionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("EmployeePosition", employeePositionSchema);
