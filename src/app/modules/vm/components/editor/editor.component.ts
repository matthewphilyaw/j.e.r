import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {  EditorFromTextArea, fromTextArea } from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/keymap/vim';
import { UiCommand, UiCommandStyle } from 'src/app/modules/ui/ui.module';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editorPane', { static: false }) editorRef: ElementRef;
  editor: EditorFromTextArea;

  public commands: UiCommand[] = [
    { name: 'save', id: 'save-file', style: UiCommandStyle.U1 },
    { name: 'del', id: 'del-file', style: UiCommandStyle.U3 },
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor = fromTextArea(
      this.editorRef.nativeElement,
      {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'blackboard',
        keyMap: 'vim'

      });

    this.editor.setValue(['.test', 'li'].join('\n'));
  }
}
