require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('<h1>Welcome to job Portal application</h1>');
});
app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
}); 