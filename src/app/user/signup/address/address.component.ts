import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CandidateService } from "src/app/services/candidate.service";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.css"]
})
export class AddressComponent implements OnInit {
  @Output() public increment = new EventEmitter<void>();
  @Output() public decrement = new EventEmitter<void>();

  address: any;

  addressForm = new FormGroup({
    houseAndFlat: new FormControl(),
    locality: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    country: new FormControl()
  });

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.candidateService
      .getCandidateObjectList("address")
      .subscribe(response => {
        this.address = response.address;
        console.log(this.address);
        if (this.address) {
          this.addressForm.setValue({
            houseAndFlat: this.address.houseAndFlat,
            locality: this.address.locality,
            city: this.address.city,
            state: this.address.state,
            country: this.address.country
          });
        }
      });
  }

  resetForm() {
    this.addressForm.reset();
  }
  submitAddress() {
    this.candidateService
      .addAddressToCandidate(this.addressForm.value)
      .subscribe(response => {
        this.increment.emit();
        console.log(response);
      });
  }
}
