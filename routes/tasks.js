const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create Task
router.post("/", authMiddleware, (req, res) => {
    const { title, description } = req.body;
    const sql = "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)";
    db.query(sql, [req.user.id, title, description], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.status(201).json({ message: "Task added successfully" });
    });
});

// Get Tasks
router.get("/", authMiddleware, (req, res) => {
    const sql = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(sql, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(results);
    });
});

// Update Task
router.put("/:id", authMiddleware, (req, res) => {
    const { title, description, completed } = req.body;
    const sql = "UPDATE tasks SET title=?, description=?, completed=? WHERE id=?";
    db.query(sql, [title, description, completed, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json({ message: "Task updated successfully" });
    });
});

// Delete Task
router.delete("/:id", authMiddleware, (req, res) => {
    const sql = "DELETE FROM tasks WHERE id=?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json({ message: "Task deleted successfully" });
    });
});

module.exports = router;
