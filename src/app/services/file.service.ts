import { Injectable } from '@angular/core';
import { FileItemModel } from './models/file-item.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private files: FileItemModel[] = [];

  public createFile(fileName: string): void {
    this.files.push({
      id: (this.files.length + 1).toString(),
      name: 'NewFile'
    });
  }

  public getFiles(): FileItemModel[] {
    return this.files;
  }
}