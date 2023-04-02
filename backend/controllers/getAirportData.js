const airportData =(req, res, next) => {
    airport.find({}).then((data) => {
      const airportdata = data.map((item) => {
        return { city: item.name, code: item.code };
      });
      res.json(airportdata);
    });
  }
  module.exports={airportData,};