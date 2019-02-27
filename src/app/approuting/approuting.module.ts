import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { JobsAdminComponent } from '../admin/jobs-admin/jobs-admin.component';
import { CandidatesAdminComponent } from '../admin/candidates-admin/candidates-admin.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { CandidateComponent } from '../candidate/candidate.component';
import { InterviewerComponent } from '../interviewer/interviewer.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, children: [
    {path: 'jobs', component: JobsAdminComponent},
    {path: 'candidates', component: CandidatesAdminComponent}
  ]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'candidate', component: CandidateComponent},
  {path: 'interviewer', component: InterviewerComponent}
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
