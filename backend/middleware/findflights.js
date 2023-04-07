const schedule = require("../../database/schemas/schedule.js");
//////need to complete this once the database is ready
const findflights = async (req, res, next) => {
  const trip = req.params.trip;
  if (trip === "one-way") {
    const source = req.params.source.replace("%20", " ");
    const destination = req.params.destination.replace("%20", " ");
    const date = req.params.date;
    const type = req.params.type;
    const seats = req.params.seats;
    const dats = [];
    try {
      const day = await schedule.findOne({ date: date });
      const dayflights = day.flights;
      const flightsfromto = dayflights.filter((flight) => {
        return flight.source === source && flight.destination === destination;
      });
      const availableflights = flightsfromto.map((flight) => {
        if (flight.totalseats[type] - flight.seatsbooked[type] >= seats) {
          return { flight: flight, type: type, seats: seats };
        } else {
          return undefined;
        }
      });
      console.log(availableflights);
      const flights = availableflights.filter((flight) => {
        return flight !== undefined;
      });
      /*if (availableflights.length === 0) {
      const i = 0;
      var j = await schedule.findOne({ date: date });
      var dat = new Date(date);
      while (j.length !== 0) {
        dat.setDate(dat.getDate() + 1);
        console.log(dat.toISOString().split("T")[0]);
        j = await schedule.findOne({ date: dat.toISOString().split("T")[0] });
        if (j.length !== 0) {
          const dayflights = j.flights;
          const flightsfromto = dayflights.filter((flight) => {
            return (
              flight.source === source && flight.destination === destination
            );
          });
          const availableflights = flightsfromto.filter((flight) => {
            return flight.totalseats[type] - flight.seatsbooked[type] >= seats;
          });
          if (availableflights.length !== 0) {
            dats.push(j.date);
          }
        }
      }
      if (dats.length === 0) {
        res
          .status(200)
          .json({ message: false, availableflights: "No flights available" });
      } else {
        res.status(200).json({
          message: false,
          availableflights: "No flights available on the selected date",
          availabledates: dats,
        });
      }
    }*/
      res.status(200).json({ type: 0, flight1: flights });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    const source = req.params.source.replace("%20", " ");
    const destination = req.params.destination.replace("%20", " ");
    const date1 = req.params.date1;
    const date2 = req.params.date2;
    const type = req.params.type;
    const seats = req.params.seats;
    const dats = [];
    try {
      const day1 = await schedule.findOne({ date: date1 });
      const dayflights1 = day1.flights;
      const flightsfromto1 = dayflights1.filter((flight) => {
        return flight.source === source && flight.destination === destination;
      });
      const availableflights1 = flightsfromto1.map((flight) => {
        if (flight.totalseats[type] - flight.seatsbooked[type] >= seats) {
          return { flight: flight, type: type, seats: seats };
        }
      });
      const day2 = await schedule.findOne({ date: date2 });
      const dayflights2 = day2.flights;
      const flightsfromto2 = dayflights2.filter((flight) => {
        return flight.source === destination && flight.destination === source;
      });
      const availableflights2 = flightsfromto2.map((flight) => {
        if (flight.totalseats[type] - flight.seatsbooked[type] >= seats) {
          return { flight: flight, type: type, seats: seats };
        }
      });
      const flights1 = availableflights1.filter((flight) => {
        return flight !== undefined;
      });
      const flights2 = availableflights2.filter((flight) => {
        return flight !== undefined;
      });

      res.status(200).json({
        type: 1,
        flight1: flights1,
        flight2: flights2,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = findflights;
