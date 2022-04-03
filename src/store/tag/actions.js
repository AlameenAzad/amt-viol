import { api } from "boot/axios";
import { Notify } from "quasar";

export async function getTags(context) {
  try {
    const res = await api.get("/api/tags");
    context.commit("setTags", res.data.data);
  } catch (error) {
    Notify.create({
      position: "top-right",
      type: "negative",
      message: error.response.data.error.message
    });
    return false;
  }
}

export function addTag(context, payload) {
  context.commit("general/setLoading", true, { root: true });
  const { name } = payload;
  if (!!name) {
    api
      .post("/api/tags", { data: { title: name } })
      .then(response => {
        context.commit("addTag", response.data.data);
        context.commit("general/setLoading", false, { root: true });
        Notify.create({
          message: "Tag added successfully",
          type: "positive"
        });
      })
      .catch(error => {
        context.commit("general/setLoading", false, { root: true });
        console.error("error :>> ", error);
        Notify.create({
          position: "top-right",
          type: "negative",
          message: error.response.data.error.message
        });
      });
  }
}

export function deleteTag(context, payload) {
  context.commit("general/setLoading", true, { root: true });
  const { id } = payload;
  if (!!id) {
    api
      .delete(`/api/tags/${id}`)
      .then(response => {
        context.commit(
          "deleteTag",
          response.data.data && response.data.data.id
        );
        context.commit("general/setLoading", false, { root: true });
        Notify.create({
          message: "Tag deleted successfully",
          type: "positive"
        });
      })
      .catch(error => {
        console.error("error :>> ", error);
        context.commit("general/setLoading", false, { root: true });
        Notify.create({
          position: "top-right",
          type: "negative",
          message: error.response.data.error.message
        });
      });
  }
}
