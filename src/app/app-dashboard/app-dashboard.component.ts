import { Component, OnInit } from '@angular/core';
import { TUI_DEFAULT_STRINGIFY } from '@taiga-ui/cdk';
import { TuiPoint } from '@taiga-ui/core';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit {

  value: Array<TuiPoint>;
  valuePie = [40, 30, 20, 10];
  constructor() {
    this.value = new Array<TuiPoint>();
    this.value.push([50, 50]);
    this.value.push([100, 75]);
    this.value.push([150, 50]);
    this.value.push([200, 150]);
    this.value.push([300, 190]);
    this.value.push([350, 90]);
  }


  readonly stringify = TUI_DEFAULT_STRINGIFY;

  ngOnInit() {
  }

}
