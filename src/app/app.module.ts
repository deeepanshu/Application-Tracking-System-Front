import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ApproutingModule } from "./approuting/approuting.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthInterceptor } from "./services/auth.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { AdminComponent } from "./admin/admin.component";
import { JobsAdminComponent } from "./admin/jobs-admin/jobs-admin.component";
import { AddJobsAdminComponent } from "./admin/jobs-admin/add-jobs-admin/add-jobs-admin.component";
import { ListJobsAdminComponent } from "./admin/jobs-admin/list-jobs-admin/list-jobs-admin.component";
import { CandidatesAdminComponent } from "./admin/candidates-admin/candidates-admin.component";
import { ListCandidatesAdminComponent } from "./admin/candidates-admin/list-candidates-admin/list-candidates-admin.component";
import { ListSkillsJobsComponent } from "./admin/jobs-admin/list-skills-jobs/list-skills-jobs.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JobCardsComponent } from "./admin/jobs-admin/job-cards/job-cards.component";
import { LongDateTimeToDatePipe } from "./pipes/long-date-time-to-date.pipe";
import { LoginComponent } from "./user/login/login.component";
import { SignupComponent } from "./user/signup/signup.component";
import { CandidateComponent } from "./user/candidate/candidate.component";
import { InterviewerComponent } from "./user/interviewer/interviewer.component";
import { InterviewersAdminComponent } from "./admin/interviewers-admin/interviewers-admin.component";
import { AddInterviewersAdminComponent } from "./admin/interviewers-admin/add-interviewers-admin/add-interviewers-admin.component";
import { ListInterviewersAdminComponent } from "./admin/interviewers-admin/list-interviewers-admin/list-interviewers-admin.component";
import { DepartmentsAdminComponent } from "./admin/departments-admin/departments-admin.component";
import { AddDepartmentAdminComponent } from "./admin/departments-admin/add-department-admin/add-department-admin.component";
import { ListDepartmentAdminComponent } from "./admin/departments-admin/list-department-admin/list-department-admin.component";
import { JobsComponent } from "./user/jobs/jobs.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { BooleanToMessagePipe } from "./boolean-to-message.pipe";
import { VerificationComponent } from "./user/signup/verification/verification.component";
import { ReferencesComponent } from "./user/signup/references/references.component";
import { MobileVerificationComponent } from "./user/signup/mobile-verification/mobile-verification.component";
import { EducationComponent } from "./user/signup/education/education.component";
import { EmploymentComponent } from "./user/signup/employment/employment.component";
import { UploadsComponent } from "./user/signup/uploads/uploads.component";
import { AddressComponent } from "./user/signup/address/address.component";
import { FinalizeComponent } from "./user/signup/finalize/finalize.component";
import { JobDetailsComponent } from "./user/job-details/job-details.component";
import { HeaderComponent } from "./header/header.component";
import { InterviewsAdminComponent } from "./admin/interviews-admin/interviews-admin.component";
import { AssignInterviewsAdminComponent } from "./admin/interviews-admin/assign-interviews-admin/assign-interviews-admin.component";
import { ListInterviewsAdminComponent } from "./admin/interviews-admin/list-interviews-admin/list-interviews-admin.component";
import {MatInputModule} from '@angular/material';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { TitleCasePipe } from './title-case.pipe';
import { InterviewComponent } from './user/interviewer/interview/interview.component';
import { SafePipePipe } from './safe-pipe.pipe';

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
    ListDepartmentAdminComponent,
    JobsComponent,
    SpinnerComponent,
    BooleanToMessagePipe,
    VerificationComponent,
    ReferencesComponent,
    MobileVerificationComponent,
    EducationComponent,
    EmploymentComponent,
    UploadsComponent,
    AddressComponent,
    FinalizeComponent,
    JobDetailsComponent,
    HeaderComponent,
    InterviewsAdminComponent,
    AssignInterviewsAdminComponent,
    ListInterviewsAdminComponent,
    TitleCasePipe,
    InterviewComponent,
    SafePipePipe
  ],
  imports: [
    BrowserModule,
    ApproutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
