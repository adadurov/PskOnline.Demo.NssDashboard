import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientAuthComponent } from '../client-auth/client-auth.component';
import { EmployeeSelectorComponent } from '../employee-selector/employee-selector.component';
import { AssessmentComponent } from '../assessment/assessment.component';

const routes: Routes = [
  {
      path: '',
      component: null,
  },
  {
    path: '/auth',
    component: ClientAuthComponent,
  },
  {
    path: '/select',
    component: EmployeeSelectorComponent,
  },
  {
    path: '/assess',
    component: AssessmentComponent,
  },
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

