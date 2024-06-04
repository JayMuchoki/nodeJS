const { v4: uuidv4 } = require('uuid');
const {format}= require('date-fns')

const fs=require('fs')
const fspromise=require('fs').promises
const path=require('path')


const LogEvents=async(message) =>{
   const datetime=`${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
   const logItem=`${uuidv4()}\t${datetime}\t${message}\n`
   console.log(logItem)

   try {
    if(!fs.existsSync(path.join(__dirname,'logfolder'))){
        await fspromise.mkdir(path.join(__dirname,'logfolder'))
    }
    await fspromise.appendFile(path.join(__dirname,'logfolder','eventLogs.txt'),logItem)
    
   } catch (error) {
    console.log(`err`);
    
   }
}
module.exports=LogEvents