const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const { Schema } = mongoose;

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URI = 'your_mongodb_connection_string';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sessionSchema = new Schema({
  prompt: String,
  response: String,
});

const Session = mongoose.model('Session', sessionSchema);

app.post('/api/generate-response', async (req, res) => {
  const { model, prompt } = req.body;
  const OPENAI_API_KEY = 'your_openai_api_key';
  const OPENAI_API_URL = 'https://api.openai.com/v1/engines/';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  try {
    const response = await axios.post(
      `${OPENAI_API_URL}${model}/completions`,
      { prompt, max_tokens: 50, n: 1, stop: null, temperature: 1 },
      { headers }
    );

    const generatedText = response.data.choices[0].text.trim();
    res.json(generatedText);
  } catch (error) {
    res.status(500).json({ error: 'Error generating response' });
  }
});

app.post('/api/save-session', async (req, res) => {
  const { prompt, response } = req.body;

  try {
    const session = new Session({ prompt, response });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error saving session' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
   
