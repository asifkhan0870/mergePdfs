const express = require('express')
const path=require("path");
const multer  = require('multer')

const {mergePdfs}= require('./merge');

const upload = multer({ dest: 'uploads/' })

// for serving static files



const app = express()
const port = 3000

app.use('/static',express.static('public'));

app.get('/', (req, res) => {
//   res.send('Hello World!,This is Asfi khan')

res.sendFile(path.join(__dirname,"template/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    // console.log(req.files)
    // console.log("something")
 let d= await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));

// res.redirect(`http://localhost:3000/merge.pdf}`)
    res.redirect(`http://localhost:3000/static/${d}.pdf`)

    // res.send({data : req.files})
  })

app.listen(port, () => {
  console.log(`Example app listening on port: http://localhost:${port}`)
})