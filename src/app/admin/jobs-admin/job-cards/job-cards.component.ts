import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-cards',
  templateUrl: './job-cards.component.html',
  styleUrls: ['./job-cards.component.css']
})
export class JobCardsComponent implements OnInit {

  @Input() job: any;

  constructor() { }

  ngOnInit() {
  }

}
