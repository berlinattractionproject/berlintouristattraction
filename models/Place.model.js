const { Schema, model } = require("mongoose");

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
    username:{
      type:String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Place = model("Place", placeSchema);

module.exports = Place;
