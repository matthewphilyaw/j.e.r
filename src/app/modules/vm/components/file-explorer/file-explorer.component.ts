import { Component, OnInit } from '@angular/core';

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
    if (event.toLowerCase() === 'add-file') {
      this.files.push({
        id: (this.files.length + 1).toString(),
        name: 'NewFile'
      });
    }
  }
}
