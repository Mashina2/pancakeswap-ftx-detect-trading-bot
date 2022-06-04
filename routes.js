const axios = require("axios");

module.exports = (app) => {
  var router = require("express").Router();

  router.get("/bnb_perp", async (req, res) => {
    var data = await axios.get("https://ftx.com/api/markets/BNB-PERP");
    res.send(data.data);
  });

  router.get("/bnb_buy", async (req, res) => {
    var data = await axios.post("https://ftx.com/api/otc/quotes", {
      fromCoin: "BTC",
      toCoin: "USD",
      size: 0.05,
    });
    // console.log(data);
    res.send(data);
  });

  app.use("", router);
};
