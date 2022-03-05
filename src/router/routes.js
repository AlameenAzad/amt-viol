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
        path: "/documents/:id",
        name: "documentView",
        component: () => import("pages/DocumentView.vue")
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
          title: "Home"
        },
        icon: "/icons/Home.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/overview",
        name: "DataOverview",
        meta: {
          title: "Data Overview"
        },
        icon: "/icons/Documents.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/watchlist",
        name: "watchlist",
        meta: {
          title: "My Watchlist"
        },
        icon: "/icons/Favorite.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/catkeytags",
        name: "CatKeyTags",
        meta: {
          title: "Categories & Keywords/Tags"
        },
        icon: "/icons/Hash.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/Administation/User",
        name: "AdministationUser",
        meta: {
          title: "User Administation"
        },
        icon: "/icons/Users.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/network",
        name: "Network",
        meta: {
          title: "My Network"
        },
        icon: "/icons/Network.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/Administation/Areas",
        name: "AdministationAreas",
        meta: {
          title: "Administrative areas"
        },
        icon: "/icons/Municipality.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/Stats",
        name: "Statistics&Archive",
        meta: {
          title: "Statistics & Archive "
        },
        icon: "/icons/Archive.svg",
        component: () => import("pages/dashboard/Home.vue")
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
          title: "Notifications"
        },
        icon: "/icons/Home.svg",
        component: () => import("pages/dashboard/Notifications.vue")
      }
    ]
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
