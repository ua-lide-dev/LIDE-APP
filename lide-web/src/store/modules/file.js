import FileService from "../../services/file-service";

/* ------------------------- FILE STATE ------------------------- */
const state = () => ({
  openedFiles: [],
  currentFileId: null,
});

/* ------------------------- FILE GETTERS ------------------------- */
const getters = {
  openedFiles(state) {
    return state.openedFiles;
  },
  currentFileId(state) {
    return state.currentFileId;
  },
};

/* ------------------------- FILE ACTIONS ------------------------- */
const actions = {
  async get({ state }, fileid) {
    const file = state.openedFiles.find((openedFile) => (openedFile._id == fileid));
    if (file != null) return file;
    else throw new Error("FILE_NOT_FOUND");
  },

  async create({ dispatch }, { projectid, filename, extension }) {
    console.log("STORE CREATE FILE : " + filename + extension + " IN PROJECT: " + projectid);
    await FileService.create(projectid, filename, extension)
      .then(() => {
        dispatch("project/fetchProjects", null, { root: true });
      })
  },

  async rename({ dispatch }, { fileid, newfilename }) {
    console.log("STORE RENAME FILE : " + fileid + " INTO : " + newfilename);
    await FileService.rename(fileid, newfilename)
      .then(async () => {
        await dispatch("project/fetchProjects", null, { root: true });
        // on update le fichier du store
        let file = await dispatch("get", fileid);
        file.filename = newfilename;
      })
  },

  async remove({ dispatch }, fileid) {
    console.log("STORE REMOVE FILE : " + fileid);
    await FileService.remove(fileid)
      .then(async () => {
        await dispatch("project/fetchProjects", null, { root: true });
        await dispatch("unLoad", { fileid: fileid, force: false });
      })
  },

  async save({ dispatch, commit }, fileid) {
    console.log("STORE SAVE FILE : " + fileid);
    const file = await dispatch("get", fileid);
    await FileService.save(fileid, file.content)
      .then(commit("UPDATE_OLD_CONTENT", fileid))
  },

  /**
   * Sauvegarde des modifications du fichier courant dans le store.
   * Permet de ne pas perdre le contenu du fichier en cours de modifications suite à un changement de fichier courant.
   */
  async lightSave({ state, commit }, editorContent) {
    console.log("STORE LIGHT SAVE : " + state.currentFileId);
    if (state.currentFileId != null)
      commit("SET_CURRENT_FILE_CONTENT", editorContent);
  },

  /** 
   * Charge un fichier dans l'ihm
   */
  async load({ commit, dispatch }, fileid) {
    console.log("STORE LOAD FILE ID : " + fileid);
    // On vérifie si le fichier est présent dans le store
    let file = await dispatch("get", fileid).catch(() => file = null);
    if (file != null) {
      // Fichier présent dans le store --> on le retourne
      console.log("STORE LOAD FILE FROM --STORE--: " + file.filename + file.extension);
      commit("SET_CURRENT_FILE_ID", file._id);
    } else {
      // Fichier non présent dans le store -> on le récupère sur l'api
      console.log("STORE LOAD FILE FROM --API--: " + fileid);
      await FileService.get(fileid)
        .then((res) => {
          // mémorisation du contenu du fichier présent en base
          res.data.oldContent = res.data.content;
          commit("ADD_FILE", res.data);
        })
    }
  },

  /**
   * Décharge un fichier (appelé depuis la fermeture d'un onglet)
   */
  async unLoad({ dispatch, commit }, { fileid, force }) {
    console.log("STORE UN-LOAD FILE ID : " + fileid);
    const file = await dispatch("get", fileid);
    if (file != null) {
      if (file.content != file.oldContent && force != true) throw new Error("FILE_NOT_SAVED");
      else commit("REMOVE_FILE", fileid);
    }
    else throw new Error("Error while unloading file, file already closed");

  },
};

/* ------------------------- FILE MUTATIONS ------------------------- */
const mutations = {
  SET_CURRENT_FILE_ID(state, fileid) {
    state.currentFileId = fileid;
  },
  SET_CURRENT_FILE_CONTENT(state, currentFileContent) {
    console.log("STATE COMMIT 'SET_CURRENT_FILE_CONTENT' ID : " + state.currentFileId + " CONTENT : " + currentFileContent);
    state.openedFiles.find(file => file._id == state.currentFileId).content = currentFileContent;
  },
  ADD_FILE(state, file) {
    console.log("STATE COMMIT 'ADD_FILE' ID : " + file.filename + file.extension);
    state.currentFileId = file._id;
    // on ajoute un nouveau fichier si il n'est pas présent dans le store
    if (state.openedFiles.find((openedFile) => (openedFile._id == file._id)) == null) {
      state.openedFiles.push(file);
    }
  },
  REMOVE_FILE(state, fileid) {
    console.log("STATE COMMIT 'REMOVE_FILE' ID : " + fileid);
    // suppression du fichier
    const indexFile = state.openedFiles.findIndex((openedFile) => openedFile._id == fileid);
    state.openedFiles = state.openedFiles.filter((openedFile) => {
      return openedFile._id != fileid;
    });
    // si le fichier supprimé est le fichier courant : on défini un nouveau fichier courant
    if (state.currentFileId == fileid) {
      if (state.openedFiles[indexFile] != null) {
        state.currentFileId = state.openedFiles[indexFile]._id;
      }
      else if (state.openedFiles[indexFile - 1] != null) {
        state.currentFileId = state.openedFiles[indexFile - 1]._id;
      }
      else {
        state.currentFileId = null;
      }
    }
  },
  UPDATE_OLD_CONTENT(state, fileid) {
    let file = state.openedFiles.find((openedFile) => (openedFile._id == fileid));
    file.oldContent = file.content;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
