const Complaint = require("../models/complaint");
const { validationResult } = require("express-validator");
const FileHelper = require("../utils/fileHelper");

const getComplaints = async (req, res) => {
  try {
    let complaints = await Complaint.find({ status: true })
      .populate("categoryId")
      .populate("userId")
      .exec();
    if (!complaints) {
      return res.status(400).json({ errors: [{ msg: "No complaints" }] });
    }

    res.json({ msg: "success", data: complaints });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};
const getAllComplaints = async (req, res) => {
  try {
    let complaints = await Complaint.find()
      .populate("categoryId")
      .populate("userId")
      .exec();
    if (!complaints) {
      return res.status(400).json({ errors: [{ msg: "No complaints" }] });
    }

    res.json({ msg: "success", data: complaints });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

const getComplaint = async (req, res) => {
  try {
    let complaintId = req.params.id;
    let complaint = await Complaint.findOne(complaintId, { status: true })
      .populate("categoryId")
      .populate("userId")
      .exec();
    if (!complaint) {
      return res.status(400).json({ errors: [{ msg: "No complaint" }] });
    }
    res.json({ msg: "success", data: complaint });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

const registerComplaint = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.file && FileHelper.deleteFile(req.file.path);
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, categoryId, isImage } = req.body;

  try {
    let complaint = new Complaint({
      title,
      description,
      categoryId,
      userId: req.user.id,
      resource: req.file ? req.file.path : null,
      isImage,
    });

    await complaint.save();

    res.json({ msg: "success", data: complaint });
  } catch (error) {
    req.file && FileHelper.deleteFile(req.file.path);
    res.status(500).json({ errors: error.message });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const complaintID = req.params.id;

    await Complaint.findByIdAndDelete(complaintID);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    req.file && FileHelper.deleteFile(req.file.path);
    res.status(500).json({ errors: error.message });
  }
};
const addLikeOrRemove = async (req, res) => {
  const complaintID = req.params.id;
  const likerId = req.body.likerId;

  try {
    const complaint = await Complaint.findById(complaintID);

    if (!complaint) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No complaint with this id" }] });
    }

    let totalLikes = [...complaint.likes];
    const index = totalLikes.findIndex((like) => like === likerId);

    if (index >= 0) {
      totalLikes = totalLikes.filter((like) => like !== likerId);
      complaint.likescounter = complaint.likescounter - 1;
    } else {
      totalLikes.push(likerId);
      complaint.likescounter = complaint.likescounter + 1;
    }

    complaint.likes = totalLikes;
    const updatedcomplaint = await complaint.save();
    res.status(200).json({ message: "success", data: updatedcomplaint });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const addRemarks = async (req, res) => {
  const complaintID = req.params.id;
  const remarks = req.body.remarks;

  try {
    const complaint = await Complaint.findById(complaintID);

    if (!complaint) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No complaint with this id" }] });
    }

    complaint.remarks = remarks;
    const updatedcomplaint = await complaint.save();
    res.status(200).json({ message: "success", data: updatedcomplaint });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};
const addReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const complaintID = req.params.id;
  const comment = req.body.comment;
  const userName = req.body.userName;
  const userId = req.body.userId;

  try {
    const complaint = await Complaint.findById(complaintID);

    if (!complaint) {
      return res.status(400).json({
        errors: [{ message: "failed", data: "No complaint with this id" }],
      });
    }
    const reviews = [...complaint.reviews];
    const index = reviews.findIndex((it) => it.userId === userId);

    if (index >= 0) {
      return res.json({
        message: "failed",
        data: "You already casted review.",
      });
    }

    reviews.unshift({
      userId,
      userName,
      comment,
    });
    complaint.reviews = reviews;
    const updatedcomplaint = await complaint.save();
    res.status(200).json({ message: "success", data: updatedcomplaint });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};
const changeStatus = async (req, res) => {
  const complaintID = req.params.id;
  const status = req.body.status;

  try {
    const complaint = await Complaint.findById(complaintID);

    if (!complaint) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No complaint with this id" }] });
    }

    complaint.status = status;
    const updatedcomplaint = await complaint.save();
    res.status(200).json({ message: "success", data: updatedcomplaint });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

module.exports = {
  registerComplaint,
  getComplaint,
  getComplaints,
  getAllComplaints,
  deleteComplaint,
  addLikeOrRemove,
  addRemarks,
  changeStatus,
  addReview,
};
