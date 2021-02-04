import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SpeechSynthesisUtteranceOptions } from '@ng-web-apis/speech';
import { tuiPure, TuiScrollService } from '@taiga-ui/cdk';
import { CurrentCharPosition } from './highlight.directive';

@Component({
  selector: 'app-app-speaker',
  templateUrl: './app-speaker.component.html',
  styleUrls: ['./app-speaker.component.scss']
})
export class AppSpeakerComponent {
  @ViewChild('scrollRef')
  scrollRef!: ElementRef;
  @ViewChildren('item')
  items!: QueryList<ElementRef>;
  voice = null;
  paused = true;
  currentPosition: CurrentCharPosition | undefined;
  selectedBlock: number;
  prevSelectedBlock: number;
  text = 'Web Audio API has been around for a while now and there are lots of great articles about it. So I will not go into details regarding the API. What I will tell you is Web Audio can be Angular’s best friend if you introduce it well. So let’s do this.';
  texts: any = [];
  constructor(@Inject(TuiScrollService) private readonly scrollService: TuiScrollService) {
    this.texts.push(this.text);
    this.texts.push('In Web Audio API you create a graph of audio nodes that process the sound passing through them. They can change volume, introduce delay or distort the signal. Browsers have special AudioNodes with various parameters to handle this. Initially, one would create them with factory functions of AudioContext:');
    this.texts.push('But since then they became proper constructors which means you can extend them. This allows us to elegantly and declaratively use Web Audio API in Angular.');
    this.texts.push('Angular directives are classes and they can extend existing native classes. Typical feedback loop to create echo effect with Web Audio looks like this:');
    this.texts.push('We can see that vanilla code is purely imperative. We create objects, set parameters, manually assemble the graph using connect method. In the example above we use HTML audio tag. When user presses play he would hear echo on his audio file. We will replicate this case using directives. AudioContext will be delivered through Dependency Injection.');
    this.texts.push('Both GainNode and DelayNode have only one parameter each — gain and delay time. That is not just a number, it is an AudioParam. We will see what that means a bit later.');
    this.texts.push('To declaratively link our nodes into graph we will add AUDIO_NODE token. All our directives will provide it.');
    this.texts.push('Directives take closest node from DI and connect with it. We’ve also added exportAs — it allows us to grab node with template reference variables. Now we can build graph with template:');
    this.texts.push('To be able to create loops like in the echo example above Dependency Injection is not enough. We will make a special directive. It would allow us to pass node as input to connect to it:');

    this.selectedBlock = 0;
    this.prevSelectedBlock = 0;
  }


  get options(): SpeechSynthesisUtteranceOptions {
    return this.getOptions(this.voice);
  }

  @tuiPure
  private getOptions(
    voice: SpeechSynthesisVoice | null,
  ): SpeechSynthesisUtteranceOptions {
    return {
      lang: 'en-US',
      voice,
    };
  }

  onWaTextToSpeechBoundary($event: SpeechSynthesisEvent): void {
    // console.log($event);
    this.updateHighlight($event);

    if (this.texts[this.selectedBlock].length === $event.charIndex + 1) {
      this.text = '';
      this.selectedBlock++;
      this.text = this.texts[this.selectedBlock];
    }

    this.scroll(this.scrollRef);
    this.prevSelectedBlock = this.selectedBlock;
  }

  updateHighlight(data: SpeechSynthesisEvent): void {
    this.currentPosition = { charIndex: data.charIndex, charLength: data.charLength };
  }

  onEnd(item: string, index: number): void {

  }


  scroll({ nativeElement }: ElementRef<HTMLElement>): void {
    if (this.prevSelectedBlock === this.selectedBlock) {
      return;
    }


    const element = this.items.get(this.selectedBlock);
    const wrapperRect = nativeElement.getClientRects()[0];
    const currentRect = element?.nativeElement.getClientRects()[0];
    console.log(wrapperRect, currentRect);
    let top = 0;
    for (let index = 0; index < this.selectedBlock; index++) {
      const item = this.items.get(index);
      top += item?.nativeElement.getClientRects()[0].height + 24;
    }
    this.scrollService
      .scroll$(nativeElement, top, 0, 500)
      .subscribe();

  }



  pause(): void {
    console.log(this.paused);
    this.paused = !this.paused;
  }
}
