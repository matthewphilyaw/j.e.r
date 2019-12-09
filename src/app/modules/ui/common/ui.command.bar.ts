import { Input, EventEmitter, Output } from '@angular/core';
import { UiDirectional } from './ui.directional';

export enum UiCommandStyle {
  U1 = 'u1',
  U2 = 'u2',
  U3 = 'u3'
}

export class UiCommand {
  public name: string;
  public id: string;
  public style: UiCommandStyle;
}

export class UiCommandBar extends UiDirectional {
  @Input() commands: UiCommand[] = []
  @Output() commandClickedEvent: EventEmitter<string> = new EventEmitter<string>();

  commandClicked(id: string) {
    this.commandClickedEvent.emit(id);
  }
}