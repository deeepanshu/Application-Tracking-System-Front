import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {

  constructor(
    private candidateService: CandidateService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.candidateService.finalizeCandidateProfile().subscribe((response) => {
      if(response.success) {
        this.toastr.success("Registration Completed! You may login now.");
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      } else {
        this.toastr.error("Error Occured.");
        this.router.navigate(['login']);
      }
    });

  }

}
