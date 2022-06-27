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

export async function createNewChecklist(context, payload) {
  const { data } = payload;
  if (!!data) {
    console.log("data", data);
    const initialContact = await constructInitialContact(
      data.items.find(item => item.cardName === "initialContact")
    );
    const preparation = await constructpreparation(
      data.items.find(item => item.cardName === "preparation")
    );
    const fundingResearch = await constructFundingResearch(
      data.items.find(item => item.cardName === "fundingResearch")
    );
    const preparationOfProject = await constructPreparationOfProject(
      data.items.find(item => item.cardName === "preparationOfProject")
    );
    const legitimation = await constructLegitimation(
      data.items.find(item => item.cardName === "legitimation")
    );
    const finalExamination = await constructFinalExamination(
      data.items.find(item => item.cardName === "finalExamination")
    );
    // Remove items from original object & create new object
    const { items, ...finalData } = {
      ...data,
      initialContact,
      preparation,
      fundingResearch,
      preparationOfProject,
      legitimation,
      finalExamination
    };
    console.log("finalData", finalData);
    if (!finalData?.project.id) {
      delete finalData.project;
    }
    try {
      const res = await api.post("/api/checklists", { data: finalData });
      console.log("res :>> ", res);
      // context.commit("addNewProjectIdea", res.data.data);
      Notify.create({
        message: "New Implementation Checklist added successfully",
        type: "positive"
      });
      // context.dispatch("getProjectIdeas");
      this.$router.push({ path: "/user/data?tab=implementationChecklist" });
    } catch (error) {
      console.log("error.response", error.response);
      Notify.create({
        // position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
      return false;
    }
  }
}

export async function constructInitialContact(payload) {
  if (payload) {
    let initialContact = {};
    initialContact.start = payload.start;
    initialContact.end = payload.end;
    const captureIdea = payload.items.find(
      item => item.objectName === "captureIdea"
    );
    const caputreContect = payload.items.find(
      item => item.objectName === "caputreContect"
    );
    initialContact.captureIdea = {
      ...captureIdea
      // project: !!captureIdea.project?.id ? { id: captureIdea.project.id } : {}
    };
    if (!initialContact.captureIdea?.project.id) {
      delete initialContact.captureIdea.project;
    }
    initialContact.caputreContect = {
      ...caputreContect
    };
    return initialContact;
  }
}

export async function constructpreparation(payload) {
  if (payload) {
    let preparation = {};
    preparation.start = payload.start;
    preparation.end = payload.end;
    const inspection = payload.items.find(
      item => item.objectName === "inspection"
    );
    const captureRequirements = payload.items.find(
      item => item.objectName === "captureRequirements"
    );
    const captureNeeds = payload.items.find(
      item => item.objectName === "captureNeeds"
    );
    preparation.inspection = {
      ...inspection
    };
    preparation.captureRequirements = {
      ...captureRequirements
    };
    preparation.captureNeeds = {
      ...captureNeeds
    };
    return preparation;
  }
}

export async function constructFundingResearch(payload) {
  if (payload) {
    let fundingResearch = {};
    fundingResearch.start = payload.start;
    fundingResearch.end = payload.end;
    const checkDatabase = payload.items.find(
      item => item.objectName === "checkDatabase"
    );
    const checkForFunding = payload.items.find(
      item => item.objectName === "checkForFunding"
    );
    const checkWithFunding = payload.items.find(
      item => item.objectName === "checkWithFunding"
    );
    const checkGuildlines = payload.items.find(
      item => item.objectName === "checkGuildlines"
    );
    fundingResearch.checkDatabase = {
      ...checkDatabase
    };
    fundingResearch.checkForFunding = {
      ...checkForFunding
    };
    fundingResearch.checkWithFunding = {
      ...checkWithFunding
    };
    fundingResearch.checkGuildlines = {
      ...checkGuildlines
    };
    return fundingResearch;
  }
}

export async function constructPreparationOfProject(payload) {
  if (payload) {
    let preparationOfProject = {};
    preparationOfProject.start = payload.start;
    preparationOfProject.end = payload.end;
    const checkContent = payload.items.find(
      item => item.objectName === "checkContent"
    );
    const checkCooperations = payload.items.find(
      item => item.objectName === "checkCooperations"
    );
    const checkSimilarProejcts = payload.items.find(
      item => item.objectName === "checkSimilarProejcts"
    );
    const checkPlanning = payload.items.find(
      item => item.objectName === "checkPlanning"
    );
    preparationOfProject.checkContent = {
      ...checkContent
    };
    preparationOfProject.checkCooperations = {
      ...checkCooperations
    };
    preparationOfProject.checkSimilarProejcts = {
      ...checkSimilarProejcts
    };
    preparationOfProject.checkPlanning = {
      ...checkPlanning
    };
    return preparationOfProject;
  }
}

export async function constructLegitimation(payload) {
  if (payload) {
    let legitimation = {};
    legitimation.start = payload.start;
    legitimation.end = payload.end;
    const template = payload.items.find(item => item.objectName === "template");
    legitimation.template = {
      ...template
    };
    return legitimation;
  }
}

export async function constructFinalExamination(payload) {
  if (payload) {
    let finalExamination = {};
    finalExamination.start = payload.start;
    finalExamination.end = payload.end;
    const revision = payload.items.find(item => item.objectName === "revision");
    const signatures = payload.items.find(
      item => item.objectName === "signatures"
    );
    finalExamination.revision = {
      ...revision
    };
    finalExamination.signatures = {
      ...signatures
    };
    return finalExamination;
  }
}

export async function getSpecificChecklist(context, payload) {
  context.commit("setSpecificChecklist", null);
  const { id } = payload;
  if (id) {
    try {
      const res = await api.get(`/api/checklists/${id}`);
      context.commit("setSpecificChecklist", res.data);
      // return res.data.id;
    } catch (error) {
      Notify.create({
        position: "top-right",
        type: "negative",
        message: error.response.data.error.message
      });
    }
  }
}

export async function deleteChecklist(context, payload) {
  const { id } = payload;
  if (!!id) {
    try {
      const res = await api.delete(`/api/checklists/${id}`);
      context.commit("deleteChecklist", res.data.data && res.data.data.id);
      Notify.create({
        message: "Checklist deleted successfully",
        type: "positive"
      });
      context.dispatch("getChecklists");
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
