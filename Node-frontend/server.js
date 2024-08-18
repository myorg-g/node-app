const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const API_URL = process.env.API_URL; // API base URL from environment variables

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Forward registration requests to the correct API endpoint
app.post('/register', async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/users`, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Registration Error:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.code === 11000) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Server error' });
        }
    }
});

// Forward login requests to the correct API endpoint
app.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/login`, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Login Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Server error' });
    }
});

// Forward forgot passcode requests to the correct API endpoint
app.post('/forgot-passcode', async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-passcode`, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Forgot Passcode Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Server error' });
    }
});

// Forward reset passcode requests to the correct API endpoint
app.post('/reset-passcode/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const response = await axios.post(`${API_URL}/reset-passcode/${token}`, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Reset Passcode Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
