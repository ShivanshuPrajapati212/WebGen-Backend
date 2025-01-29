const express = require("express")
const chat = require("./chat")
const cors = require("cors")
app = express();

app.use(express.json())
app.use(cors())

let count = 0

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt
    count++;
    console.log(`Count - ${count}, ${prompt}`)
    const result = await chat(prompt)

    res.status(200).send({"code": result})
  }
  catch {
    res.status(400).send("Some error occured")
  }
})

app.listen(2121, () => {
  console.log(`Example app listening on port 2121`)
})