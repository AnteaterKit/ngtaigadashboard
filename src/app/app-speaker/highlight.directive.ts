import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Directive, ElementRef, Inject, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export interface CurrentCharPosition {
  charIndex: number;
  charLength: number;
}

@Directive({
  selector: '[highlight]',
  host: {
    '[style.position]': '"relative"',
    '[style.zIndex]': 'p',
  }
})
export class HighlightDirective implements OnChanges {
  @Input()
  currentCharPosition: CurrentCharPosition | undefined;
  private readonly highlight: HTMLElement = this.setUpHighlight();
  private readonly treeWalker = this.documentRef.createTreeWalker(
    this.elementRef.nativeElement,
    NodeFilter.SHOW_TEXT,
    null,
  );
  constructor(@Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(Renderer2) private readonly renderer: Renderer2,
    private ref: ChangeDetectorRef) {
      ref.detach();
      setInterval(() => {
        this.ref.detectChanges();
      }, 5);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateStyles();
  }

  updateStyles(): void {
    if (!this.currentCharPosition) {
      this.highlight.style.display = 'none';
      return;
    }

    this.highlight.style.display = 'none';
    this.treeWalker.currentNode = this.elementRef.nativeElement;

    do {
      const element = this.treeWalker.currentNode as HTMLElement;
      if (element.tagName) {
        continue;
      }
      const range = this.documentRef.createRange();
      range.setStart(this.treeWalker.currentNode, this.currentCharPosition.charIndex);
      range.setEnd(this.treeWalker.currentNode,  this.currentCharPosition.charIndex +  this.currentCharPosition.charLength);

      const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
      const { left, top, width, height } = range.getBoundingClientRect();
      const { style } = this.highlight;

      style.left = this.px(left - hostRect.left + 4);
      style.top = this.px(top - hostRect.top);
      style.width = this.px(width);
      style.height = this.px(height);
      style.display = 'block';

    } while (this.treeWalker.nextNode());
  }

  private setUpHighlight(): HTMLElement {
    const highlight = this.renderer.createElement('div');
    const { style } = highlight;

    style.background = '#b572ff';
    style.zIndex = '-1';
    style.position = 'absolute';
    style.borderRadius = '4px';
    style.paddingRight = '4px';
    style.paddingLeft = '4px';
    this.renderer.appendChild(this.elementRef.nativeElement, highlight);

    return highlight;
  }

  px(value: number): string {
    return `${value}px`;
  }
}
