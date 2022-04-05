import { api } from "boot/axios";
import { Notify } from "quasar";

export function getCategories(context) {
  api
    .get("/api/categories")
    .then(response => {
      console.log("response :>> ", response);
      context.commit("setCategories", response.data);
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

export async function addCategory(context, payload) {
  const { name } = payload;
  if (!!name) {
    try {
      const res = await api.post("/api/categories", { data: { title: name } });
      context.commit("addCategory", res.data.data);
      Notify.create({
        message: "Category added successfully",
        type: "positive"
      });
    } catch (error) {
      console.error("error :>> ", error);
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function deleteCategory(context, payload) {
  const { id } = payload;
  if (!!id) {
    try {
      const res = await api.delete(`/api/categories/${id}`);
      context.commit("deleteCategory", res.data.data && res.data.data.id);
      Notify.create({
        message: "Category deleted successfully",
        type: "positive"
      });
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

export async function editCategory(context, payload) {
  const { id } = payload;
  const { title } = payload;
  if (!!id && !!title) {
    try {
      const res = await api.put(`/api/categories/${id}`, {
        data: { title: title, updatedAt: new Date().toISOString() }
      });
      console.log("res :>> ", res);
      context.commit("editCategory", res.data.data);
      Notify.create({
        message: "Category updated successfully",
        type: "positive"
      });
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
