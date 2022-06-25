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
  if (data) {
    console.log("data", data);
    // Construct initialContact
    const initialContact = await constructInitialContact(
      data.items.find(item => item.cardName === "initialContact")
    );
    console.log("initialContact", initialContact);
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
      id: captureIdea.id,
      name: captureIdea.name,
      text: captureIdea.text,
      sortPosition: captureIdea.sortPosition,
      active: captureIdea.active,
      tasks: captureIdea.tasks,
      project: !!captureIdea.project?.id ? { id: captureIdea.project.id } : {}
    };
    initialContact.caputreContect = {
      id: caputreContect.id,
      name: caputreContect.name,
      text: caputreContect.text,
      sortPosition: caputreContect.sortPosition,
      active: caputreContect.active,
      tasks: caputreContect.tasks
    };
    return initialContact;
  }
}
