const { readFile } = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

process.on('uncaughtException', err => {
    console.log(`There was an uncaught exception: ${err}`);
    process.exit(1);
});

async function readdata() {
    try {
        const data = await fsPromise.readFile(path.join(__dirname, 'lorem.txt'), { encoding: 'utf8' });
        console.log("Read Data: ", data);
        return data;
    } catch (error) {
        throw error;
    }
}

async function writedata() {
    try {
      const data=  await fsPromise.writeFile(
            path.join(__dirname, "lorem.txt"),
            "I have been overwritten 😂😂", { encoding: 'utf8' }
        );
        console.log("Written Data: I have been overwritten 😂😂");
    } catch (error) {
        throw error;
    }
}

async function appenddata() {
    try {
      const data=  await fsPromise.appendFile(
            path.join(__dirname, "lorem.txt"),
            "\n\nI have data in new line 😊😊",
            { encoding: 'utf-8' }
        );
        console.log("Appended Data: \n\nI have data in new line 😊😊");
    } catch (error) {
        throw error;
    }
}

async function renamefile() {
    try {
       const data= await fsPromise.rename(
            path.join(__dirname, "lorem.txt"),
            path.join(__dirname, "jay.txt"),
        );
        console.log("File renamed to jay.txt");
    } catch (error) {
        throw error;
    }
}


readdata()
.then(writedata)
.then(appenddata)
.then(readdata)
.then(renamefile)

