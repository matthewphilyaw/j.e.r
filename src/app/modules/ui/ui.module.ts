import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeComponent } from './components/blade/blade.component';
import { HandleComponent } from './components/handle/handle.component';
import { CmdBarComponent } from './components/cmd-bar/cmd-bar.component';


// export the UiButton class
export { UiCommand, UiCommandStyle } from './common/ui.command.bar';

@NgModule({
  declarations: [BladeComponent, HandleComponent, CmdBarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BladeComponent,
    HandleComponent,
    CmdBarComponent
  ]
})
export class UiModule { }

