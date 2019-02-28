import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-add-jobs-admin',
  templateUrl: './add-jobs-admin.component.html',
  styleUrls: ['./add-jobs-admin.component.css']
})
export class AddJobsAdminComponent implements OnInit {

  @Output() public getJobs = new EventEmitter<void>();


  buttonTitle = 'Add New Job';
  toggle= false;
  profiles = ['Software Dev 1', 'Software Dev 2', 'Web Designer 1', 'Team Lead 1', 'Team Lead 2'];
  jobTypes = ['Full Time', 'Part Time', 'Intern'];
  proficiencyLevels = ['Basic', 'Medium', 'Advanced'];
  skillsRequired = [];

  addNewJobForm = new FormGroup({
    type: new FormControl(''),
    profile: new FormControl(''),
    hotJob: new FormControl(false),
    description: new FormControl(''),
    educationalRequirements: new FormControl(''),
    skillsRequired: new FormControl(''),
    location: new FormControl(''),
    experience: new FormControl(''),
    package: new FormControl(''),
    targetDate: new FormControl(''),
    numberOfVacancies: new FormControl(''),
    skillName: new FormControl(''),
    skillProficiency: new FormControl('')
  });

  constructor(

    private jobService: JobsService
  ) { }

  ngOnInit() {
  }

  addformtoggle(){
    this.toggle = !this.toggle;
    this.buttonTitle = this.toggle ? 'Cancel Adding' : 'Add New Job';
  }

  assignJobType(event) {
    this.addNewJobForm.get('type').setValue(event.target.value);
  }
  assignProfile(event) {
    this.addNewJobForm.get('profile').setValue(event.target.value);
    console.log(this.addNewJobForm.get('profile').value);
  }


  addSkill(event) {

    const skill = this.addNewJobForm.get('skillName').value;
    const proficiency = this.addNewJobForm.get('skillProficiency').value;
    console.log(skill, proficiency);
    if (skill && proficiency) {
      this.skillsRequired.push({skill, proficiency});
      this.addNewJobForm.get('skillName').reset();
      this.addNewJobForm.get('skillProficiency').reset();
      console.log(this.skillsRequired);
    }
  }

  resetSkill(event) {
    if (confirm('Are you sure to remove added skills?')) {
      this.skillsRequired = [];
    }
  }

  submitForm() {
    const formValue = {
      jobType: this.addNewJobForm.get('type').value,
      isHotJob: this.addNewJobForm.get('hotJob').value,
      targetDate: this.addNewJobForm.get('targetDate').value,
      profile: this.addNewJobForm.get('profile').value,
      package: this.addNewJobForm.get('package').value,
      description: this.addNewJobForm.get('description').value,
      educationalRequirements: this.addNewJobForm.get('educationalRequirements').value,
      skills: this.skillsRequired,
      blockedJobs: [],
      location: this.addNewJobForm.get('location').value,
      experience: this.addNewJobForm.get('experience').value,
      numberOfVacancies: this.addNewJobForm.get('numberOfVacancies').value
    };
    this.jobService.addJob(formValue).subscribe(response => {
      console.log(response);
    })
    console.log(formValue);
  }

}
