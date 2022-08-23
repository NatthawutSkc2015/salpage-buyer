import { createRouter, createWebHistory } from "vue-router"

import GeneralLayout  from "../layouts/GeneralLayout.vue"
import AdminLayout    from "../layouts/AdminLayout.vue"
import BlackLayout    from "../layouts/BlackLayout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: "/",
      component: AdminLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard.vue")
        }
      ]
    },
    
    // -------------- Product ---------------
    {
      path: "/products",
      name: "products",
      component : AdminLayout,
      redirect: "/products/manage",
      children: [
        {
          path: "manage",
          component: () => import("../views/products/Manage.vue")
        },
        {
          path: ":id",
          component: () => import("../views/products/Detail.vue")
        }
      ]
    },
    // -------------- Order ---------------
    {
      path: "/orders",
      name: "orders",
      redirect: "/orders/manage",
      component : AdminLayout,
      children: [
        {
          path: "manage",
          name: "orders-manage",
          component: () => import("../views/orders/Manage.vue")
        },
        {
          path: "create",
          name: "order-create",
          component: () => import("../views/orders/_Form.vue")
        },
        {
          path: 'update/:id',
          name: "order-update",
          component: () => import("../views/orders/_Form.vue")
        }
      ]
    },
    //-------------- Salepage ----------------
    {
      path: "/salepages",
      name: "salepages",
      component : AdminLayout,
      redirect: "/salepages/manage",
      children: [
        {
          path: "manage",
          name: "salepages-manage",
          component: () => import("../views/salepages/Manage.vue")
        },
      ]
    },
    //-------------- User --------------------
    {
      path: "/users",
      name: "users",
      component: AdminLayout,
      redirect: "/users/manage",
      children:[
        {
          path: "manage",
          name: "user-manage",
          component: () => import("../views/users/Manage.vue")
        }
      ]
    },
    //---- Member Login & Register --------------
    {
      path: "/member",
      redirect: "/member/login",
      component : GeneralLayout,
      children: [
        {
          path: "login",
          name: "member-login",
          component: () => import("../views/Login.vue")
        },
        {
          path: "register",
          name: "member-register",
          component: () => import("../views/Register.vue")
        },
        {
          path: "forgot-password",
          name: "member-forgot-password",
          component: () => import("../views/ForgotPassword.vue")
        },
        {
          path: "change-password",
          name: "member-change-password",
          component: () => import("../views/ChangePassword.vue")
        }
      ]
    },
    {
      path: "/manual",
      name: "manual",
      component : GeneralLayout,
      children: [
        {
          path: "/",
          component: () => import("../views/Manual.vue")
        },
      ]
    },
    {
      path: "/components",
      component: BlackLayout,
      children: [
        {
          path: "",
          name: "components",
          component: () => import("../views/Components.vue")
        }
      ]
    },
    {
      path: "/404",
      name: "notFound",
      component: () => import("../views/p404.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ]
})

export default router
