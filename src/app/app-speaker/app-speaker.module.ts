import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSpeakerComponent } from './app-speaker.component';
import { SpeakerRountingModule } from './speaker.routing';
import { FormsModule } from '@angular/forms';
import { SpeechSynthesisModule } from '@ng-web-apis/speech';
import { HighlightDirective } from './highlight.directive';
import { TuiScrollService } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TuiButtonModule,
    SpeakerRountingModule,
    SpeechSynthesisModule
  ],
  declarations: [AppSpeakerComponent, HighlightDirective],
  exports: [AppSpeakerComponent],
  providers: [ TuiScrollService ]
})
export class AppSpeakerModule { }
