import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { NologinGuard } from './guards/nologin.guard'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate : [NologinGuard]  },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule', canActivate : [AuthGuard] },
  { path: 'formulario', loadChildren: './pages/formulario/formulario.module#FormularioPageModule' },  { path: 'drawimage', loadChildren: './pages/drawimage/drawimage.module#DrawimagePageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
