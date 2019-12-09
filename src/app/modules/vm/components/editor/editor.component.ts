import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Input } from '@angular/core';

import {  EditorFromTextArea, fromTextArea } from 'codemirror';
import { UiCommand, UiCommandStyle } from 'src/app/modules/ui/ui.module';

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

  public commands: UiCommand[] = [
    { name: 'save', id: 'save-file', style: UiCommandStyle.U1 },
  ];

  constructor(private ngZone: NgZone) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.editor = fromTextArea(
        this.editorRef.nativeElement,
        {
          lineNumbers: true,
          mode: 'javascript',
          theme: 'blackboard',
          keyMap: 'vim'
        });
    });
  }
}
