const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaint.controller");
const { check } = require("express-validator");
const auth = require("../Middlewares/auth");

router.get("/", complaintController.getComplaints);
router.get("/all", complaintController.getAllComplaints);
router.get("/:id", [auth], complaintController.getComplaint);

router.post(
  "/register",
  [auth],
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("categoryId").not().isEmpty(),
    check("isImage").isBoolean(),
  ],
  complaintController.registerComplaint
);

router.post(
  "/like/addorremove/:id",
  [auth],
  [check("likerId", "User Id Who like it is required").not().isEmpty()],
  complaintController.addLikeOrRemove
);
router.post(
  "/remarks/:id",
  [auth],
  [check("remarks", "Admin remarks is required").not().isEmpty()],
  complaintController.addRemarks
);
router.post(
  "/status/:id",
  [auth],
  [check("status").isBoolean()],
  complaintController.changeStatus
);

router.post(
  "/review/:id",
  [auth],
  [
    check("userId").not().isEmpty(),
    check("userName").not().isEmpty(),
    check("comment").not().isEmpty(),
  ],
  complaintController.addReview
);

router.delete("/delete/:id", [auth], complaintController.deleteComplaint);

module.exports = router;
