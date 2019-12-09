import { Component, OnInit, Input } from '@angular/core';
import { UiTitleCommandBar } from '../../common/ui.title.command.bar';


@Component({
  selector: 'ui-blade',
  templateUrl: './blade.component.html',
  styleUrls: ['./blade.component.scss', '../../common/ui.scss']
})
export class BladeComponent extends UiTitleCommandBar implements OnInit {
  @Input() reverse: boolean = false;

  private _bladeClasses: string[] = [];

  get bladeClasses(): string[] {
    return this._bladeClasses;
  }

  constructor() { 
    super();
  }

  ngOnInit() {
    this.validateDirectionalInput('ui-blade', {
      layoutRequired: false  
    });
    this.buildBladeClasses();
  }

  private buildBladeClasses() {
    this._bladeClasses = [
      'blade',
      `blade__corner-${this.vdir}-${this.hdir}`
    ];
  }
}
