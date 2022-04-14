import { api } from "boot/axios";
import { Notify } from "quasar";

export async function login(context, payload) {
  const { identifier } = payload;
  const { password } = payload;
  if (!!identifier && !!password) {
    try {
      context.commit("changeLoadingMessages", "Logging you in...");
      const res = await api.post("/api/auth/local", { identifier, password });
      context.commit("setUser", res.data);
      context.commit("changeLoadingMessages", "Getting user details");
      await context.dispatch("getUserDetails");
      context.commit("changeLoadingMessages", "Getting Categories");
      await context.dispatch("category/getCategories", null, { root: true });
      context.commit("changeLoadingMessages", "Getting Tags");
      await context.dispatch("tag/getTags", null, { root: true });
      context.commit("changeLoadingMessages", "Getting Municipalities");
      await context.dispatch("municipality/getMunicipalities", null, {
        root: true
      });
      context.commit("changeLoadingMessages", "Getting users");
      await context.dispatch("getUsers");
      context.commit("changeLoadingMessages", "");
      this.$router.push({ path: "/dashboard" });
      return true;
    } catch (error) {
      // TODO add error for too many login requests
      // console.log("error :>> ", error.response);
      // Notify.create({
      //   type: "negative",
      //   message: error.response.data.error.message
      // });
      return (
        error.response.data.error.message ||
        "Login failed, please try again in a while"
      );
    }
  }
}

export async function getUserDetails(context) {
  try {
    const res = await api.get("/api/user-details");
    context.commit("setUserDetails", res.data[0]);
  } catch (error) {
    console.log("error :>> ", error.response);
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}

export async function getUsers(context) {
  try {
    const res = await api.get("/api/users");
    console.log("res :>> ", res);
    context.commit("setUsers", res.data);
  } catch (error) {
    console.log("error :>> ", error.response);
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}

export async function logout(context) {
  context.commit("setUser", null);
  this.$router.push({ path: "/" });
}
