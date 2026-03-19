const express = require("express")
const path = require("path")
const serveIndex = require("serve-index")

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, "public")))

app.use(
    "/songs",
    express.static(path.join(__dirname, "songs")),
    serveIndex(path.join(__dirname, "songs"), { icons: true })
)
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send("User-agent: *\nAllow: /");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
