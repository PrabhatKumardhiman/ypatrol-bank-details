const mongoose = require("mongoose");
const { Schema } = mongoose;

const detailsSchema = new Schema({
  user_id: 'number', // String is shorthand for {type: String}
  user_name: 'string',
  back_accounts : 'array',
  id : 'number',
  name: "string",
  accounts : 'array'
});

module.exports = mongoose.model("Details", detailsSchema);
