const ProjectService = require('../services/db/project.service');

exports.get = (req, res) => {
  const username = req.username;
  const projectid = req.params.projectid;

  ProjectService.get(username, projectid)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({error: err.message});
      });
};

exports.create = (req, res) => {
  const username = req.username;
  console.log("USERNAME CONTROLLER " + username);
  const projectname = req.body.projectname;

  ProjectService.create(username, projectname)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({error: err.message});
      });
};

exports.delete = (req, res) => {
  const username = req.username;
  const projectid = req.params.projectid;

  ProjectService.delete(username, projectid)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({error: err.message});
      });
};

exports.update = async (req, res) => {
  const username = req.username;
  const projectid = req.params.projectid;
  const rename = req.query.rename;

  let project = null;

  if (rename == 'true') {
    const newprojectname = req.body.newprojectname;
    project = await ProjectService.rename(username, projectid, newprojectname).catch((err) => {
      res.status(400).json({error: err.message});
    });
  }

  res.status(200).json(project);
};
