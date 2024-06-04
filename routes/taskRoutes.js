const express = require('express');
const TaskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', TaskController.findAll);
router.get('/:id', TaskController.findOne);
router.post('/', TaskController.create);
router.patch('/:id', TaskController.update);
router.delete('/:id', TaskController.destroy);

module.exports = router;
