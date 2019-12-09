import { Component, OnInit, Input } from '@angular/core';
import { UiTitleCommandBar } from '../../common/ui.title.command.bar';

@Component({
  selector: 'ui-handle',
  templateUrl: './handle.component.html',
  styleUrls: ['./handle.component.scss', '../../common/ui.scss']
})
export class HandleComponent extends UiTitleCommandBar implements OnInit {

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
    this.validateDirectionalInput('ui-handle', {
      layoutRequired: false
    });

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
}
