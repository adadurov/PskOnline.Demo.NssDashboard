import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthComponent } from '../components/auth/auth.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';


const routes: Routes = [
  // will be under hostname/psa-report
  { path: '', component: DashboardComponent, canActivate: [AuthGuard], data: { title: 'Обзор' } },
  { path: 'auth', component: AuthComponent, data: { title: 'Авторизация' } },
  { path: '**', component: NotFoundComponent, data: { title: 'Страница не найдена' } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
],
declarations: []
})
export class AppRoutingModule { }

