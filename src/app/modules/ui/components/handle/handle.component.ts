import { Component, OnInit, Input, EventEmitter, ElementRef, Output } from '@angular/core';
import { validHDirs, validVDirs, attributeOutOfRange } from '../../common/ui.utility';
import { UiButton } from '../../common/ui.button';

@Component({
  selector: 'ui-handle',
  templateUrl: './handle.component.html',
  styleUrls: ['./handle.component.scss']
})
export class HandleComponent implements OnInit {
  @Input() title: string;
  @Input() hdir: string = 'left';
  @Input() vdir: string = 'top';
  @Input() buttons: UiButton[];

  @Output() buttonClickedEvent = new EventEmitter<string>();

  private _handleBarClasses: string[] = [];
  private _handleTransitionCornerClasses: string[] = [];

  get handleBarClasses(): string[] {
    return this._handleBarClasses;
  }

  get handleTransitionCornerClasses(): string[] {
    return this._handleTransitionCornerClasses;
  }

  constructor() { }

  ngOnInit() {
    this.hdir = this.hdir.toLowerCase();
    this.vdir = this.vdir.toLowerCase();

    if (!validHDirs.includes(this.hdir)) {
      this.hdirOutOfRange()
    }

    if (!validVDirs.includes(this.vdir)) {
      this.vdirOutOfRange();
    }

    this.buildHandleBarClasses();
    this.buildHandleTransitionCornerClasses();
  }

  protected buttonClicked(id: string) {
    this.buttonClickedEvent.emit(id);
  }

  private buildHandleBarClasses() {
    this._handleBarClasses = [
      'handle__bar',  
      `handle__cap-${this.hdir}`,
      `handle__text-space-${this.hdir}`
    ];

    if (this.vdir === 'bottom') {
      this._handleBarClasses.push(
        'handle__pull-bottom'
      );
    }
  }

  private buildHandleTransitionCornerClasses() {
    this._handleTransitionCornerClasses = [
      'handle__transition-inside-corner',
      `handle__transition-${this.vdir}`,
      `handle__transition-rad-${this.vdir}-${this.hdir}`
    ];
  }

  private hdirOutOfRange() {
    throw new Error(attributeOutOfRange('ui-handle', 'hdir', this.hdir, validHDirs));
  }

  private vdirOutOfRange() {
    throw new Error(attributeOutOfRange('ui-handle', 'vdir', this.vdir, validVDirs));
  }

}
