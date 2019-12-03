import { Component, OnInit } from '@angular/core';
import { UiCommand, UiCommandStyle } from 'src/app/modules/ui/ui.module';

export interface FileItem {
  id: string;
  name: string;
}

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {
  public activeFileId: string = 'asdf45';


  public files: FileItem[] = [
    {
      id: '1235',
      name: 'Some File'
    },
    {
      id: 'asdf45',
      name: 'Some Other File'
    },
    {
      id: '123fj4k1',
      name: 'Another File'
    }
  ];

  public commands: UiCommand[] = [
    { name: 'new', id: 'add-file', style: UiCommandStyle.U2 },
  ];

  constructor() { }

  ngOnInit() {

  }

  activateFile(fileId: string) {
    this.activeFileId = fileId;
  }

  deleteFile(fileId: string) {
    console.log(fileId);
  }

  handleButton(event: string) {
    console.log(event);
    if (event.toLowerCase() === 'add-file') {
      this.files.push({
        id: (this.files.length + 1).toString(),
        name: 'NewFile'
      });
    }
  }
}
