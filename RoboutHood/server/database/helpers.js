import axios from 'axios';
// const axios = require('axios');
import Stock from './models/stocks.js';

// interface Stock {
//   _id: String;
//   record: Boolean;
// }
// const Stock = require('./models/stocks.js');
let getAllAdvice = async (req, res) => {
    try {
      const response = await Stock.find();
      res.status(200).json(response);
      res.end();
    } catch (err) {
      res.status(500).send({ err });
    }
};

let addAdvice = async (req, res) => {
    try {
      let str = req.body.search[0].text;

      const tickerIndex = str.indexOf("Ticker:");
      const explanationIndex = str.indexOf("Explanation for Recommendation:");

      const companyName = str.substring(16, tickerIndex).trim();
      const stockTicker = str.substring(tickerIndex + 8, explanationIndex).trim();
      const explanation = str.substring(explanationIndex + 31).trim();

      const addStock = new Stock (
        {
          ticker: req.body.ticker,
          industry: req.body.industry,
          price: req.body.price,
          recommendStock: companyName,
          recommendTicker: stockTicker,
          recommendExplanation: explanation,
          reasoning: req.body.search[0].text,
          record: false,
        }
      );
      await addStock.save();
      res.status(201).json({
        name: companyName
      });
    } catch (error) {
      res.status(500).send({ error });
    }
};


let favoriteAdvice = async (req, res) => {
  try {
    const current = await Stock.findOne(
      {
        _id: req.body._id
      }
    );
    const recordStatus = current.record;
    const updated = await Stock.findOneAndUpdate(
      {_id: req.body._id},
      [{$set:
        {record:{$eq:[false,"$record"]}}
      }]
    );

    console.log(current, 'line 50 helpers');
    // const current2 = await Stock.findOne(
    //   {
    //     _id: req.body._id
    //   }
    // );
    res.status(200).send(!recordStatus)
  } catch (error) {
    res.status(500).send({ error });
  }
};

export { getAllAdvice, addAdvice, favoriteAdvice };
// module.exports = {
//   getAllStocks : async (req, res) => {
//     try {
//       const response = await Stock.find();
//       res.status(200).send(response);
//       res.end();
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ err });
//     }
//   },
//   addStock : async (req, res) => {
//     try {
//       // const addStock = new Stock (

//       // );
//     } catch (err) {

//     }
//   }
// }