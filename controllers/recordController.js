const Record = require('../models/Record');

// ✅ CREATE RECORD
exports.createRecord = async (req, res, next) => {
  try {
    let { amount, type, category, date, note } = req.body;

    // Convert to number
    amount = Number(amount);

    // 🔍 Validation
    if (!amount || isNaN(amount)) {
      res.status(400);
      throw new Error("Amount must be a valid number");
    }

    if (!['income', 'expense'].includes(type)) {
      res.status(400);
      throw new Error("Type must be 'income' or 'expense'");
    }

    if (!category || category.trim() === "") {
      res.status(400);
      throw new Error("Category is required");
    }

    // ✅ Create
    const record = await Record.create({
      amount,
      type,
      category,
      date,
      note,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Record created successfully",
      data: record
    });

  } catch (err) {
    next(err);
  }
};

// ✅ GET RECORDS (FILTER + PAGINATION)
exports.getRecords = async (req, res, next) => {
  try {
    const {
      type,
      category,
      page = 1,
      limit = 5
    } = req.query;

    let filter = {
      createdBy: req.user.id
    };

    // 🔍 Filtering
    if (type) filter.type = type;
    if (category) filter.category = category;

    // 📄 Pagination
    const records = await Record.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      page: Number(page),
      limit: Number(limit),
      count: records.length,
      data: records
    });

  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE RECORD
exports.updateRecord = async (req, res, next) => {
  try {
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!record) {
      res.status(404);
      throw new Error("Record not found or unauthorized");
    }

    res.json({
      message: "Record updated successfully",
      data: record
    });

  } catch (err) {
    next(err);
  }
};

// ✅ DELETE RECORD
exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!record) {
      res.status(404);
      throw new Error("Record not found or unauthorized");
    }

    res.json({
      message: "Record deleted successfully"
    });

  } catch (err) {
    next(err);
  }
};