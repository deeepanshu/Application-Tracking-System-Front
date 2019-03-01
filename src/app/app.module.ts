import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApproutingModule } from './approuting/approuting.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { JobsAdminComponent } from './admin/jobs-admin/jobs-admin.component';
import { AddJobsAdminComponent } from './admin/jobs-admin/add-jobs-admin/add-jobs-admin.component';
import { ListJobsAdminComponent } from './admin/jobs-admin/list-jobs-admin/list-jobs-admin.component';
import { CandidatesAdminComponent } from './admin/candidates-admin/candidates-admin.component';
import { ListCandidatesAdminComponent } from './admin/candidates-admin/list-candidates-admin/list-candidates-admin.component';
import { ListSkillsJobsComponent } from './admin/jobs-admin/list-skills-jobs/list-skills-jobs.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JobCardsComponent } from './admin/jobs-admin/job-cards/job-cards.component';
import { LongDateTimeToDatePipe } from './pipes/long-date-time-to-date.pipe';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CandidateComponent } from './user/candidate/candidate.component';
import { InterviewerComponent } from './user/interviewer/interviewer.component';
import { InterviewersAdminComponent } from './admin/interviewers-admin/interviewers-admin.component';
import { AddInterviewersAdminComponent } from './admin/interviewers-admin/add-interviewers-admin/add-interviewers-admin.component';
import { ListInterviewersAdminComponent } from './admin/interviewers-admin/list-interviewers-admin/list-interviewers-admin.component';
import { DepartmentsAdminComponent } from './admin/departments-admin/departments-admin.component';
import { AddDepartmentAdminComponent } from './admin/departments-admin/add-department-admin/add-department-admin.component';
import { ListDepartmentAdminComponent } from './admin/departments-admin/list-department-admin/list-department-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    JobsAdminComponent,
    AddJobsAdminComponent,
    ListJobsAdminComponent,
    CandidatesAdminComponent,
    ListCandidatesAdminComponent,
    ListSkillsJobsComponent,
    JobCardsComponent,
    LongDateTimeToDatePipe,
    LoginComponent,
    SignupComponent,
    CandidateComponent,
    InterviewerComponent,
    InterviewersAdminComponent,
    AddInterviewersAdminComponent,
    ListInterviewersAdminComponent,
    DepartmentsAdminComponent,
    AddDepartmentAdminComponent,
    ListDepartmentAdminComponent
  ],
  imports: [
    BrowserModule,
    ApproutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
