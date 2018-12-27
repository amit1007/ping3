import { Routes } from "@angular/router";


export const Full_ROUTES:Routes=[
    {
        path:'',
        loadChildren:'./LoginModule/login.module#LoginModule'
    },
    {
        path: 'admin',
        loadChildren:'./Admin/admin.module#AdminModule'
        // loadChildren:'./Admin/admin.module#AdminModule',
    },
    {
      path: 'login',
      loadChildren:'./LoginModule/login.module#LoginModule'
      // loadChildren:'./Admin/admin.module#AdminModule',
    },
    {
      path: 'pingAlert',
      loadChildren:'./PingAlert/pingAlert.module#PingAlertModule'
      // loadChildren:'./Admin/admin.module#AdminModule',
    },
    {
        path: 'SuperAdmin',
        loadChildren:'./SuperAdmin/super-admin.module#SuperAdminModule'
        // loadChildren:'./Admin/admin.module#AdminModule',
      },
    
]