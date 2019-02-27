import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-skills-jobs',
  templateUrl: './list-skills-jobs.component.html',
  styleUrls: ['./list-skills-jobs.component.css']
})
export class ListSkillsJobsComponent implements OnInit {

  @Input() skill: any;

  constructor() { }

  ngOnInit() {
  }

}
