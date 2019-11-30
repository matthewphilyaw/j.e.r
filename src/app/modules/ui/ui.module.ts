import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeComponent } from './components/blade/blade.component';
import { HandleComponent } from './components/handle/handle.component';


// export the UiButton class
export { UiButton } from './common/ui.button';

@NgModule({
  declarations: [BladeComponent, HandleComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BladeComponent,
    HandleComponent
  ]
})
export class UiModule { }

