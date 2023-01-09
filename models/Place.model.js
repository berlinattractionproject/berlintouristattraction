const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const placeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    zipCode: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Place = model("Place", placeSchema);

module.exports = Place;