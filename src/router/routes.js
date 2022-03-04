const routes = [
  {
    path: "/",

    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "landing",
        component: () => import("pages/Index.vue")
      }
    ]
  },
  {
    path: "/dashboard",

    component: () => import("layouts/dashboardLayout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        title: "Home",
        icon: "/icons/Home.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/overview",
        name: "DataOverview",
        title: "Data Overview",
        icon: "/icons/Documents.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/watchlist",
        name: "watchlist",
        title: "My Watchlist",
        icon: "/icons/Favorite.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/catkeytags",
        name: "CatKeyTags",
        title: "Categories & Keywords/Tags",
        icon: "/icons/Hash.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/Administation/User",
        name: "AdministationUser",
        title: "User Administation",
        icon: "/icons/Users.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/network",
        name: "Network",
        title: "My Network",
        icon: "/icons/Network.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/Administation/Areas",
        name: "AdministationAreas",
        title: "Administrative areas",
        icon: "/icons/Municipality.svg",
        component: () => import("pages/dashboard/Home.vue")
      },
      {
        path: "/Stats",
        name: "Statistics&Archive",
        title: "Statistics & Archive ",
        icon: "/icons/Archive.svg",
        component: () => import("pages/dashboard/Home.vue")
      }
    ]
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
