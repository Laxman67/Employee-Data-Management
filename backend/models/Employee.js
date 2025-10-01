import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    imageUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    contactNumber: { type: String, required: true },
    address: { type: String, default: "Address Not Mentioned" },
    position: {
      type: String,
      required: true,
      enum: ["Manager", "Developer", "Designer", "QA", "HR", "Sales"],
    },
  },
  { timestamps: true }
);

// Ensure unique index
employeeSchema.index({ email: 1 }, { unique: true });

const Employee = model("Employee", employeeSchema);

export default Employee;
