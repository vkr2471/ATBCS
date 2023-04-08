const mongoose = require("mongoose");
const scheduleschema = mongoose.Schema({
  date: {
    type: String,
    required: [true, "date must be provided"],
  },
  flights: [
    {
      flightid: {
        type: String,
        required: [true, "flightid must be provided"],
      },
      source: {
        type: String,
        required: [true, "source must be provided"],
      },
      destination: {
        type: String,
        required: [true, "destination must be provided"],
      },
      departure: {
        type: String,
        required: [true, "departure must be provided"],
      },
      arrival: {
        type: String,
        required: [true, "arrival must be provided"],
      },
      totalseats: {
        fc: {
          type: Number,
        },
        bc: {
          type: Number,
        },
        ec: {
          type: Number,
        },
      },
      seatsbooked: {
        fc: {
          type: Number,
          default: 0,
        },
        bc: {
          type: Number,
          default: 0,
        },
        ec: {
          type: Number,
          default: 0,
        },
      },
      ticketfare: {
        fc: {
          type: Number,
        },
        bc: {
          type: Number,
        },
        ec: {
          type: Number,
        },
      },
    },
  ],
});

module.exports = mongoose.model("scheduled", scheduleschema);
