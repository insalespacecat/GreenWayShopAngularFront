import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPerOrderDialogComponent } from './items-per-order-dialog.component';

describe('ItemsPerOrderDialogComponent', () => {
  let component: ItemsPerOrderDialogComponent;
  let fixture: ComponentFixture<ItemsPerOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsPerOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsPerOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
