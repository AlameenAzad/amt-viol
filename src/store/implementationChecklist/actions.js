import { api } from "boot/axios";
import { Notify } from "quasar";

export async function getChecklists(context) {
  try {
    const res = await api.get("/api/checklists");
    context.commit("setChecklists", res.data);
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}
