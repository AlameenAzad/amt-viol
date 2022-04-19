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
  if (!!data) {
    try {
      const res = await api.post("/api/projects", { data });
      context.commit("addNewProjectIdea", res.data.data);
      if (data.files !== null) {
        let formData = new FormData();
        formData.append("ref", "api::project.project");
        formData.append("refId", res.data.data.id);
        formData.append("field", "uploads");
        if (data.files.length > 1) {
          data.files.forEach(file => {
            formData.append("files", file);
          });
        } else {
          formData.append("files", data.files[0]);
        }
        const imagesRes = await api.post("api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log("imagesRes :>> ", imagesRes);
      }
      console.log("res :>> ", res);
      Notify.create({
        message: "New Project Idea added successfully",
        type: "positive"
      });
      // context.dispatch("getProjectIdeas");
      this.$router.push({ path: "/user/data" });
    } catch (error) {
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function getSpecificProject(context, payload) {
  const { id } = payload;
  if (id) {
    try {
      const res = await api.get("/api/projects/19");
      context.commit("setSpecificProject", res.data);
    } catch (error) {
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
    }
  }
}
