const File = require('../../models/file.model');
const User = require('../../models/user.model');
const ProjectService = require('./project.service');

/**
 * Get a file
 *
 * @param {string} username
 * @param {string} fileid
 * @return {object} file
 *
 */
exports.get = async (username, fileid) => {
  const file = await File.findById(fileid).catch((error) => {
    throw error;
  });

  if (file != null) {
    const user = await User.findOne({ username: username }).catch((error) => {
      throw error;
    });
    const projects = user.projects;
    if (projects.includes(file.projectid)) return file;
    else throw new Error('Unauthorized');
  } else throw new Error('File not found');
};

/**
 * Creates a new file and returns it
 *
 * @param {string} username
 * @param {string} projectid
 * @param {string} filename
 * @param {string} extension
 * @return {object} file
 *
 */
exports.create = async (username, projectid, filename, extension) => {
  let file = null;

  // get the project
  const project = await ProjectService.get(username, projectid).catch((error) => {
    throw error;
  });

  // check for project files
  const files = await File.find({ _id: { $in: project.files } }).catch((error) => {
    throw error;
  });

  // check if file named $filename already exists
  if (files.find((file) => (file.filename == filename) && (file.extension == extension)) == null) {
    const content = '';
    const date = new Date();
    file = new File({ projectid, filename, extension, content, date });

    // save new file
    file = await file.save().catch((error) => {
      throw error;
    });

    // link file to it's project
    await ProjectService.linkFile(file).catch((error) => {
      throw error;
    });
  } else throw new Error('File already exists');

  return file;
};

/**
 * Delete a file
 *
 * @param {string} username
 * @param {string} fileid
 * @return {string}
 *
 */
exports.delete = async (username, fileid) => {
  let result;

  const file = await this.get(username, fileid).catch((error) => {
    throw error;
  });

  await ProjectService.unLinkFile(file).catch((error) => {
    throw error;
  });

  await File.deleteOne({ _id: fileid })
    .then(() => {
      result = 'File deleted';
    })
    .catch((error) => {
      throw error;
    });

  return result;
};

/**
 * Rename a file
 *
 * @param {string} username
 * @param {string} fileid
 * @param {string} newfilename
 * @return {object} file
 *
 */
exports.rename = async (username, fileid, newfilename) => {
  // get the file
  let file = await this.get(username, fileid).catch((error) => {
    throw error;
  });

  // get the project
  const project = await ProjectService.get(username, file.projectid).catch((error) => {
    throw error;
  });

  // get files from project.files
  const files = await File.find({ _id: { $in: project.files } }).catch((error) => {
    throw error;
  });

  // check if file named $newfilename already exists in project's files
  if (files.find((file) => ((file.filename == newfilename) && (file.extension == extension))) == null) {
    // if no --> update the filename
    await file.update({ filename: newfilename }).catch((error) => {
      throw error;
    });
    // get the updated file
    file = this.get(username, fileid).catch((error) => {
      throw error;
    });
  } else throw new Error('File name already used');

  return file;
};

/**
 * Saves a file
 *
 * @param {string} username
 * @param {string} fileid
 * @param {string} content
 * @return {object} file
 *
 */
exports.save = async (username, fileid, content) => {
  // get the file
  let file = await this.get(username, fileid).catch((error) => {
    throw error;
  });

  // update the file
  File.updateOne(file, { content: content }, { new: true }).catch((error) => {
    throw error;
  });

  // get the updated file
  file = this.get(username, fileid).catch((error) => {
    throw error;
  });

  return file;
};
