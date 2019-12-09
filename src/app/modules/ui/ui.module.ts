import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BladeComponent } from './components/blade/blade.component';
import { HandleComponent } from './components/handle/handle.component';
import { CmdBarComponent } from './components/cmd-bar/cmd-bar.component';
import { TitleComponent } from './components/title/title.component';


// export the UiButton class
export { UiCommand, UiCommandStyle } from './common/ui.command.bar';

@NgModule({
  declarations: [BladeComponent, HandleComponent, CmdBarComponent, TitleComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BladeComponent,
    HandleComponent,
    CmdBarComponent
  ]
})
export class UiModule { }

