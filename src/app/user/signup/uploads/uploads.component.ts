import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: "app-uploads",
  templateUrl: "./uploads.component.html",
  styleUrls: ["./uploads.component.css"]
})
export class UploadsComponent implements OnInit {
  @Output() public increment = new EventEmitter<void>();
  @Output() public decrement = new EventEmitter<void>();

  resumeFileName = "";
  introFileName = "";
  coverLetterFileName = "";
  certificatesName = "";
  uploadForm = new FormGroup({
    resume: new FormControl(),
    introduction: new FormControl(),
    coverLetter: new FormControl(),
    certificates: new FormControl()
  });

  constructor(
    private toastr: ToastrService,
    private candidateService: CandidateService
  ) {}

  ngOnInit() {}

  goBack($event) {
    this.decrement.emit();
  }
  onResumeChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get("resume").setValue(file);
      this.resumeFileName = file.name;
    }
  }
  onIntroChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get("introduction").setValue(file);
      this.introFileName = file.name;
    }
  }
  onCoverLetterChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get("coverLetter").setValue(file);
      this.coverLetterFileName = file.name;
    }
  }
  onCertificatesChange(event) {
    const files = event.target.files;
    this.uploadForm.get("certificates").setValue(files);
    console.log(files);
    Array.from(files).forEach((file: File) => {
      this.certificatesName += `${file.name},`;
    });
  }

  submitFiles(event){
    let formData = new FormData();
    formData.append('resume', this.uploadForm.get('resume').value);
    formData.append('introduction', this.uploadForm.get('introduction').value);
    formData.append('coverLetter', this.uploadForm.get('coverLetter').value);
    this.candidateService.addUploadsToCandidate(formData).subscribe((response) => {
      console.log(response);
      this.increment.emit();
      this.toastr.success('Files Saved');
    })
  }

}
