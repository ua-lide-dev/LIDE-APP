const Project = require('../../models/project.model');
const File = require('../../models/file.model');
const UserService = require('./user.service');

/**
 * Get a project
 *
 * @param {string} username
 * @param {string} projectid
 * @return {object} project
 *
 */
exports.get = async (username, projectid) => {
  const user = await UserService.get(username).catch((error) => {
    throw error;
  });
  const project = await Project.findById(projectid).catch((error) => {
    throw error;
  });

  if (project != null) {
    if (user.projects.includes(project._id)) return project;
    else throw new Error('Unauthorized');
  } else throw new Error('Project not found');
};

/**
 * Create a new project and returns it
 *
 * @param {string} username
 * @param {string} projectname
 * @return {object} project
 *
 */
exports.create = async (username, projectname) => {
  let project = null;

  const user = await UserService.get(username).catch((error) => {
    throw error;
  });

  const projects = await Project.find({_id: {$in: user.projects}}).catch((error) => {
    throw error;
  });

  // check if project named $projectname already exists
  if (projects.find((project) => project.projectname == projectname) == null) {
    project = new Project({projectname: projectname, files: []});

    // create project
    project = await project.save().catch((error) => {
      throw error;
    });

    // link newly created project to user
    await UserService.linkProject(username, project._id).catch((error) => {
      throw error;
    });
  } else throw new Error('Project already exists');

  return project;
};

/**
 * Delete a project
 *
 * @param {string} username
 * @param {string} projectid
 * @return {string}
 *
 */
exports.delete = async (username, projectid) => {
  let result;

  const project = await this.get(username, projectid).catch((error) => {
    throw error;
  });

  // delete each file of the project
  await File.deleteMany({
    _id: {
      $in: project.files,
    },
  }).catch((error) => {
    throw error;
  });

  // delete the project
  await Project.deleteOne(project)
      .then(() => {
        result = 'Project deleted';
      })
      .catch((error) => {
        throw error;
      });

  // unlink the projectid
  await UserService.unlinkProject(username, project._id).catch((error) => {
    throw error;
  });

  return result;
};

/**
 * Rename a project
 *
 * @param {string} username
 * @param {string} projectid
 * @param {string} newprojectname
 * @return {object} project
 *
 */
exports.rename = async (username, projectid, newprojectname) => {
  // get the project
  let project = await this.get(username, projectid).catch((error) => {
    throw error;
  });

  // get the user
  const user = await UserService.get(username).catch((error) => {
    throw error;
  });

  // get projects from user.projects
  const projects = await Project.find({_id: {$in: user.projects}}).catch((error) => {
    throw error;
  });

  // check if project named $projectname already exists in user's projects
  if (projects.find((elt) => elt.projectname == newprojectname) == null) {
    // if no --> update the projectname
    await project.update({projectname: newprojectname}).catch((error) => {
      throw error;
    });
    // get the updated document
    project = this.get(username, projectid).catch((error) => {
      throw error;
    });
  } else throw new Error('Project name already used');

  return project;
};

/**
 * Link a file to the project
 *
 * @param {File} file
 *
 */
exports.linkFile = async (file) => {
  const query = {_id: file.projectid};
  const update = {$addToSet: {files: file._id}};

  await Project.findOneAndUpdate(query, update, (err) => {
    if (err) throw err;
  });
};

/**
 * Unlink a file to the project
 *
 * @param {File} file
 *
 */
exports.unLinkFile = async (file) => {
  const query = {_id: file.projectid};
  const update = {$pull: {files: file._id}};

  await Project.findOneAndUpdate(query, update, (err) => {
    if (err) throw err;
  });
};
