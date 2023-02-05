const express = require("express");
const app = express();
const {fileGenerator} = require("./fileGenerator")
const {fileRunner} = require("./fileRunner")
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req,res)=>{
    return res.json({data: "online compiler"})
})

app.post("/run", async (req,res)=>{
    
    const {language = "cpp", code} = req.body;

    if(code === undefined){
        return res.status(400).json({success: false, error: "Empty code body!"})
    }

    try{  
        const filepath = await fileGenerator(language, code);
        const output = await fileRunner(filepath)
        return res.json({filepath , output})

    }catch(error){
        res.status(500).json({error})
    }

})

app.listen(5000, ()=>{
    console.log(`Listening on port 5000`)
})