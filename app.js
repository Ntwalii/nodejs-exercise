const fs = require("fs");
const express = require("express");
const app = express();
app.listen(3000);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/all-data", (req, res) => {
  fs.readFile("data.json", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const response = JSON.parse(data);
      res.send(response);
    }
  });
});

app.post("/new-data", (req, res) => {
  const previousData = fs.readFileSync("data.json");
  data = JSON.parse(previousData);
  data.push(req.body);
  fs.writeFile("data.json", JSON.stringify(data), (error, data) => {
    res.send("Data sent successfully");
  });
});

app.delete("/delete-data/:id", (req, res) => {
  const id = req.params.id;
  const previousData = fs.readFileSync("data.json");
  data = JSON.parse(previousData);
  updatedData = data.filter((element) => element.id != id);
  fs.writeFile("data.json", JSON.stringify(updatedData), (error, data) => {
    res.send("Data deleted successfully");
  });
});

app.put("/update-data/:id", (req, res) => {
    const id = req.params.id;
    const newData=req.body;
    const previousData = fs.readFileSync("data.json");
    data = JSON.parse(previousData);
    data=data.filter(element=>element.id!=id)
    data.push(newData)
      fs.writeFile("data.json", JSON.stringify(data), (error, data) => {
        res.send("Data updated successfully");
      });

});
