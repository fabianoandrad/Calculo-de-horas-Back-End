const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function validateProjectId(req, res, next) {
   const {id} = req.params

   if(!isUuid(id)){
       return res.status(400).json({error: 'Invalid project ID'})
   }

   return next()
}

// mostra todos os resultados
app.get("/projects", (req, res) => {

   return res.json(projects);
});

app.post("/projects", (req, res) => {

  const { hourIn, minIn, hourOut, minOut } = req.body;

  let valueSumMin = parseInt(minIn) + parseInt(minOut)
  let valueSumHour = parseInt(hourOut) - parseInt(hourIn)

  if (valueSumMin >= 60){
    valueSumMin = valueSumMin - 60
    valueSumHour = valueSumHour + 1
    
  }


 
 
  const project = { id: uuid(), valueSumHour, valueSumMin };

  projects.push(project);

 return res.json(project);
});


app.listen(3333, () => {
  console.log("✈ Back-end started");
});
