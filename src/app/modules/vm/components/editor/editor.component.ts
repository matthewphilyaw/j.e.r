import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  EditorFromTextArea, fromTextArea } from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/keymap/vim';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editorPane', { static: false }) editorRef: ElementRef;
  editor: EditorFromTextArea;

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
