import { api } from "boot/axios";
import { Notify } from "quasar";

export async function getDiscussions(context, query) {
  try {
    const url = query ? `/api/forums?query=${query}` : "/api/forums";
    const res = await api.get(url);
    context.commit("setForums", res.data);
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}

export async function getDiscussion(context, id) {
  try {
    const res = await api.get(`/api/forums/${id}`);
    return res.data;
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}

export async function createDiscussion(context, payload) {
  try {
    const res = await api.post("/api/forums", { data: payload });
    // context.commit("addDiscussion", res.data);
    Notify.create({
      type: "positive",
      message: "Discussion created successfully"
    });
    return res.data;
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}
