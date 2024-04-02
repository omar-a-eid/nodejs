class FlightTicket {
  constructor(seatNum, flightNum, departure, arrival, date) {
    this.seatNum = seatNum;
    this.flightNum = flightNum;
    this.departure = departure;
    this.arrival = arrival;
    this.date = date;
  }

  display() {
    return `Seat Number: ${this.seatNum}\nFlight Number: ${this.flightNum}\nDeparture: ${this.departure}\nArrival: ${this.arrival}\nDate: ${this.date}\n`;
  }

  get() {
    return {
      seatNum: this.seatNum,
      flightNum: this.flightNum,
      departure: this.departure,
      arrival: this.arrival,
      date: this.date,
    };
  }

  update(info) {
    Object.assign(this, info);
  }
}

module.exports = FlightTicket;
