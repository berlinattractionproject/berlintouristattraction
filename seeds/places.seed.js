const mongoose = require("mongoose");
const Place = require("../models/Place.model");
const MongoStore = require('connect-mongo');

const MONGO_URI =
  process.env.MONGODB_URI 

  console.log(MONGO_URI)
const places = [
  {
    name: "Neue Nationalgalerie",
    address: "Potsdamer Straße 50",
    zipCode: "10785",
    description:
      "The fabulous collection of early-20th-century art housed at the Neue Nationalgalerie is off view until renovations of the gallery, led by architect David Chipperfield, are completed (anticipated by the end of 2020). The building itself is a late masterpiece by Ludwig Mies van der Rohe. All glass and steel and squatting on a raised platform, it echoes a postmodern Buddhist temple.",
    category: "Art",
    username: "David"
  },
  {
    name: "Zoo Berlin",
    address: "Hardenbergplatz 8",
    zipCode: "10787",
    description:
      "Berlin's zoo holds a triple record as Germany's oldest (since 1844), most species-rich and most popular animal park. Top billing at the moment goes to a pair of bamboo-devouring pandas on loan from China. The menagerie includes nearly 20,000 critters representing 1500 species, including orangutans, rhinos, giraffes and penguins. Public feeding sessions take place throughout the day – check the schedule online and by the ticket counter.",
    category: "kid-friendly",
    username: "David"
  },
  {
    name: "Tempelhofer Feld",
    address: "Tempelhofer Damm",
    zipCode: "12101",
    description:
      "Tempelhofer Feld embodies Berlin’s bohemian spirit – when the airfield here closed in 2008, Berliners fought to keep all 890 acres (360 hectares) for the public instead of commerce and housing. After a referendum, the dream came true and Berlin’s largest park has been relished by the masses ever since.",
    category: "Outdoor",
    username: "David"
  },
  {
    name: "KW Institute for Contemporary Art",
    address: "Auguststraße 69",
    zipCode: "10117",
    description:
      "The KW Institute for Contemporary Art (also known as Kunst-Werke) is a contemporary art institution located in Auguststraße 69 in Berlin-Mitte, Germany. Klaus Biesenbach was the founding director of KW; the current director is Krist Gruijthuijsen.",
    category: "Art",
    username: "David"
  },
  {
    name: "Weißensee Jewish cemetery",
    address: "Herbert-Baum-Straße 45",
    zipCode: "13088",
    description:
      "The Jewish Cemetery in Weißensee is the largest in Europe. It is a fascinating place full of history, and full of stories.",
    category: "History",
    username: "David"
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
  