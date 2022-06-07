import { api } from "boot/axios";
import { Notify } from "quasar";

export async function getProjectIdeas(context) {
  try {
    const res = await api.get("/api/projects");
    context.commit("setProjectIdeas", res.data);
  } catch (error) {
    Notify.create({
      // position: "top-right",
      type: "negative",
      message: error.response.data.error.message
    });
  }
}

export async function createNewProjectIdea(context, payload) {
  const { data } = payload;
  console.log("data :>> ", data);
  // delete property 'files' and 'media'
  const { files, media, ...dataWithoutFiles } = data;
  console.log("dataWithoutFiles", dataWithoutFiles);
  if (!!data) {
    try {
      const res = await api.post("/api/projects", { data: dataWithoutFiles });
      console.log("res :>> ", res);
      context.commit("addNewProjectIdea", res.data.data);
      if (data.files !== null) {
        const fileUploadRes = await context.dispatch("uploadFiles", {
          files: data.files,
          id: res.data.data.id
        });
        console.log("fileUploadRes", fileUploadRes);
      }
      if (data.media !== null) {
        const mediaUploadRes = await context.dispatch("uploadMedia", {
          media: data.media,
          id: res.data.data.id
        });
        console.log("mediaUploadRes", mediaUploadRes);
      }
      Notify.create({
        message: "New Project Idea added successfully",
        type: "positive"
      });
      // context.dispatch("getProjectIdeas");
      this.$router.push({ path: "/user/data" });
    } catch (error) {
      console.log("error.response", error.response);
      Notify.create({
        // position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function uploadFiles(context, payload) {
  if (payload.files && payload.id) {
    let formData = new FormData();
    formData.append("ref", "api::project.project");
    formData.append("refId", payload.id);
    formData.append("field", "files");
    if (payload.files.length > 1) {
      payload.files.forEach(file => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", payload.files[0]);
    }
    try {
      const fileRes = await api.post("api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("fileRes", fileRes);
    } catch (error) {
      console.log("files error.response", error.response);
      Notify.create({
        // position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      // return false;
    }
  }
}

export async function uploadMedia(context, payload) {
  if (payload.media && payload.id) {
    let formData = new FormData();
    formData.append("ref", "api::project.project");
    formData.append("refId", payload.id);
    formData.append("field", "media");
    if (payload.media.length > 1) {
      payload.media.forEach(file => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", payload.media[0]);
    }
    try {
      const mediaRes = await api.post("api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("mediaRes", mediaRes);
    } catch (error) {
      console.log("media error.response", error.response);
      Notify.create({
        // position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      // return false;
    }
  }
}

export async function deleteFilesAndMedia(context, payload) {
  console.log("payload", payload);
  if (payload.data) {
    payload.data.forEach(async item => {
      try {
        const deleteRes = await api.delete(`api/upload/files/${item.id}`);
        console.log("deleteRes", deleteRes);
      } catch (error) {
        console.log("files error.response", error.response);
        Notify.create({
          // position: "top-right",
          type: "negative",
          message: error.response.data.error.message
        });
        // return false;
      }
    });
  }
}

export async function editProjectIdea(context, payload) {
  console.log("context.state.project", context.state.project);
  const { data } = payload;
  console.log("data :>> ", data);
  // delete property 'files' and 'media'
  const { files, media, ...dataWithoutFiles } = data;
  console.log("dataWithoutFiles", dataWithoutFiles);
  if (!!data) {
    try {
      const res = await api.put(`/api/projects/${data.id}`, {
        data: dataWithoutFiles
      });
      console.log("res :>> ", res);
      // context.commit("editProjectIdea", res.data.data);
      if (data.media !== null) {
        let added = [];
        if (context.state.project.media === null) {
          added = data.media;
        } else {
          added = data.media.filter(
            newMedia =>
              !context.state.project.media.find(
                oldMedia => oldMedia.id === newMedia.id
              )
          );
        }
        let deleted = [];
        if (context.state.project.media !== null) {
          deleted = context.state.project.media.filter(
            oldMedia =>
              !data.media.find(newMedia => newMedia.id === oldMedia.id)
          );
        }
        if (added.length > 0) {
          const addNewFilesRes = await context.dispatch("uploadMedia", {
            media: added,
            id: res.data.data.id
          });
          console.log("addNewFilesRes", addNewFilesRes);
        }
        if (deleted.length > 0) {
          const deleteFilesRes = await context.dispatch("deleteFilesAndMedia", {
            data: deleted
          });
          console.log("deleteFilesRes", deleteFilesRes);
        }
      }
      if (data.files !== null) {
        let added = [];
        if (context.state.project.files === null) {
          console.log("project files is null");
          added = data.files;
        } else {
          console.log("project files is not null");
          added = data.files.filter(
            newFiles =>
              !context.state.project.files.find(
                oldFiles => oldFiles.id === newFiles.id
              )
          );
        }
        let deleted = [];
        if (context.state.project.files !== null) {
          deleted = context.state.project.files.filter(
            oldFiles =>
              !data.files.find(newFiles => newFiles.id === oldFiles.id)
          );
        }
        if (added.length > 0) {
          const addNewFilesRes = await context.dispatch("uploadFiles", {
            files: added,
            id: res.data.data.id
          });
          console.log("addNewFilesRes", addNewFilesRes);
        }
        if (deleted.length > 0) {
          const deleteFilesRes = await context.dispatch("deleteFilesAndMedia", {
            data: deleted,
            id: res.data.data.id
          });
          console.log("deleteFilesRes", deleteFilesRes);
        }
      }
      Notify.create({
        message: "Project Idea edited successfully",
        type: "positive"
      });
      // context.dispatch("getProjectIdeas");
      this.$router.push({
        path: "/user/data"
      });
    } catch (error) {
      console.error("error", error);
      Notify.create({
        // position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function getSpecificProject(context, payload) {
  context.commit("setSpecificProject", null);
  const { id } = payload;
  if (id) {
    try {
      const res = await api.get(`/api/projects/${id}`);
      context.commit("setSpecificProject", res.data);
      return res.data.id;
    } catch (error) {
      console.log("error", error.response.status);
      Notify.create({
        // position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function viewProject(context, payload) {
  const { id } = payload;
  const project = await context.dispatch("getSpecificProject", { id });
  if (!!project) {
    this.$router.push({ path: `/user/newProjectIdea/${id}` });
  }
}

export async function editProject(context, payload) {
  const { id } = payload;
  const project = await context.dispatch("getSpecificProject", { id });
  if (!!project) {
    this.$router.push({ path: `/user/newProjectIdea/edit/${id}` });
  }
}

export async function deleteProjectIdea(context, payload) {
  const { id } = payload;
  if (!!id) {
    try {
      const res = await api.delete(`/api/projects/${id}`);
      context.commit("deleteProjectIdea", res.data.data && res.data.data.id);
      Notify.create({
        message: "Project Idea deleted successfully",
        type: "positive"
      });
      context.dispatch("getProjectIdeas");
    } catch (error) {
      Notify.create({
        // position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}
