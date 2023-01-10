const mongoose = require("mongoose");
const Place = require("../models/Place.model");
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

const places = [
  {
    name: "Neue Nationalgalerie",
    address: "Potsdamer Straße 50",
    zipCode: "10785",
    description:
      "The fabulous collection of early-20th-century art housed at the Neue Nationalgalerie is off view until renovations of the gallery, led by architect David Chipperfield, are completed (anticipated by the end of 2020). The building itself is a late masterpiece by Ludwig Mies van der Rohe. All glass and steel and squatting on a raised platform, it echoes a postmodern Buddhist temple.",
    category: "Art",
  },
  {
    name: "Zoo Berlin",
    address: "Hardenbergplatz 8",
    zipCode: "10787",
    description:
      "Berlin's zoo holds a triple record as Germany's oldest (since 1844), most species-rich and most popular animal park. Top billing at the moment goes to a pair of bamboo-devouring pandas on loan from China. The menagerie includes nearly 20,000 critters representing 1500 species, including orangutans, rhinos, giraffes and penguins. Public feeding sessions take place throughout the day – check the schedule online and by the ticket counter.",
    category: "kid-friendly",
  },
];

mongoose
.connect(MONGO_URI)
.then((x)=> console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.then(()=> Place.create(places))
.then((placesSeeded)=>console.log(placesSeeded))
.then(()=>{
  mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
})
.catch((err) => {
  console.error("Error connecting to mongo: ", err);
});
  