const {exec} = require('child_process')
const path = require('path')
const fs = require("fs")

const outputsDir = path.join(__dirname, "/outputs")

if(!fs.existsSync(outputsDir)){
    fs.mkdirSync(outputsDir, {recursive: true})
}

const fileRunner = (filepath)=>{
    const jobId = path.basename(filepath).split(".")[0]
    const outputPath = path.join(outputsDir, `${jobId}`)

    return new Promise((resolve, reject) =>{
        exec(`g++ ${filepath} -o ${outputPath} && cd ${outputsDir} && ${jobId}.exe`, 
        (error, stdout, stderr)=>{
            if(error){
                console.log(stderr)
                reject({error, stderr})
            }
            if(stderr){
                console.log(stderr)
                reject({stderr})
            }
            
            resolve(stdout)
        }
        
        )
    })
}

module.exports = {fileRunner}