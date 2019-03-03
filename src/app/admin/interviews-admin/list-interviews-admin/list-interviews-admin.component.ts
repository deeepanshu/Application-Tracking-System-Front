import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-list-interviews-admin',
  templateUrl: './list-interviews-admin.component.html',
  styleUrls: ['./list-interviews-admin.component.css']
})
export class ListInterviewsAdminComponent implements OnInit {

  interviews: any[] = [];
  loading: boolean = false;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.adminService.getInterviews().subscribe((response) => {
      this.interviews = response;
      this.loading = false;
    })
  }

}
