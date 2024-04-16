const express = require("express")
const app = express()

app.use("/", express.static("public"))

app.set("view engine", "ejs")
app.set("views", "./views")


app.get("/test", (req, res) => {
  res.send("TEST")
})


app.get("/ejs", (req, res) => {
  const datas = [
    { id: 1, name: "홍길동" },
    { id: 2, name: "홍길만" },
    { id: 3, name: "홍길순" },
    { id: 4, name: "홍길이" },
  ]
  res.render("home/home.ejs", { datas })
})


app.listen(8088, () => console.log("Listening on 8080"))
