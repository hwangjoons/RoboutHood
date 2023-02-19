// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/stocks';

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

db
  .then(db => console.log(`Connected to: ${mongoURI}`))
  .catch(err => {
    console.log(`There was an error connecting to mongo at : ${mongoURI}`);
    console.log(err);
  });

export default db;
// module.exports = db;