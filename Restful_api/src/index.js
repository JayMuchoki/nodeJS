const express = require("express");

const router=require('./routes/EventsRoutes')
const cookieParser=require('cookie-parser')

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(router)



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});