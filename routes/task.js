const express = require('express');
const router = express.Router();
const passport = require('passport');

const Task = require('../models/task.js');
const User = require('../models/user.js');

// -------------------- get all tasks -------------------------//
router.get('/', function (req, res) {
    Task.find({ postedBy: req.user._id }, { is_active: 0, updated_at: 0, __v: 0 }, function (err, list) {
        if (err) {
            res.json(err);
        } else {
            res.json(list);
        }
    });
});

router.post('/', function (req, res) {

    const task = {
        title: req.body.title,
        description: req.body.description,
        postedBy: req.user._id
    }

    Task.create(task, function (err, task) {
        if (err) {
            res.json(err.message);
        }
        else {
            res.json(task);
        }
    });
});

router.post('/:id', function (req, res) {
    const task = {
        title: req.body.title,
        description: req.body.description,
        subtasks: req.body.subtasks,
        completed: req.body.completed,
        taskTime: req.body.taskTime,
        postedBy: req.user._id
    }
    Task.findByIdAndUpdate(req.params.id, task, { new: true }, function (err, updatedTask) {
        if (err) res.json(err.message);
        else {
            res.json(updatedTask);
        }
    });
});

router.get('/delete/:id', function (req, res) {
    Task.deleteOne(req.param.id, function (err) {
        if (err) res.json(err.message);
        res.json({ success: true, message: 'deleted task' });
    });
});

module.exports = router;