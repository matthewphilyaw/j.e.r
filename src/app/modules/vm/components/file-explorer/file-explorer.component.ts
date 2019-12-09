import { Component, OnInit } from '@angular/core';
import { UiCommand, UiCommandStyle } from 'src/app/modules/ui/ui.module';
import { FileService } from '../../../../services/file.service';
import { FileItemModel } from 'src/app/services/models/file-item.model';

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

  public commands: UiCommand[] = [
    { name: 'new', id: 'add-file', style: UiCommandStyle.U2 },
    { name: 'del', id: 'del-file', style: UiCommandStyle.U1 },
  ];

  get files(): FileItemModel[] {
    return this.fileService.getFiles();
  }

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit() {
    console.log('initting fexplorer');
  }



  activateFile(fileId: string) {
    this.activeFileId = fileId;
  }

  deleteFile(fileId: string) {
    console.log(fileId);
  }

  handleButton(event: string) {
    this.fileService.createFile(event);
  }
}
