import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { validLayout, attributeOutOfRange, validLayouts } from '../../common/ui.utility';
import { UiCommandBar } from '../../common/ui.command.bar';

@Component({
  selector: 'ui-cmd-bar',
  templateUrl: './cmd-bar.component.html',
  styleUrls: ['./cmd-bar.component.scss', '../../common/ui.scss']
})
export class CmdBarComponent extends UiCommandBar implements OnInit {
  @Output() buttonClickedEvent = new EventEmitter<string>();

  constructor() {
    super();
  }

  ngOnInit() {
    this.validateDirectionalInput('ui-cmd-bar', { 
      vdirRequired: false,
      hdirRequired: false
    });
  }

  protected buttonClicked(id: string) {
    this.buttonClickedEvent.emit(id);
  }
}
