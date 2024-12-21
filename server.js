const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 3000;

// Serve static files (your frontend)
app.use(express.static("public"));

// Endpoint to search for meals
app.get("/api/search", async (req, res) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.status(400).send("Query parameter 'q' is required.");
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    );
    const data = await response.json();

    if (data.meals) {
      res.json(data.meals);
    } else {
      res.status(404).json({ message: "No meals found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
