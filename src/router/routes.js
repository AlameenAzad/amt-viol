// This does not update when you switch the language
// import { i18n } from "src/boot/i18n";
// const { t } = i18n;

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "landing",
        component: () => import("pages/Index.vue")
      },
      {
        path: "/documents",
        name: "documents",
        component: () => import("pages/Documents.vue")
      },
      {
        path: "/reset-password",
        name: "ResetPassword",
        component: () => import("pages/ResetPassword.vue")
      }
    ]
  },
  {
    path: "/dashboard",
    component: () => import("layouts/dashboardLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Home",
        meta: {
          title: "Home",
          // title: i18n.t("notifications.updateRequest"),
          showInNavigation: true,
          requireAuth: true,
          requireAdmin: false
        },
        icon: "/icons/Home.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/overview",
        name: "DataOverview",
        meta: {
          title: "Data Overview",
          showInNavigation: true,
          requireAuth: true,
          requireAdmin: false
        },
        icon: "/icons/Documents.svg",
        component: () => import("pages/dashboard/DataOverview.vue")
      },
      {
        path: "/watchlist",
        name: "watchlist",
        meta: {
          title: "My Watchlist",
          showInNavigation: true,
          requireAuth: true,
          requireAdmin: false
        },
        icon: "/icons/Favorite.svg",
        children: [
          {
            path: "/watchlist/projectIdeas",
            name: "projectIdeas",
            meta: {
              title: "projectIdeas",
              requireAuth: true,
              requireAdmin: true
            },
            icon: "/icons/Home.svg"
          }
        ],
        component: () => import("pages/dashboard/Watchlist.vue")
      },
      {
        path: "/catkeytags",
        name: "CatKeyTags",
        meta: {
          title: "Categories & Keywords/Tags",
          showInNavigation: true,
          requireAuth: true,
          requireAdmin: true
        },
        icon: "/icons/Hash.svg",
        component: () => import("src/pages/dashboard/CategoriesKeywords.vue")
      },
      {
        path: "/Administation/User",
        name: "AdministationUser",
        meta: {
          title: "User Administration",
          showInNavigation: true,
          requireAuth: true,
          requireAdmin: true
        },
        icon: "/icons/Users.svg",
        component: () => import("pages/dashboard/AdminUser.vue")
      },
      {
        path: "/Administation/User/:id",
        name: "AdministationUserDetails",
        meta: {
          title: "User Administation",
          showInNavigation: false,
          backLink: "/Administation/User",
          requireAuth: true,
          requireAdmin: true
        },
        icon: "/icons/Users.svg",
        component: () => import("pages/dashboard/DetailUser.vue")
      },
      {
        path: "/network",
        name: "Network",
        meta: {
          title: "My Network",
          showInNavigation: false,
          requireAuth: true,
          requireAdmin: false
        },
        icon: "/icons/Network.svg",
        component: () => import("pages/dashboard/Network.vue")
      },
      {
        path: "/network/:id",
        name: "UserData",
        meta: {
          title: "User Data",
          showInNavigation: false,
          backLink: "/network",
          requireAuth: true,
          requireAdmin: true
        },
        icon: "/icons/Users.svg",
        component: () => import("pages/dashboard/NetworkUser.vue")
      },
      {
        path: "/Administation/Areas",
        name: "AdministationAreas",
        meta: {
          title: "Administrative areas",
          showInNavigation: true,
          requireAuth: true,
          requireAdmin: false
        },
        icon: "/icons/Municipality.svg",
        component: () => import("pages/dashboard/Municipality.vue")
      },
      {
        path: "/Administation/Areas/:id",
        name: "AdministationAreasDetails",
        meta: {
          title: "Details for the Administration",
          backLink: "/Administation/Areas",
          requireAuth: true,
          requireAdmin: false
        },
        icon: "/icons/Municipality.svg",
        component: () => import("pages/dashboard/MunicipalityDetail.vue")
      },
      {
        path: "/stats",
        name: "Statistics&Archive",
        meta: {
          title: "Statistics & Archive",
          showInNavigation: true,
          requireAuth: true,
          requireAdmin: true
        },
        icon: "/icons/Archive.svg",
        component: () => import("pages/dashboard/Stats.vue")
      }
    ]
  },
  {
    path: "/user",
    component: () => import("layouts/dashboardLayout.vue"),
    children: [
      {
        path: "/user/notifications",
        name: "notifications",
        meta: {
          title: "Notifications",
          requireAuth: true,
          requireAdmin: false
        },
        icon: "/icons/Home.svg",
        component: () => import("pages/dashboard/Notifications.vue")
      },
      {
        path: "/user/data",
        name: "MyData",
        meta: {
          title: "My Data",
          requireAuth: true,
          requireAdmin: false
        },
        icon: "/icons/Home.svg",
        component: () => import("pages/dashboard/MyData.vue")
      },
      {
        path: "/user/settings",
        name: "settings",
        meta: {
          title: "Settings",
          requireAuth: true,
          requireAdmin: false
        },
        icon: "/icons/Settings.svg",
        component: () => import("pages/dashboard/Settings.vue")
      },
      {
        path: "/user/newProjectIdea",
        name: "NewProjectIdea",
        meta: {
          title: "New Project Ideas",
          backLink: "/user/data",
          requireAuth: true,
          requireAdmin: false
        },
        component: () => import("pages/dashboard/NewProjectIdea.vue")
      },
      {
        path: "/user/newProjectIdea/edit/:id",
        name: "EditProject",
        meta: {
          title: "Edit project Idea",
          backLink: "/user/data",
          requireAuth: true,
          requireAdmin: false
        },
        component: () => import("pages/dashboard/NewProjectIdea.vue")
      },
      {
        path: "/user/newProjectIdea/:id",
        name: "ViewProject",
        meta: {
          title: "Details of the project Idea",
          backLink: "/user/data",
          requireAuth: true,
          requireAdmin: false
        },
        component: () => import("pages/dashboard/ProjectView.vue")
      },
      {
        path: "/user/newFunding",
        name: "NewFunding",
        meta: {
          title: "New Funding",
          backLink: "/user/data",
          requireAuth: true,
          requireAdmin: false
        },
        component: () => import("pages/dashboard/NewFunding.vue")
      },
      {
        path: "/user/newFunding/edit/:id",
        name: "EditFunding",
        meta: {
          title: "Edit Funding",
          backLink: "/user/data",
          requireAuth: true,
          requireAdmin: false
        },
        component: () => import("pages/dashboard/NewFunding.vue")
      },
      {
        path: "/user/newFunding/:id",
        name: "ViewFunding",
        meta: {
          title: "Details of the Funding",
          backLink: "/user/data",
          requireAuth: true,
          requireAdmin: false
        },
        component: () => import("pages/dashboard/FundingView.vue")
      },
      {
        path: "/user/newCheckList",
        name: "newCheckList",
        meta: {
          title: "New Implementation checklist",
          backLink: "/user/data",
          requireAuth: true,
          requireAdmin: false
        },
        component: () => import("pages/dashboard/ImplementationChecklist.vue")
      },
      {
        path: "/user/newCheckList/:id",
        name: "viewCheckList",
        meta: {
          title: "Details of the Implementation checklist",
          backLink: "/user/data",
          requireAuth: true,
          requireAdmin: false
        },
        component: () =>
          import("pages/dashboard/ImplementationChecklistView.vue")
      },
      {
        path: "/user/newCheckList/edit/:id",
        name: "EditChecklist",
        meta: {
          title: "Edit Checklist",
          backLink: "/user/data",
          requireAuth: true,
          requireAdmin: false
        },
        component: () => import("pages/dashboard/ImplementationChecklist.vue")
      }
    ]
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
