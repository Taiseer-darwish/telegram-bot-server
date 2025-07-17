require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
require('dotenv').config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const FIXED_CODE = '889797';

app.post('/send-code', async (req, res) => {
  const { chatId } = req.body;

  if (!chatId) return res.status(400).send('chatId is required');

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: `كود الدفع الخاص بك هو: ${FIXED_CODE}`
    });

    res.send('Message sent!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Failed to send message');
  }
});

app.get('/', (req, res) => {
  res.send('Telegram Bot Server is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
