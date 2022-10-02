const express = require("express");
const router = express();
const userRoutes = require("./user.routes");
const complaintRoutes = require("./complaint.routes");
const adminRoutes = require("./admin.routes");
const categoryRoutes = require("./category.routes");

// User Routes
router.use("/user", userRoutes);
router.use("/complaint", complaintRoutes);
router.use("/admin", adminRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
