import { api } from "boot/axios";
import { Notify } from "quasar";

export function getCategories(context) {
  api
    .get("/api/categories")
    .then(response => {
      context.commit("setCategories", response.data.data);
    })
    .catch(error => {
      console.error("error :>> ", error);
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
    });
}

export function addCategory(context, payload) {
  context.commit("general/setLoading", true, { root: true });
  const { name } = payload;
  if (!!name) {
    api
      .post("/api/categories", { data: { title: name } })
      .then(response => {
        context.commit("addCategory", response.data.data);
        context.commit("general/setLoading", false, { root: true });
        Notify.create({
          message: "Category added successfully",
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

export function deleteCategory(context, payload) {
  context.commit("general/setLoading", true, { root: true });
  const { id } = payload;
  if (!!id) {
    api
      .delete(`/api/categories/${id}`)
      .then(response => {
        context.commit(
          "deleteCategory",
          response.data.data && response.data.data.id
        );
        context.commit("general/setLoading", false, { root: true });
        Notify.create({
          message: "Category deleted successfully",
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

export function getTags(context) {
  api
    .get("/api/tags")
    .then(response => {
      context.commit("setTags", response.data.data);
    })
    .catch(error => {
      console.error("error :>> ", error);
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
    });
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
