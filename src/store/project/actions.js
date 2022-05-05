import { api } from "boot/axios";
import { Notify } from "quasar";

export async function getProjectIdeas(context) {
  try {
    const res = await api.get("/api/projects");
    context.commit("setProjectIdeas", res.data);
  } catch (error) {
    Notify.create({
      position: "top-right",
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
        position: "top-right",
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
        position: "top-right",
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
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      // return false;
    }
  }
}

export async function editProjectIdea(context, payload) {
  console.log("context.state.project", context.state.project);
  const { data } = payload;
  console.log("data :>> ", data);
  // delete property 'files' and 'media'
  const { files, media, ...dataWithoutFiles } = data;
  console.log("dataWithoutFiles", dataWithoutFiles);
  // const result = data.files.filter(o1 => {
  //   return data.uploads.some(o2 => {
  //     return o1.id === o2.id;
  //   });
  // });
  // console.log("result", result);
  if (!!data) {
    try {
      const res = await api.put(`/api/projects/${data.id}`, {
        data: dataWithoutFiles
      });
      console.log("res :>> ", res);

      context.commit("editProjectIdea", res.data.data);
      console.log("data.files", data.files);
      if (data.files !== null) {
        // const addNewFilesRes = await context.dispatch("addNewFiles", {
        //   files: data.files,
        //   id: res.data.data.id
        // });

        // const exisitingFiles = [];

        // data.files.filter(o1 => {
        //   return context.state.project.files.some(o2 => {
        //     // return o1.name === o2.name;
        //     if (o1.id === o2.id) {
        //       exisitingFiles.push(o1.id);
        //     }
        //   });
        // });
        const exisitingFiles = context.state.project.files.map(file => file.id);
        console.log("exisitingFiles", exisitingFiles);

        const exclude = exisitingFiles.filter(o1 =>
          data.files.map(o2 => o2.id).includes(o1)
        );

        console.log("exclude", exclude);

        // console.log("addNewFilesRes", addNewFilesRes);
      }
      // if (data.files !== null) {
      //   let formData = new FormData();
      //   formData.append("ref", "api::project.project");
      //   formData.append("refId", res.data.data.id);
      //   formData.append("field", "uploads");
      //   if (data.files.length > 1) {
      //     data.files.forEach(file => {
      //       formData.append("files", file);
      //     });
      //   } else {
      //     formData.append("files", data.files[0]);
      //   }
      //   const imagesRes = await api.post("api/upload", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   });
      //   console.log("imagesRes :>> ", imagesRes);
      // }
      Notify.create({
        message: "New Project Idea added successfully",
        type: "positive"
      });
      // context.dispatch("getProjectIdeas");
      this.$router.push({
        path: "/user/data"
      });
    } catch (error) {
      console.log("error.response", error.response);
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function addNewFiles(context, payload) {
  if (payload.files && payload.id) {
    const exisitingFiles = [];
    payload.files.filter(o1 => {
      return context.state.project.files.some(o2 => {
        // return o1.name === o2.name;
        if (o1.name === o2.name) {
          exisitingFiles.push(o1.name);
        }
      });
    });
    console.log("exisitingFiles", exisitingFiles);

    let formData = new FormData();
    formData.append("ref", "api::project.project");
    formData.append("refId", payload.id);
    formData.append("field", "files");
    if (payload.files.length > 1) {
      payload.files.forEach(file => {
        if (!exisitingFiles.includes(file.name)) {
          console.log("More than one file", file);
          formData.append("files", file);
        }
      });
    } else {
      console.log("only one file");
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
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      // return false;
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
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
    }
  }
}

export async function viewProject(context, payload) {
  const { id } = payload;
  await context.dispatch("getSpecificProject", { id });
  this.$router.push({ path: `/user/newProjectIdea/${id}` });
}

export async function editProject(context, payload) {
  const { id } = payload;
  await context.dispatch("getSpecificProject", { id });
  this.$router.push({ path: `/user/newProjectIdea/edit/${id}` });
}
