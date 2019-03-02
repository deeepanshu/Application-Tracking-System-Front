import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.css"]
})
export class EducationComponent implements OnInit {
  @Output() public increment = new EventEmitter<void>();
  @Output() public decrement = new EventEmitter<void>();

  education= [];

  educationForm = new FormGroup({
    institution: new FormControl(),
    degree: new FormControl(),
    yearStarted: new FormControl(),
    yearEnded: new FormControl(),
    stillPursuing: new FormControl(false)
  });

  addEducation($event) {
    let institution = this.educationForm.get('institution').value;
    let degree = this.educationForm.get('degree').value;
    let yearStarted = this.educationForm.get('yearStarted').value;
    let yearEnded = this.educationForm.get('yearEnded').value;
    let stillPursuing = this.educationForm.get('stillPursuing').value;
    if(institution && degree && yearStarted) {
      this.education.push({
        institution,
        degree,
        yearStarted,
        yearEnded,
        stillPursuing
      });
      this.educationForm.reset();
    } else {
      this.toastr.error('Enter all values');
    }
  }

  submitEducation(){
    if(this.education.length > 0){
      this.candidateService.addEducationToCandidate(this.education).subscribe((response) => {
        console.log(response);
        this.increment.emit();
      })
    }
    else {
      this.toastr.error('Add Education History!');
    }
  }

  goBack($event) {
    this.decrement.emit();
  }

  constructor(
    private toastr: ToastrService,
    private candidateService: CandidateService
  ) {}

  ngOnInit() {
    this.candidateService.getCandidateObjectList('education').subscribe((response) => {
      this.education = response.education;
      console.log(this.education);
    });
  }
}
