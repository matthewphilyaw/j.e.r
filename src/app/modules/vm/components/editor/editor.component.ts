import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { EditorFromTextArea, fromTextArea } from 'codemirror';
import { UiCommand, UiCommandStyle } from 'src/app/modules/ui/ui.module';
import { assemble } from '../../../../assembler/risc-v.assembler';

import 'codemirror/mode/gas/gas';
import 'codemirror/keymap/vim';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editorPane', { static: false }) editorRef: ElementRef;
  editor: EditorFromTextArea;

  public fileCommands: UiCommand[] = [
    { name: 'save', id: 'save-file', style: UiCommandStyle.U1 },
  ];

  public vmCommands: UiCommand[] = [
    { name: 'load', id: 'load-file', style: UiCommandStyle.U1 },
  ];

  constructor(private ngZone: NgZone) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.editor = fromTextArea(
        this.editorRef.nativeElement,
        {
          lineNumbers: true,
          mode: 'gas',
          theme: 'blackboard',
          keyMap: 'vim'
        });
    });
  }

  handleButton(event: string) {
    switch (event.toLowerCase()) {
      case 'load-file':
      const program = this.editor.getValue();
      console.log(program);
      assemble(program);
      break;
    }
  }
}
