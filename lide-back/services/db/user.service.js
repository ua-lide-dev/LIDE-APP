const User = require('../../models/user.model');
const Project = require('../../models/project.model');
const File = require('../../models/file.model');
const ProjectService = require('./project.service');

/**
 * Get a User
 *
 * @param {string} username
 * @return {User}
 *
 */
exports.get = async (username) => {
  const match = {username: username};

  const user = await User.findOne(match).catch((error) => {
    throw error;
  });

  if (user == null) throw new Error('User not found');

  return user;
};

/**
 * Get a User and return it, create it if it does not exist
 * Used only during login
 *
 * @param {string} username
 * @return {User}
 *
 */
exports.getOrCreate = async (username) => {
  const match = {username: username};

  let user = await User.findOne(match).catch((error) => {
    throw error;
  });

  if (user == null) {
    user = await create(username).catch((error) => {
      throw error;
    });
  }

  return user;
};

/**
 * Create a User
 *
 * @param {string} username
 * @return {User}
 *
 */
const create = async (username) => {
  const user = new User({username: username, projects: []});

  await user
      .save()
      .then((result = user))
      .catch((error) => {
        throw error;
      });

  return user;
};

/**
 * Remove a User and all it's projects
 *
 * @param {string} username
 * @return {string} status
 */
exports.delete = async (username) => {
  // get the user
  const user = await this.get(username).catch((error) => {
    throw error;
  });

  for (let i = 0; i < user.projects.length; i++) {
    const projectid = user.projects[i];
    await ProjectService.delete(username, projectid).catch((error) => {
      throw error;
    });
  }

  User.deleteOne(user).catch((error) => {
    throw error;
  });

  return 'User deleted';
};

/**
 * From a username
 * Get all projectnames
 * Get all filenames
 *
 * @param {string} username
 * @return {string} projects
 *
 */
exports.getProjects = async (username) => {
  const result = [];

  const user = await this.get(username).catch((error) => {
    throw error;
  });

  for (let p = 0; p < user.projects.length; p++) {
    const projectid = user.projects[p];
    const project = await Project.findById(projectid).catch((error) => {
      throw error;
    });
    try {
      result.push({_id: project._id, projectname: project.projectname, files: []});
    } catch (error) {
      result.push({undefined: projectid});
    }

    for (let f = 0; f < project.files.length; f++) {
      const fileid = project.files[f];
      const file = await File.findById(fileid).catch((error) => {
        throw error;
      });
      try {
        result[p].files.push({
          _id: file._id,
          filename: file.filename,
          extension: file.extension,
        });
      } catch (error) {
        result[p].files.push({undefined: fileid});
      }
    }
  }

  return result;
};

/**
 * Link a projectid to the User
 *
 * @param {string} username
 * @param {string} projectid
 *
 */
exports.linkProject = async (username, projectid) => {
  const query = {username: username};
  const update = {$addToSet: {projects: projectid}};

  await User.findOneAndUpdate(query, update, (err) => {
    if (err) throw err;
  });
};

/**
 * Unlink a projectid from the User
 *
 * @param {string} username
 * @param {string} projectid
 *
 */
exports.unlinkProject = async (username, projectid) => {
  const query = {username: username};
  const update = {$pull: {projects: projectid}};

  await User.findOneAndUpdate(query, update, (err) => {
    if (err) throw err;
  });
};
