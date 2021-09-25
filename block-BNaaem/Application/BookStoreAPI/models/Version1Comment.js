var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Version1User',
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Version1Book',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Version1Comment', commentSchema);
