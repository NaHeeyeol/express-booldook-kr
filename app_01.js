const express = require("express")
const app = express()
const QRCode = require("qrcode")
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

app.use("/", express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static(path.join(__dirname, "storages")))

app.get("/", function (req, res) {
  res.send("<h1>HOME</h1>")
})

app.get("/qrcode", function (req, res) {

  const query = req.query.url

  QRCode.toDataURL(query, function (err, url) {
      console.log(url)
      const base64Image = url.split(";base64,").pop()

      sharp(Buffer.from(base64Image, "base64")).toFile(path.join(__dirname, "storages", "output.png"), (err, info) => {
        if (err) {
          console.error(err)
        }
        else {
          console.log(info)
          res.send(`<img src="/uploads/output.png" alt="HH">`)
        }
      })
    })
})

app.get("/html", function (req, res) {

  const html = `
  <html>
    <head>Head</head>
    <body>
      <h1>BODY</h1>
    </body>
  </html>
  `

  res.send(html)
})

app.listen(3000, () => console.log("http://localhost:3000"))
