import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppSpeakerComponent } from './app-speaker.component';
const routes: Routes = [
  {
    path: '',
    component: AppSpeakerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakerRountingModule { }
