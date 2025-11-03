const mongoose = require("mongoose");
const Review = require("./reviews.js");
const { types } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // image: {
  //   type: String,
  // default:
  //   "https://unsplash.com/photos/artist-working-on-a-painting-in-a-studio-IIisONUL2d8",
  // set: (v) =>
  //   v === ""
  //     ? "https://unsplash.com/photos/artist-working-on-a-painting-in-a-studio-IIisONUL2d8"
  //     : v,
  // },
  // image: {
  //   filename: String,
  //   url: {
  //     type: String,
  //     default:
  //       "https://unsplash.com/photos/artist-working-on-a-painting-in-a-studio-IIisONUL2d8",
  //   },
  // },
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
          : v,
    },
  },

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
