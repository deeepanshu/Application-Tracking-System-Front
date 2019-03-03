import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-list-candidates-admin',
  templateUrl: './list-candidates-admin.component.html',
  styleUrls: ['./list-candidates-admin.component.css']
})
export class ListCandidatesAdminComponent implements OnInit {

  loading: boolean = false;
  candidates: any[]= [];

  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.candidateService.getCandidates().subscribe((response) => {
      this.candidates = response;
      this.loading = false;
    } )
  }

}
