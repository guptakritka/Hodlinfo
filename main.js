const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const path = require('path');
const Price = require("./models/user");
require("dotenv").config();
const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
const port = process.env.port || 3000;

mongoose.connect(process.env.db_uri)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });

    app.get('/', async (req, res) => {
      try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const data = response.data;
        const Alldata = Object.values(data);
        const top10Results = Alldata.slice(0, 10).map(tickerdata => ({
          name: tickerdata.name,
          last: tickerdata.last,
          buy: tickerdata.buy,
          sell: tickerdata.sell,
          volume: tickerdata.volume,
          base_unit: tickerdata.base_unit,
          
        }));
    
        await Price.insertMany(top10Results);
        res.render('home', { top10Results });
      } catch (error) {
        console.error('Error fetching or storing data:', error);
        res.status(500).send('Internal server error.');
      }
    });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
