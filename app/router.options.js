/**
 *    自定义路由
 * 1. 在根目录下创建 app文件
 * 2. 自定义路由的文件名 改为【 router.options.js 】
 * 3. 默认返回的函数 形参 自动注入 默认路由 【_routes】 
 *      我们把 自定义的路由 和 默认路由 拼接就可以返回了
 */

const customRoutes = [
    {
        path: "/home",
        name: "home",
        component: () => import("~/pages/testPinia.vue"),
    },
    {
        path: "/a666",
        redirect: "/home"
    },
    {
        path: "/roles",
        name: "roles",
        component: () => import("~/pages/roles.vue"),
        redirect: "/roles/admin",
        children: [
            {
                path: "admin",
                name: "admin",
                component: () => import("@/pages/roles/admin.vue")
            },
            {
                path: "other",
                name: "other",
                component: () => import("@/pages/roles/other.vue")
            }
        ]
    },
]

export default {
    // routes: (_routes) => {
    //     return [..._routes, ...customRoutes]
    // }
    //  concat 内置函数 不会自己看官网 MDN
    routes: (_routes) => _routes.concat(customRoutes)
}