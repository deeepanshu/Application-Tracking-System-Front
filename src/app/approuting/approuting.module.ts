import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AdminComponent } from '../admin/admin.component';
import { JobsAdminComponent } from '../admin/jobs-admin/jobs-admin.component';
import { CandidatesAdminComponent } from '../admin/candidates-admin/candidates-admin.component';

import { SignupComponent } from '../user/signup/signup.component';
import { LoginComponent } from '../user/login/login.component';
import { CandidateComponent } from '../user/candidate/candidate.component';
import { InterviewerComponent } from '../user/interviewer/interviewer.component';
import { RoleGuardService as RoleGuard} from './../services/role-guard.service';
import { AuthGuardService as AuthGuard} from './../services/auth-guard.service';
import { DepartmentsAdminComponent } from '../admin/departments-admin/departments-admin.component';
import { InterviewersAdminComponent } from '../admin/interviewers-admin/interviewers-admin.component';
import { AddJobsAdminComponent } from '../admin/jobs-admin/add-jobs-admin/add-jobs-admin.component';
import { ListJobsAdminComponent } from '../admin/jobs-admin/list-jobs-admin/list-jobs-admin.component';
import { AddDepartmentAdminComponent } from '../admin/departments-admin/add-department-admin/add-department-admin.component';
import { ListDepartmentAdminComponent } from '../admin/departments-admin/list-department-admin/list-department-admin.component';
import { ListCandidatesAdminComponent } from '../admin/candidates-admin/list-candidates-admin/list-candidates-admin.component';
import { AddInterviewersAdminComponent } from '../admin/interviewers-admin/add-interviewers-admin/add-interviewers-admin.component';
import { ListInterviewersAdminComponent } from '../admin/interviewers-admin/list-interviewers-admin/list-interviewers-admin.component';
import { JobsComponent } from '../user/jobs/jobs.component';
import { VerificationComponent } from '../user/signup/verification/verification.component';
import { JobDetailsComponent } from '../user/job-details/job-details.component';
import { InterviewsAdminComponent } from '../admin/interviews-admin/interviews-admin.component';
import { AssignInterviewsAdminComponent } from '../admin/interviews-admin/assign-interviews-admin/assign-interviews-admin.component';
import { ListInterviewsAdminComponent } from '../admin/interviews-admin/list-interviews-admin/list-interviews-admin.component';
import { InterviewComponent } from '../user/interviewer/interview/interview.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'jobs', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent,  canActivate: [RoleGuard], data: {expectedRole: 'ROLE_ADMIN'}, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'jobs', component: JobsAdminComponent, children: [
      {path: 'add', component: AddJobsAdminComponent},
      {path: 'list', component: ListJobsAdminComponent}
    ]},
    {path: 'candidates', component: CandidatesAdminComponent, children: [
      {path: 'list', component: ListCandidatesAdminComponent}
    ]},
    {path: 'departments', component: DepartmentsAdminComponent, children: [
      {path: 'add', component: AddDepartmentAdminComponent},
      {path: 'list', component: ListDepartmentAdminComponent}
    ]},
    {path: 'interviewers', component: InterviewersAdminComponent, children: [
      {path: 'add', component: AddInterviewersAdminComponent},
      {path: 'list', component: ListInterviewersAdminComponent}
    ]},
    {path: 'interviews', component: InterviewsAdminComponent, children: [
      {path: 'assign', component: AssignInterviewsAdminComponent},
      {path: 'list', component: ListInterviewsAdminComponent}
    ]}
  ]},
  {path: 'signup', component: SignupComponent},
  {path: 'signup/verify/:token', component: VerificationComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'candidate', component: CandidateComponent, canActivate: [RoleGuard], data: {expectedRole: 'ROLE_CANDIDATE'}},
  {path: 'interviewer', component: InterviewerComponent, canActivate: [RoleGuard], data: {expectedRole: 'ROLE_INTERVIEWER'}},
  {path: 'interviewer/interview/:jobid/:candidateid', component: InterviewComponent, canActivate: [RoleGuard], data: {expectedRole: 'ROLE_INTERVIEWER'}},
  {path: 'jobs', component: JobsComponent},
  {path: 'jobs/:jobId', component: JobDetailsComponent},
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
