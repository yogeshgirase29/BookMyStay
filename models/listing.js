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
        "https://res.cloudinary.com/dqhvevsha/image/upload/v1764223915/wanderlust_DEV/nqfq5pgnjmxm8d1s1ytu.jpg",
      set: (v) =>
        v === ""
          ? "https://res.cloudinary.com/dqhvevsha/image/upload/v1764223915/wanderlust_DEV/nqfq5pgnjmxm8d1s1ytu.jpg"
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
