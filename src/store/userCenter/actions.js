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
      console.log("error :>> ", error.response);
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
    context.commit("setUserDetails", res.data);
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
    context.commit("setUsers", res.data);
  } catch (error) {
    console.log("error :>> ", error.response);
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}

export async function inviteUser(context, payload) {
  const { data } = payload;
  if (!!data) {
    try {
      const res = await api.post("/api/users", data);
      console.log("res :>> ", res);
      Notify.create({
        message: "An Email has been sent to the invited user",
        type: "positive"
      });
      context.dispatch("getUsers");
      // TODO perform add user mutation? Ask Ameen if I should update the table right away
    } catch (error) {
      console.log("error :>> ", error.response);
      Notify.create({
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function resetPassword(context, payload) {
  const { data } = payload;
  if (!!data) {
    try {
      await api.post("/api/auth/reset-password", data);
      Notify.create({
        message: "Password reset successfully. Redirecting to Login",
        type: "positive"
      });
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 2000);
    } catch (error) {
      console.log("error :>> ", error.response);
      Notify.create({
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function updatePersonalData(context, payload) {
  const { data } = payload;
  console.log("data :>> ", data);
  const userId = context.state.user.user.id;
  console.log("userId", userId);
  if (!!data && !!userId) {
    try {
      const res = await api.put(`/api/user-details/${userId}`, { data });
      Notify.create({
        message: "User data updated successfully",
        type: "positive"
      });
      console.log("res :>> ", res);
      context.commit("updatePersonalData", res.data.data);
    } catch (error) {
      console.log("error :>> ", error.response);
      Notify.create({
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function logout(context) {
  context.commit("setUser", null);
  context.commit("setUsers", []);
  context.commit("project/setProjectIdeas", [], { root: true });
  context.commit("tag/setTags", [], { root: true });
  context.commit("municipality/setMunicipalities", [], { root: true });
  context.commit("category/setCategories", [], { root: true });
  context.commit("project/setProjectIdeas", [], { root: true });
  this.$router.push({ path: "/" });
}
