import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { validLayout, attributeOutOfRange, validLayouts } from '../../common/ui.utility';
import { UiCommandBar } from '../../common/ui.command.bar';

@Component({
  selector: 'ui-cmd-bar',
  templateUrl: './cmd-bar.component.html',
  styleUrls: ['./cmd-bar.component.scss']
})
export class CmdBarComponent extends UiCommandBar implements OnInit {
  @Input() layout: string = 'vertical';
  @Output() buttonClickedEvent = new EventEmitter<string>();

  get isVertical() {
    return this.layout === 'vertical';
  }

  get isHorizontal() {
    return this.layout === 'horizontal';
  }

  constructor() {
    super();
  }

  ngOnInit() {
    if (!validLayout(this.layout)) {
      throw new Error(attributeOutOfRange('ui-cmd-bar', 'layout', this.layout, validLayouts));
    }
  }

  protected buttonClicked(id: string) {
    this.buttonClickedEvent.emit(id);
  }
}
