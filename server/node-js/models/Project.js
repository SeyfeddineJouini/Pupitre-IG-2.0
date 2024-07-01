const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  files: [
    {
      name: { type: String, required: true },
      path: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('Project', ProjectSchema);
