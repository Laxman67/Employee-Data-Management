import Employee from "../models/Employee.js";

export const getEmployees = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }
    const employees = await Employee.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: employees });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    logger.error("Error fetching employees: %o", err);
  }
};

export const getEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ error: "Employee Not found" });
    res.status(200).json({ success: true, data: emp });
  } catch (err) {
    res.status(400).json({ success: false, error: "Invalid ID" });
    logger.error("Error fetching employee: %o", err);
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, email, position, contactNumber, address } = req.body;
    const emp = await Employee.create({
      name,
      email,
      position,
      contactNumber,
      address,
    });
    res.status(201).json({ success: true, data: emp });
    logger.info("Employee created: %o", emp);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ success: false, error: "Email already exists" });
      logger.error("Error creating employee: %o", err);
    } else {
      res.status(400).json({ success: false, error: err.message });
      logger.error("Error creating employee: %o", err);
    }
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!emp)
      return res.status(404).json({ success: false, error: "Not found" });

    res.status(200).json({ success: true, data: emp });
    logger.info("Employee updated: %o", emp);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
    logger.error("Error updating employee: %o", err);
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);

    if (!emp) {
      return res.status(404).json({ success: false, error: "Not found" });
    }
    logger.warn("Employee deleted: %o", emp);
    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: "Invalid ID" });
    logger.error("Error deleting employee: %o", err);
  }
};
