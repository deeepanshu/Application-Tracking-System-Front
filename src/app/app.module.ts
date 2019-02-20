import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApproutingModule } from './approuting/approuting.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { JobsAdminComponent } from './admin/jobs-admin/jobs-admin.component';
import { AddJobsAdminComponent } from './admin/jobs-admin/add-jobs-admin/add-jobs-admin.component';
import { ListJobsAdminComponent } from './admin/jobs-admin/list-jobs-admin/list-jobs-admin.component';
import { CandidatesAdminComponent } from './admin/candidates-admin/candidates-admin.component';
import { ListCandidatesAdminComponent } from './admin/candidates-admin/list-candidates-admin/list-candidates-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    JobsAdminComponent,
    AddJobsAdminComponent,
    ListJobsAdminComponent,
    CandidatesAdminComponent,
    ListCandidatesAdminComponent
  ],
  imports: [
    BrowserModule,
    ApproutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
