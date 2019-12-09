import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { UiDirectional } from '../../common/ui.directional';


@Component({
  selector: 'ui-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss', '../../common/ui.scss']
})
export class TitleComponent extends UiDirectional implements OnInit {

  constructor() { 
    super();
  }

  @Input() title: string;
  @Input() editable: boolean = false;

  ngOnInit() {
    this.validateDirectionalInput('ui-title', {
      vdirRequired: false,
      layoutRequired: false
    });

    console.log(this.title);
    console.log(this.editable);
  }
}
