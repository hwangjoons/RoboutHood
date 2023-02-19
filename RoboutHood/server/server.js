import express from "express";
import cors from "cors";

import { Configuration, OpenAIApi } from "openai";

import * as dotenv from 'dotenv';
dotenv.config();

import morgan from "morgan";
import router from './routes.js';

import db from "./database/index.js";

// console.log(process.env.OPENAI_API_KEY);
const API_KEY = process.env.OPENAI_API_KEY
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/stocks', router);

app.post('/search', async (req, res) => {

  // console.log(process.env.OPENAI_API_KEY, '12console1');
  try {
    // console.log(req.body, '12console2');
    const ticker = req.body.ticker;
    const industry = req.body.industry;
    const price = req.body.price;
    let question;
    let format = 'Format your answer by dividing into two sections. Name of Stock:, Ticker:, and then Explanation  for Recommendation: '

    if (ticker && industry && price) {
      question = `Recommend me a ${industry} stock that is similar to ${ticker} with price ${price}. ${format}`
    } else if (ticker && industry) {
      question = `Recommend me a ${industry} stock that is similar to ${ticker}. ${format}`
    } else if (ticker && price) {
      question = `Recommend me a stock that is similar to ${ticker} with price ${price}. ${format}`
    } else if (industry && price) {
      question = `Recommend me a ${industry} stock with price ${price}. ${format}`
    } else if (ticker) {
      question = `Recommend me a stock that is similar to ${ticker}. ${format}`
    } else if (industry) {
      question = `Recommend me a ${industry} stock. ${format}`
    } else if (price) {
      question = `Recommend me a stock with price ${price}. ${format}`
    }

    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${question}`,
      temperature: 0.9,
      max_tokens: 250,
      user: "creator_of_robouthood1996"
    });
    console.log(result.data.choices, '69');
    res.status(200).json(result.data.choices);
  } catch (error) {
    console.log(error);
    res.status(500).send({error})
  }
})

// app.post('/searchagain', async (req, res) => {
//   try {
//     const ticker = req.body.ticker;
//     const industry = req.body.industry;
//     const price = req.body.price;
//     let question;

//     const result = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Recommend me another stock`,
//       temperate: 0.9,
//       max_tokens: 500,
//       user: "creator_of_robouthood1996"
//     });
//     console.log(result.data, '70')
//     // res.status(200).json(result.data.choices);
//   } catch (error) {
//     console.log(error);
//   }
// })

const port = 3003;
app.listen(port, () => console.log(`Server running port ${port}`));