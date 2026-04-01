const Record = require('../models/Record');

// ✅ GET DASHBOARD SUMMARY
exports.getSummary = async (req, res, next) => {
  try {
    // 🔐 Get only logged-in user's records
    const records = await Record.find({
      createdBy: req.user.id
    });

    let income = 0;
    let expense = 0;

    const categoryBreakdown = {};

    // 🔍 Process records
    records.forEach((r) => {
      if (r.type === 'income') {
        income += r.amount;
      } else {
        expense += r.amount;
      }

      // 📊 Category-wise totals
      categoryBreakdown[r.category] =
        (categoryBreakdown[r.category] || 0) + r.amount;
    });

    // ✅ Final response
    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      categoryBreakdown
    });

  } catch (err) {
    next(err);
  }
};