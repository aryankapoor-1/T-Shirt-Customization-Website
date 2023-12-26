import express from 'express';
import * as dotenv from 'dotenv';
import openai from 'openai';


dotenv.config();

const router = express.Router();

// Set your OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
openai.apiKey = OPENAI_API_KEY;

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.image.create({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'url', // 'url' instead of 'b64_json'
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
