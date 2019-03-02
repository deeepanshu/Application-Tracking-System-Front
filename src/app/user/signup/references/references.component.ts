import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from 'src/app/services/candidate.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: "app-references",
  templateUrl: "./references.component.html",
  styleUrls: ["./references.component.css"]
})
export class ReferencesComponent implements OnInit {

  @Output() public increment = new EventEmitter<void>();
  @Output() public decrement = new EventEmitter<void>();
  

  references= [];
  
  referenceForm = new FormGroup({
    name: new FormControl(),
    organisationName:  new FormControl(),
    position:  new FormControl(),
    email:  new FormControl(),
    mobile:  new FormControl()
  });

  addReference($event) {
    let name = this.referenceForm.get('name').value;
    let organisationName = this.referenceForm.get('organisationName').value;
    let position = this.referenceForm.get('position').value;
    let email = this.referenceForm.get('email').value;
    let mobile = this.referenceForm.get('mobile').value;
    if(name && organisationName && position && email && mobile) {
      this.references.push({
        name,
        organisationName,
        position,
        email,
        mobile
      });
      this.referenceForm.reset();
    } else {
      this.toastr.error('Enter all values');
    }
  }

  submitReference(){
    if(this.references.length > 1){
      this.candidateService.addReferenceToCandidate(this.references).subscribe((response) => {
        console.log(response);
        this.increment.emit();
      })
    }
    else {
      this.toastr.error('Atleast 3 references!');
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
    this.candidateService.getCandidateObjectList('references').subscribe((response) => {
      this.references = response.references;
      console.log(this.references);
    });
  }
}
