import { Component, OnInit, Input } from '@angular/core';
import { validHDirs, validVDirs, attributeOutOfRange } from '../../common/ui.utility';


@Component({
  selector: 'ui-blade',
  templateUrl: './blade.component.html',
  styleUrls: ['./blade.component.scss']
})
export class BladeComponent implements OnInit {
  @Input() hdir: string = 'left';
  @Input() vdir: string = 'top';

  private _bladeClasses: string[] = [];

  get bladeClasses(): string[] {
    return this._bladeClasses;
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
