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
