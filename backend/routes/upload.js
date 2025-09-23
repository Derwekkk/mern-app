const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const auth = require("../middleware/auth");
const Agent = require("../models/Agent");
const DistributedList = require("../models/DistributedList");

const router = express.Router();

// Setup multer for file upload
const upload = multer({ dest: "uploads/" });

// POST /api/upload
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });
    if (!req.file) return res.status(400).json({ message: "File is required" });

    let items = [];

    // Determine file type
    const ext = req.file.originalname.split(".").pop().toLowerCase();
    if (ext === "csv") {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) =>
          items.push({
            firstName: data.FirstName || data.firstname || "",
            phone: data.Phone || data.phone || "",
            notes: data.Notes || data.notes || "",
          })
        )
        .on("end", async () => {
          await distributeItems(items, res);
          fs.unlinkSync(req.file.path); // remove file
        });
    } else if (ext === "xlsx" || ext === "xls") {
      const workbook = xlsx.readFile(req.file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      items = xlsx.utils.sheet_to_json(sheet).map((row) => ({
        firstName: row.FirstName || row.firstname || "",
        phone: row.Phone || row.phone || "",
        notes: row.Notes || row.notes || "",
      }));
      await distributeItems(items, res);
      fs.unlinkSync(req.file.path);
    } else {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Invalid file type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Helper function to distribute items
async function distributeItems(items, res) {
  const agents = await Agent.find();
  if (agents.length < 1)
    return res.status(400).json({ message: "No agents found" });

  // Clear old distributions
  await DistributedList.deleteMany({});

  const distribution = {};
  agents.forEach((agent) => (distribution[agent._id] = []));

  let i = 0;
  items.forEach((item) => {
    const agentId = agents[i % agents.length]._id;
    distribution[agentId].push(item);
    i++;
  });

  // Save distributed lists
  const savedLists = [];
  for (const agentId in distribution) {
    const list = new DistributedList({
      agent: agentId,
      items: distribution[agentId],
    });
    await list.save();
    savedLists.push(list);
  }

  res.json({
    message: "File distributed successfully",
    distribution: savedLists,
  });
}

module.exports = router;
