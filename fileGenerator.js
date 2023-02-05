const fs = require("fs")
const path = require("path")
const {v4: uuid} = require("uuid")

const codesDir = path.join(__dirname, "/codes")

if(!fs.existsSync(codesDir)){
    fs.mkdirSync(codesDir, {recursive: true})
}

const fileGenerator = async(format, content)=>{
    const jobId = uuid()
    const filename = `${jobId}.${format}`
    const filepath = path.join(codesDir, filename)

    await fs.writeFileSync(filepath, content)
    return filepath
}

module.exports = {fileGenerator};