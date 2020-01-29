const express = require("express");
const router = express.Router();
const locationContent = require("../models/locations.json");
const locationFileName = __dirname + "/../models/locations.json";
const productFileName = __dirname + "/../models/inventory.json";
const productInfo = require("../models/inventory.json");
const json_helper = require("../helper/json_helper");

router.get("/content", (request, response) => {
  response.send(locationContent);
});

router.post("/content", (request, response) => {
  if (request.body) {
    locationContent.push(request.body);
  }
  json_helper.writeJson(locationFileName, locationContent);
  response.send(locationContent);
});

router.delete("/content", (request, response) => {
  let location = undefined;
  productInfo.map((element, index) => {
    if (element.id === request.body.id && location === undefined) {
      location = index;
    }
  });

  productInfo.splice(location, 1);
  json_helper.writeJson(productFileName, productInfo);
  response.send(productInfo);
});

router.get("/productInfo", (request, response) => {
  response.send(productInfo);
});

module.exports = router;
