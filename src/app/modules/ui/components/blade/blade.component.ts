import { Component, OnInit, Input } from '@angular/core';
import { validHDirs, validVDirs, attributeOutOfRange, validVDir, validHDir } from '../../common/ui.utility';
import { UiCommandBar } from '../../common/ui.command.bar';


@Component({
  selector: 'ui-blade',
  templateUrl: './blade.component.html',
  styleUrls: ['./blade.component.scss']
})
export class BladeComponent extends UiCommandBar implements OnInit {
  @Input() hdir: string = 'left';
  @Input() vdir: string = 'top';
  @Input() reverse: boolean = false;

  @Input() title: string;

  private _bladeClasses: string[] = [];

  get bladeClasses(): string[] {
    return this._bladeClasses;
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

    this.buildBladeClasses();
  }

  private buildBladeClasses() {
    this._bladeClasses = [
      'blade',
      `blade__corner-${this.vdir}-${this.hdir}`
    ];
  }

  private hdirOutOfRange() {
    throw new Error(attributeOutOfRange('ui-blade', 'hdir', this.hdir, validHDirs));
  }

  private vdirOutOfRange() {
    throw new Error(attributeOutOfRange('ui-blade', 'vdir', this.vdir, validVDirs));
  }

}
