require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express(); // Initialize app first
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/send-message', async (req, res) => {
    const { message } = req.body;

    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json',
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: message,
                },
            ],
            system_prompt: '',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false,
        },
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error("API request failed:", error); // Log the entire error object
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
    
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
