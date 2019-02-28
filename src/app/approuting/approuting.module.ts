import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { JobsAdminComponent } from '../admin/jobs-admin/jobs-admin.component';
import { CandidatesAdminComponent } from '../admin/candidates-admin/candidates-admin.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { CandidateComponent } from '../candidate/candidate.component';
import { InterviewerComponent } from '../interviewer/interviewer.component';
import { RoleGuardService as RoleGuard} from './../services/role-guard.service';
const routes: Routes = [
  {path: 'admin', component: AdminComponent,  canActivate: [RoleGuard], data: {expectedRole: 'ROLE_ADMIN'}, children: [
    {path: 'jobs', component: JobsAdminComponent},
    {path: 'candidates', component: CandidatesAdminComponent}
  ]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'candidate', component: CandidateComponent, canActivate: [RoleGuard], data: {expectedRole: 'ROLE_CANDIDATE'}},
  {path: 'interviewer', component: InterviewerComponent, canActivate: [RoleGuard], data: {expectedRole: 'ROLE_INTERVIEWERS'}},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ApproutingModule { }
