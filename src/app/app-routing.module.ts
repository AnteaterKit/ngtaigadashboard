import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'speaker',
    loadChildren:  () => import('./app-speaker/app-speaker.module').then(x => x.AppSpeakerModule)
  },
  {
    path: 'dashboard',
    loadChildren:  () => import('./app-dashboard/app-dashboard.module').then(x => x.AppDashboardModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
