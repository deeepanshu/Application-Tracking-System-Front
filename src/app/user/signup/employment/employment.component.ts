import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CandidateService } from "src/app/services/candidate.service";

@Component({
  selector: "app-employment",
  templateUrl: "./employment.component.html",
  styleUrls: ["./employment.component.css"]
})
export class EmploymentComponent implements OnInit {
  @Output() public increment = new EventEmitter<void>();
  @Output() public decrement = new EventEmitter<void>();

  employments = [];

  employmentForm = new FormGroup({
    companyName: new FormControl(),
    profile: new FormControl(),
    timeSpent: new FormControl()
  });

  addEmployment($event) {
    let companyName = this.employmentForm.get("companyName").value;
    let profile = this.employmentForm.get("profile").value;
    let timeSpent = this.employmentForm.get("timeSpent").value;
    if (companyName && profile && timeSpent) {
      this.employments.push({
        companyName,
        profile,
        timeSpent
      });
      this.employmentForm.reset();
    } else {
      this.toastr.error("Enter all values");
    }
  }

  submitEmployments() {
    this.candidateService
      .addEmploymentToCandidate(this.employments)
      .subscribe(response => {
        console.log(response);
        this.increment.emit();
      });
  }

  goBack($event) {
    this.decrement.emit();
  }

  constructor(
    private toastr: ToastrService,
    private candidateService: CandidateService
  ) {}

  ngOnInit() {
    this.candidateService
      .getCandidateObjectList("employment")
      .subscribe(response => {
        this.employments = response.employment;
        console.log(this.employments);
      });
  }
}
