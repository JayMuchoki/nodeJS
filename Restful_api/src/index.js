const express = require("express");
const fs = require("fs");
const path = require("path");
const { query, validationResult, matchedData , body, checkSchema}=require('express-validator')
const {createValidationSchema}=require('./validationschema')





const app = express();

app.use(express.json());
//creation of resolveuserbyindex middleware

const resolveUserByindex=(req,res,next) =>{
    const {body, params: {id}}  = req

    const parsedId = parseInt(id)
    if(isNaN(parsedId)) 
        return res.sendStatus(400)

    const findUserIndex = events.findIndex((user) => {
        return user.id === parsedId
    })

    if(findUserIndex === -1)
        return res.sendStatus(404)
    //Binding the findUserIndex to the req obj
    req.findUserIndex = findUserIndex
    next()
}






let events = [];
//reading file to check if it exists
fs.readFile(path.join(__dirname, "events.json"), "utf8", (err, data) => {
  //ENOENT ERROR no entry.. error when  a file or directory is not found.
  if (err && err.code !== "ENOENT") {
    return res.status(500).send({ message: "Error reading file" });
  }
 

  //check if the data is empty
  if (data) {
    try {
      events = JSON.parse(data); //converts Json string into a Javascript object: eg when you receive a json data as a string eg webserver or a file and you need to convert it into a javascript object to work with it
    } catch (error) {
      return res.status(500).send({ Message: "Error parsing JSON" });
    }
  }




  


  //posting new objects
  app.post("/api/events",
  checkSchema(createValidationSchema),
   (req, res) => {
   
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const data = matchedData(req)


     //destructure
    const { name, course } = req.body;

    //determining next id inorder to post a new event to the events

    const nextId = events.length > 0 ? events[events.length - 1].id + 1 : 1;

    const newEvent = {
      id: nextId,
      name,
      course,
    };

    events.push(newEvent);

    fs.writeFile(
      path.join(__dirname, "events.json"),
      JSON.stringify(events),
      (err) => {
        if (err) {
          return res.status(500).send({ Message: "error writing file" });
        }
        res.status(201).send(newEvent);
      }
    );
  });
  app.get("/api/events", (req, res) => {
    res.send(events);
  });
  
  app.put('/api/events/:id',resolveUserByindex, (req, res) => {
     
      const {findUserIndex}=req
      const { body } = req;
      const parsedId = parseInt(req.params.id);
  
     
      events[findUserIndex] = {id: parsedId, ...body }
      res.sendStatus(200)
  
  })
  app.patch('/api/events/:id',resolveUserByindex, (req, res) => {
   
    const {findUserIndex}=req
    const {body}=req
    events[findUserIndex] = {...events[findUserIndex], ...body}
    console.log('User updated')
    return res.sendStatus(200)
})
app.delete('/api/events/:id',resolveUserByindex, (req, res) => {
    const {findUserIndex}=req
      const { body } = req;
    const { params: {id}}  = req

   

    events.splice(findUserIndex, 1)
   
    

    fs.writeFile(
        path.join(__dirname, "events.json"),
        JSON.stringify(events),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send({ Message: "Error writing file" });
          }
          console.log("Event deleted");
          res.sendStatus(200);
        }
      );
})


});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
