import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
<<<<<<< HEAD
import { HeaderComponent } from './core/components/header/header.component';
=======
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
>>>>>>> ce816209bdf599dc7ae0ac4ec32c56108afb9e48

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'social-media', loadChildren: () => import('./social-media/social-media.module').then(m => m.SocialMediaModule) },
  { path: 'complex-form', loadChildren: () => import('./complex-form/complex-form.module').then(m => m.ComplexFormModule) },
  { path: 'reactive-state', loadChildren: () => import('./reactive-state/reactive-state.module').then(m => m.ReactiveStateModule) },
  { path: '**', redirectTo: 'social-media'},
  // {path:'',component:HeaderComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
