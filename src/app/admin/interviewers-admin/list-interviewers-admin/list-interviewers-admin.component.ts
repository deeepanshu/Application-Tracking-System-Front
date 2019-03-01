import { Component, OnInit } from '@angular/core';
import { InterviewersService } from 'src/app/services/interviewers.service';

@Component({
  selector: 'app-list-interviewers-admin',
  templateUrl: './list-interviewers-admin.component.html',
  styleUrls: ['./list-interviewers-admin.component.css']
})
export class ListInterviewersAdminComponent implements OnInit {

  interviewers: Interviewer[] = [];

  constructor(
    private interviewerService: InterviewersService
  ) { }

  getInterviewers() {
    this.interviewerService.getAllInterviewers().subscribe((response) => {
      this.interviewers = response;
    });
  }

  ngOnInit() {
    this.getInterviewers();
  }

}
