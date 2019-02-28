import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-jobs-admin',
  templateUrl: './list-jobs-admin.component.html',
  styleUrls: ['./list-jobs-admin.component.css']
})
export class ListJobsAdminComponent implements OnInit {
  @Input() jobs: any;

  constructor() {}

  ngOnInit() {}
}
