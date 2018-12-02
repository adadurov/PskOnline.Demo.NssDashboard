import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthComponent } from '../auth/auth.component';
import { PsaReportComponent } from '../psa-report/psa-report.component';
import { NotFoundComponent } from '../not-found/not-found.component';


const routes: Routes = [
  // will be under hostname/psa-report
  { path: '', component: DashboardComponent, canActivate: [AuthGuard], data: { title: 'Обзор' } },
  { path: 'auth', component: AuthComponent, data: { title: 'Авторизация' } },
//  { path: 'psa-report', component: PsaReportComponent, canActivate: [AuthGuard], data: { title: 'Отчет' } },
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

