require('dotenv').config();

const express=require("express")
const {connect}=require("./connection")
const puppeteer = require('puppeteer');
const router=require("./Router/router")
const cookierparser=require("cookie-parser")
const {restrictonlylogin}=require("./middleware/auth")
const mongoose=require("mongoose")
const userurl=require("./models/userdata")
const { parse } = require('json2csv');
const cors=require('cors')
const app=express()
const PORT=process.env.PORT||4444

connect(process.env.MONGO_URL).then(()=>{
    console.log("backend connected")})
    app.use(cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173', 

        methods: 'GET,POST',
        allowedHeaders: ['Content-Type'], 
        credentials:true
      }));

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookierparser())


app.use("/signup",router)

app.post("/load", async (req, res) => {
    console.log("Received URL:", req.body.url);

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--disable-http2'], 
            ignoreHTTPSErrors: true, 
        });

        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        );

        await page.goto(req.body.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        const html = await page.content();

        res.send(html);
    } catch (error) {
        console.error("Error loading URL:", error.message);
        res.status(500).send({ error: "Failed to load the URL" });
    } finally {
        if (browser) await browser.close();
    }
});


app.post("/post", (restrictonlylogin), async (req, res) => {
    const body = req.body;
    const userId = req.user._id;

    const user = await userurl.findOne({ dataset_name: body.dataset_name });

    if (user) {
        user.rows.push(body.rows);

        await user.save();

        res.json(user);
    } else {
        const user1 = await userurl.create({
            created_by: userId,
            dataset_name: body.dataset_name,
            rows: [body.rows]  
        });

        console.log(user1);
        res.json(user1);
    }
});

app.get("/get/:dataset_name",restrictonlylogin,async(req,res)=>{
    const dataset_names = req.params.dataset_name;

    const userData = await userurl.findOne({ dataset_name: dataset_names ,created_by:req.user._id});
    
   
  console.log(userData)
    const csv = parse(userData.rows);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${dataset_names}.csv`);
res.send(csv);

})


app.listen(PORT , ()=>{
    console.log("Server started")
})
