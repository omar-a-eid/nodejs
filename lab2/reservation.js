const FlightTicket = require("./modules/flightTicketModule.js");

//seatNum, flightNum, departure, arrival, date
const ticket1 = new FlightTicket(
  10,
  123456789,
  "Cairo EG",
  "Berlin EG",
  "2001-6-16"
);

const ticket2 = new FlightTicket(
  90,
  112324545,
  "Alexandria EG",
  "Berlin EG",
  "2024-7-17"
);

console.log(ticket1.get());
console.log(ticket2.get());

ticket2.update({
  seatNum: 90,
  flightNum: 112324545,
  departure: "Alexandria EG",
  arrival: "Berlin GER",
  date: "2024-8-18",
});
console.log(ticket2.get());

console.log(ticket1.display());
console.log(ticket2.display());
