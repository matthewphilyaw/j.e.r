import { UiCommandBar } from './ui.command.bar';
import { Input } from '@angular/core';

export class UiTitleCommandBar extends UiCommandBar {
  @Input() title: string;
  @Input() editable: boolean = false;
}