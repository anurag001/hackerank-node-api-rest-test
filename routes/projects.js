const { ngettext } = require('mocha/lib/utils');
var data = require('../data-store');
var projects = data.getProjects();
var router = require('express').Router();

router.get("/", (req,res)=>{
  if(projects.length === 0){
    return res.status(200).send([]);
  }else{
    projects.sort(function(a,b){
      return a.id>b.id?1:-1;
    });
    return res.status(200).send(projects);
  }
});

router.get("/active", (req,res)=>{
  if(projects.length === 0){
    res.status(200).send([]);
  }else{
    let filteredProjects = projects.filter((el)=>el.isActive===true);
    filteredProjects.sort(function(a,b){
      return a.id>b.id?1:-1;
    });
    return res.status(200).send(filteredProjects);
  }
});


router.get("/:id", (req,res)=>{
  let id = req.params.id;
  if(!isNaN(parseInt(id))){
    let project = projects.find((el)=>el.id==id);
    if(project){
      return res.status(200).send(project);
    }else{
      return res.status(404).send({message:"No Project Found"});
    }
  }else{
    return res.status(404).send({message:"No Project Found"});
  }
  
});




module.exports = router;
