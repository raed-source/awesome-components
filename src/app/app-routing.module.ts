import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'social-media', loadChildren: () => import('./social-media/social-media.module').then(m => m.SocialMediaModule) },
  { path: 'complex-form', loadChildren: () => import('./complex-form/complex-form.module').then(m => m.ComplexFormModule) },
  { path: '**', redirectTo: 'social-media'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
