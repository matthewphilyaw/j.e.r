import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmdBarComponent } from './cmd-bar.component';

describe('CmdBarComponent', () => {
  let component: CmdBarComponent;
  let fixture: ComponentFixture<CmdBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmdBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmdBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
