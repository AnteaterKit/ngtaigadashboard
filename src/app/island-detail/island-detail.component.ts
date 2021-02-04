import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-island-detail',
  templateUrl: './island-detail.component.html',
  styleUrls: ['./island-detail.component.scss']
})
export class IslandDetailComponent implements OnInit {

  @Input()
  amount = 8212;
  @Input()
  percentValue = 0.522;
  @Input()
  isIncrease = true;
  @Input()
  duration = 'since last year';
  constructor() { }

  ngOnInit() {
  }

}
