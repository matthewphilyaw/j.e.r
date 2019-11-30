import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { VmComponent } from './pages/vm/vm.component';
import { EditorComponent } from './components/editor/editor.component';
import { UiModule } from '../ui/ui.module';



@NgModule({
  declarations: [FileExplorerComponent, VmComponent, EditorComponent],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [
    VmComponent
  ]
})
export class VmModule { }
