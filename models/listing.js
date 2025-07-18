const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // image: {
  //   type: String,
  //   default:
  //     "https://unsplash.com/photos/artist-working-on-a-painting-in-a-studio-IIisONUL2d8",
  //   set: (v) =>
  //     v === ""
  //       ? "https://unsplash.com/photos/artist-working-on-a-painting-in-a-studio-IIisONUL2d8"
  //       : v,
  // },
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://unsplash.com/photos/artist-working-on-a-painting-in-a-studio-IIisONUL2d8",
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
