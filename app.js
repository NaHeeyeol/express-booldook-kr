const express = require("express")
const app = express()
const helmet = require("helmet")
const cors = require("cors")

const { absPath, relPath } = require("./modules/util")


const method = require("./middlewares/method-mw")
const uploader = require("./middlewares/multer-mw")
const afterUploader = require("./middlewares/after-multer-mw")
const path = require("path")
const QRCode = require("qrcode")
const sharp = require("sharp")

app.use(helmet({ contentSecurityPolicy: false }))
app.use("/", express.static("public"))
app.use("/uploads", express.static("storages"))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(method())


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

app.get("/view", (req, res) => {
  res.render("qr/show.ejs", { img: req.query.img })
})

app.post("/api/uploader",
  uploader.fields([{ name: "img" }]), afterUploader(["img"]),
  async (req, res, next) => {
    // TODO :: QR

    try {

      console.log("===")
      console.log(relPath(req.files[0].filename))
      const html = "http://localhost:3000/view?img=" + relPath(req.files[0].filename)
      QRCode.toDataURL(html, function (err, url) {
        console.log(url)
        const base64Image = url.split(";base64,").pop()

        sharp(Buffer.from(base64Image, "base64")).toFile(path.join(__dirname, "storages/qr", req.files[0].filename), (err, info) => {
          if (err) {
            console.error(err)
          }
          else {
            console.log(info)
            res.send(`<img src="/uploads/qr/${req.files[0].filename}" alt="QR">`)
          }
        })
      })


      // req.files[0]
      // res.status(200).json({
      //   data:
      // })
      // if (req.body.type === "update") {
      //   await Board.update(req.body, { where: { id: req.body.id } })
      //   req.files.forEach((file) => (file.board_id = req.body.id))
      //   const files = await BoardFile.bulkCreate(req.files)
      //   // res.json({ file: req.files, req: req.body, locals: res.locals });
      //   res.redirect(res.locals.goList)
      // }
      // else {
      //   req.body.user_id = req.user.id
      //   req.body.binit_id = res.locals.boardId
      //   const board = await Board.create(req.body)
      //   req.files.forEach((file) => (file.board_id = board.id))
      //   const files = await BoardFile.bulkCreate(req.files)
      //   res.redirect("/admin/board?boardId=" + res.locals.boardId)
      // }
    }
    catch (err) {
      next(createError(err))
    }
  },
)


app.listen(8080, () => console.log("Listening on 8080"))
