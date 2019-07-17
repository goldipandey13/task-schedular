var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  subtasks: [{
    title: {
      type: String,
      required: false
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    }
  }],
  is_active: {
    type: Boolean,
    required: true,
    default: true
  },
  taskTime: {
    type: Date
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updated_at: { type: Date, default: Date.now },
});

var task = module.exports = mongoose.model('Task', TaskSchema);
