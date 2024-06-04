const Task = require('../Models/task');

//Create a Task
exports.create = async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false
    });

    try {
        const data = await task.save();
        res.send({
            message: "Task created successfully!!",
            task: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the task."
        });
    }
};

//Read all Tasks
exports.findAll = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//
exports.findOne = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Update a Task
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    try {
        const data = await Task.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });
        if (!data) {
            return res.status(404).send({
                message: `Task not found.`
            });
        }
        res.send({ message: "Task updated successfully." });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

//Delete a Task
exports.destroy = async (req, res) => {
    try {
        const data = await Task.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).send({
                message: `Task not found.`
            });
        }
        res.send({
            message: "Task deleted successfully!"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};
