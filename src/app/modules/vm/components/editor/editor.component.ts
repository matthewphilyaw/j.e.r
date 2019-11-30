import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import "monaco-editor/esm/vs/editor/browser/controller/coreCommands.js";
import "monaco-editor/esm/vs/editor/contrib/find/findController.js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/mips/mips.contribution.js";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('editorPane', { static: false }) editorRef: ElementRef;
  editor: monaco.editor.IStandaloneCodeEditor;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor = monaco.editor.create(this.editorRef.nativeElement, {
      theme: 'vs-dark',
      language: 'mips',
      glyphMargin: true
    });

    this.editor.setValue(['.test', 'li'].join('\n'));

  }
}
