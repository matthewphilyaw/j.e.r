import { Component, OnInit, Input, EventEmitter, ElementRef, Output } from '@angular/core';
import { attributeOutOfRange, validHDir, validVDir, validVDirs, validHDirs } from '../../common/ui.utility';
import { UiCommand, UiCommandBar } from '../../common/ui.command.bar';

@Component({
  selector: 'ui-handle',
  templateUrl: './handle.component.html',
  styleUrls: ['./handle.component.scss']
})
export class HandleComponent extends UiCommandBar implements OnInit {
  @Input() title: string;
  @Input() hdir: string = 'left';
  @Input() vdir: string = 'top';

  private _handleBarClasses: string[] = [];
  private _handleTransitionCornerClasses: string[] = [];

  get handleBarClasses(): string[] {
    return this._handleBarClasses;
  }

  get handleTransitionCornerClasses(): string[] {
    return this._handleTransitionCornerClasses;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    if (!validHDir(this.hdir)) {
      this.hdirOutOfRange()
    }

    if (!validVDir(this.vdir)) {
      this.vdirOutOfRange();
    }

    this.buildHandleBarClasses();
    this.buildHandleTransitionCornerClasses();
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
    throw new Error(attributeOutOfRange('ui-handle', 'hdir', this.hdir, validVDirs));
  }

  private vdirOutOfRange() {
    throw new Error(attributeOutOfRange('ui-handle', 'vdir', this.vdir, validHDirs));
  }

}
