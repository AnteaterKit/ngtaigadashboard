import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDashboardComponent } from './app-dashboard.component';
import { DashboardRountingModule } from './dashboard.routing';
import { TuiIslandModule } from '@taiga-ui/kit';
import {TuiAxesModule, TuiBarChartModule, TuiLineChartModule, TuiPieChartModule, TuiRingChartModule} from '@taiga-ui/addon-charts';
import { IslandDetailModule } from '../island-detail/island-detail.module';


@NgModule({
  imports: [
    CommonModule,
    DashboardRountingModule,
    TuiIslandModule,
    TuiAxesModule,
    TuiBarChartModule,
    TuiLineChartModule,
    IslandDetailModule,
    TuiPieChartModule,
    TuiRingChartModule,
  ],
  declarations: [AppDashboardComponent],
  exports: [AppDashboardComponent]
})
export class AppDashboardModule { }
