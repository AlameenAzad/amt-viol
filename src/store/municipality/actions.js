import { api } from "boot/axios";
import { Notify } from "quasar";

export function getMunicipalities(context) {
  api
    .get("/api/municipalities")
    .then(response => {
      context.commit("setMunicipalities", response.data.data);
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

export async function createMunicipality(context, payload) {
  const { title } = payload;
  const { location } = payload;
  if (!!title && !!location) {
    try {
      const res = await api.post("/api/municipalities", {
        data: { title, location }
      });
      context.commit("addMunicipality", res.data.data);
      Notify.create({
        message: "Municiplaity added successfully",
        type: "positive"
      });
      context.dispatch("getMunicipalities");
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

export async function editMunicipality(context, payload) {
  const { id } = payload;
  const { title } = payload;
  const { location } = payload;
  if (!!id && !!title && !!location) {
    try {
      const res = await api.put(`/api/municipalities/${id}`, {
        data: { title, location, updatedAt: new Date().toISOString() }
      });
      console.log("res :>> ", res);
      context.commit("editMunicipality", res.data.data);
      Notify.create({
        message: "Municipality updated successfully",
        type: "positive"
      });
      context.dispatch("getMunicipalities");
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

export async function delteMunicipality(context, payload) {
  const { id } = payload;
  if (!!id) {
    try {
      const res = await api.delete(`/api/municipalities/${id}`);
      context.commit("deleteMunicipality", res.data.data && res.data.data.id);
      Notify.create({
        message: "Municipality deleted successfully",
        type: "positive"
      });
      context.dispatch("getMunicipalities");
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
