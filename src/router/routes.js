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
          title: "Home",
          showInNavigation: true
        },
        icon: "/icons/Home.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/overview",
        name: "DataOverview",
        meta: {
          title: "Data Overview",
          showInNavigation: true
        },
        icon: "/icons/Documents.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/watchlist",
        name: "watchlist",
        meta: {
          title: "My Watchlist",
          showInNavigation: true
        },
        icon: "/icons/Favorite.svg",
        component: () => import("pages/dashboard/Watchlist.vue")
      },
      {
        path: "/catkeytags",
        name: "CatKeyTags",
        meta: {
          title: "Categories & Keywords/Tags",
          showInNavigation: true
        },
        icon: "/icons/Hash.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/Administation/User",
        name: "AdministationUser",
        meta: {
          title: "User Administation",
          showInNavigation: true
        },
        icon: "/icons/Users.svg",
        component: () => import("pages/dashboard/AdminUser.vue")
      },
      {
        path: "/network",
        name: "Network",
        meta: {
          title: "My Network",
          showInNavigation: true
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
          backLink: "/network"
        },
        icon: "/icons/Users.svg",
        component: () => import("pages/dashboard/NetworkUser.vue")
      },
      {
        path: "/Administation/Areas",
        name: "AdministationAreas",
        meta: {
          title: "Administrative areas",
          showInNavigation: true
        },
        icon: "/icons/Municipality.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/stats",
        name: "Statistics&Archive",
        meta: {
          title: "Statistics & Archive",
          showInNavigation: true
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
          title: "Notifications"
        },
        icon: "/icons/Home.svg",
        component: () => import("pages/dashboard/Notifications.vue")
      },
      {
        path: "/user/data",
        name: "MyData",
        meta: {
          title: "My Data"
        },
        icon: "/icons/Home.svg",
        component: () => import("pages/dashboard/MyData.vue")
      },
      {
        path: "/user/settings",
        name: "settings",
        meta: {
          title: "Settings"
        },
        icon: "/icons/Settings.svg",
        component: () => import("pages/dashboard/Settings.vue")
      }
    ]
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
