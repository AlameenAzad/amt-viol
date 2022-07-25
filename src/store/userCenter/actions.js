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
      await context.dispatch("getUserInfo");
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

      if (context.getters.isAdmin === true) {
        context.commit("changeLoadingMessages", "Getting Fundings");
        await context.dispatch("funding/getFundings", null, {
          root: true
        });
      }

      context.commit("changeLoadingMessages", "Getting Checklists");
      await context.dispatch("implementationChecklist/getChecklists", null, {
        root: true
      });

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
    console.log("res", res);
    // Delete the IDs from the response as they are not needed.
    const userDetails = res.data;
    delete userDetails.notifications.id;
    delete userDetails.notifications.app.id;
    delete userDetails.notifications.email.id;
    context.commit("setUserDetails", userDetails);
  } catch (error) {
    console.log("error :>> ", error.response);
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}

export async function getUserInfo(context) {
  try {
    const res = await api.get("/api/users/me");
    console.log("USER INFO res", res);
    context.commit("setUserInfo", res.data);
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
      context.dispatch("getUserDetails");
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

export async function updateUser(context, payload) {
  const data = payload;
  console.log("data :>> ", data);

  if (!!data.id && !!data.data) {
    try {
      const res = await api.put(`/api/users/${data.id}`, { data: data.data });
      Notify.create({
        message: "User data updated successfully",
        type: "positive"
      });
      context.dispatch("getUserDetails");
      context.dispatch("getUserInfo");
      this.$router.push({ path: "/Administation/User/" });
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

export async function transferData(context, payload) {
  const id = payload.selectedUser;
  const { data } = payload;
  console.log("id :>> ", id);
  console.log("data :>> ", data);

  const dataString = data.toString();
  console.log("dataString", dataString);

  if (!!id && data.length > 0) {
    try {
      const res = await api.get(`/api/user/transfer/${id}/?data=${dataString}`);
      Notify.create({
        message: "User data transferred successfully",
        type: "positive"
      });
      console.log("res", res);
      // context.dispatch("getUserDetails");
      // this.$router.push({ path: "/Administation/User/" });
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

export async function getDataOverview(context) {
  try {
    const res = await api.get("/api/user/overview");
    context.commit("setDataOverview", res.data);
  } catch (error) {
    console.log("error :>> ", error.response);
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}

export async function getWatchlists(context) {
  try {
    const res = await api.get("/api/watchlists");
    context.commit("setWatchlists", res.data);
  } catch (error) {
    console.log("error :>> ", error.response);
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
  }
}

export async function logout(context) {
  this.$router.push({ path: "/" });
  context.commit("setUser", null);
  context.commit("setUsers", []);
  context.commit("clearDataOverview", []);
  context.commit("setWatchlists", []);
  context.commit("project/setProjectIdeas", [], { root: true });
  context.commit("tag/setTags", [], { root: true });
  context.commit("municipality/setMunicipalities", [], { root: true });
  context.commit("category/setCategories", [], { root: true });
  context.commit("funding/setFundings", [], { root: true });
  context.commit("implementationChecklist/setChecklists", [], { root: true });
}

export async function forgotPassword(context) {
  try {
    await api.post("/api/auth/forgot-password", {
      email: context.state.user.user.email
    });
    Notify.create({
      message: "Password reset link was sent to your email.",
      type: "positive"
    });
  } catch (error) {
    console.log("error :>> ", error.response);
    Notify.create({
      type: "negative",
      message: error.response.data.error.message
    });
    return false;
  }
}
