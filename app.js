const fs = require("fs");
const express = require("express");
const app = express();
app.listen(3000);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send(`Initial page`);
});

app.get("/all-data", (req, res) => {
  fs.readFile("data.json", (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    } else {
      const response = JSON.parse(data);
      return res.status(200).send(response);
    }
  });
});

app.post("/new-data", (req, res) => {
  try {
    const previousData = fs.readFileSync("data.json");
    let data = JSON.parse(previousData);
    data.push(req.body);
    fs.writeFile("data.json", JSON.stringify(data), (error) => {
      if (error) {
        return res.status(500).send("Error writing to file");
      }
      res.status(201).send("Data created successfully");
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.delete("/delete-data/:id", (req, res) => {
  try {
    const id = req.params.id;
    const previousData = fs.readFileSync("data.json");
    let data = JSON.parse(previousData);

    const updatedData = data.filter((element) => element.id != id);
    if (updatedData.length === data.length) {
      return res.status(404).send("Data not found");
    }

    fs.writeFile("data.json", JSON.stringify(updatedData), (error) => {
      if (error) {
        return res.status(500).send("Error deleting data");
      }
      res.status(200).send("Data deleted successfully");
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.put("/update-data/:id", (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const previousData = fs.readFileSync("data.json");
    let data = JSON.parse(previousData);

    const index = data.findIndex((element) => element.id == id);
    if (index === -1) {
      return res.status(404).send("Data not found");
    }

    data[index] = newData;

    fs.writeFile("data.json", JSON.stringify(data), (error) => {
      if (error) {
        return res.status(500).send("Error updating data");
      }
      res.status(200).send("Data updated successfully");
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
