import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Serve the main page (first load shows one secret)
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/random");
    res.render("index.ejs", {
      secret: response.data.secret,
      user: response.data.username,
    });
  } catch (error) {
    res.render("index.ejs", {
      secret: "There was an error. Please try again later.",
      user: "Anonymous",
    });
  }
});

// API route just to return a new random secret (for AJAX requests)
app.get("/random", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/random");
    res.json({
      secret: response.data.secret,
      user: response.data.username,
    });
  } catch (error) {
    res.json({
      secret: "There was an error fetching a new secret.",
      user: "Anonymous",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
