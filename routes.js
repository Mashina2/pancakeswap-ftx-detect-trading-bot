const axios = require("axios");
const FtxClient = require("./api/ClientInst");

module.exports = (app) => {
  var router = require("express").Router();
  const ftxClient = new FtxClient("apiKey", "apiSecretKey", "subaccount");

  router.get("/bnb_perp", async (req, res) => {
    var data = await axios.get("https://ftx.com/api/markets/BNB-PERP");
    res.send(data.data);
  });

  router.get("/bnb_buy", async (req, res) => {
    const quote_request = await ftxClient.requestQuote({
      fromCoin: "USD",
      toCoin: "BNB",
      size: 0.5,
    });

    console.log(quote_request);

    const quote_state = await ftxClient.getQuoteStatus(
      quote_request.result.quoteId
    );

    console.log(quote_state);

    const convert_state = await ftxClient.acceptQuote(
      quote_request.result.quoteId
    );

    console.log(convert_state.success);
    res.send(convert_state.success);
  });

  router.get("/bnb_sell", async (req, res) => {
    const quote_request = await ftxClient.requestQuote({
      fromCoin: "BNB",
      toCoin: "USD",
      size: 0.5,
    });

    console.log(quote_request);

    const quote_state = await ftxClient.getQuoteStatus(
      quote_request.result.quoteId
    );

    console.log(quote_state);

    const convert_state = await ftxClient.acceptQuote(
      quote_request.result.quoteId
    );

    console.log(convert_state.success);
    res.send(convert_state.success);
  });

  app.use("", router);
};
