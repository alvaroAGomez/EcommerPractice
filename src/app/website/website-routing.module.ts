import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[

      {
        path:'',
        redirectTo: '/home',
        pathMatch:'full'
      },
      {
        path:"home", 
        component: HomeComponent
      },
      {
        path:"product/:id", 
        component: ProductDetailComponent
      },
      {
        path:"category/:id", 
        component: CategoryComponent
      },
      {
        path:"MyCart", 
        component: MycartComponent
      },
      {
        path:"login", 
        component: LoginComponent
      },
      {
        path:"register", 
        component: RegisterComponent
      },
      {
        path:"profile", 
        canActivate:[AuthGuard],
        component: ProfileComponent 
      },
      {
        path:"recovery", 
        component: RecoveryComponent
      },
      {
        path:"notFound", 
        component: NotFoundComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
