import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApproutingModule } from './approuting/approuting.module';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { JobsAdminComponent } from './admin/jobs-admin/jobs-admin.component';
import { AddJobsAdminComponent } from './admin/jobs-admin/add-jobs-admin/add-jobs-admin.component';
import { ListJobsAdminComponent } from './admin/jobs-admin/list-jobs-admin/list-jobs-admin.component';
import { CandidatesAdminComponent } from './admin/candidates-admin/candidates-admin.component';
import { ListCandidatesAdminComponent } from './admin/candidates-admin/list-candidates-admin/list-candidates-admin.component';
import { ListSkillsJobsComponent } from './admin/jobs-admin/list-skills-jobs/list-skills-jobs.component';
import { HttpClientModule } from '@angular/common/http';
import { JobCardsComponent } from './admin/jobs-admin/job-cards/job-cards.component';
import { LongDateTimeToDatePipe } from './pipes/long-date-time-to-date.pipe';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CandidateComponent } from './candidate/candidate.component';
import { InterviewerComponent } from './interviewer/interviewer.component';

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
    InterviewerComponent
  ],
  imports: [
    BrowserModule,
    ApproutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
