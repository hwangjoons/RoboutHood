import axios from 'axios';
// const axios = require('axios');
import Stock from './models/stocks.js';

// const Stock = require('./models/stocks.js');
let getAllStocks = async (req, res) => {
    try {
      const response = await Stock.find();
      res.status(200).send(response);
      res.end();
    } catch (err) {
      console.log(err);
      res.status(500).send({ err });
    }
};

let addStock = async (req, res) => {
  // console.log(req, 'in helpers');
    try {
      // console.log(req.body, 'in helpers');
      // console.log(req.body.search[0].text, req.body.ticker, req.body.industry, req.body.price);

      let str = req.body.search[0].text;

      const tickerIndex = str.indexOf("Ticker:");
      const explanationIndex = str.indexOf("Explanation for Recommendation:");

      const companyName = str.substring(16, tickerIndex).trim();
      const stockTicker = str.substring(tickerIndex + 8, explanationIndex).trim();
      const explanation = str.substring(explanationIndex + 31).trim();

      console.log('1', companyName, '2', stockTicker, '3', explanation, '123');
      // while (i <= req.body.search[0].text.length) {
      //   let str = req.body.search[0].text;
      //   let currLetter = req.body.search[0].text[i];
      //   let nextLetter = req.body.search[0].text[i + 1];
      //   console.log('inside while loop', str, currLetter, nextLetter, i);

      //   if (currLetter === '\\' && nextLetter === 'n') {
      //     if (str.slice(i + 2, i + 15) === 'Name of Stock: ') {
      //       let start = i + 16;
      //       console.log(start, 'start letter');
      //       while (str[start] !== '\\') {
      //         console.log('l36', companyName, str[start]);
      //         companyName = companyName + str[start];
      //         start++;
      //       }
      //     }
      //   }
      //   i++;
      // }

      console.log('1', companyName, 'line 39 of helpers');
      const addStock = new Stock (
        {
          ticker: req.body.ticker,
          industry: req.body.industry,
          price: req.body.price,
          recommendStock: companyName,
          recommendTicker: stockTicker,
          recommendExplanation: explanation,
          reasoning: req.body.search[0].text,
        }
      );
      await addStock.save();
      res.status(201).send('Stock has saved');
    } catch (err) {
      console.log(err);
    }
};

export { getAllStocks, addStock };
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