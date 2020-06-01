import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductConfirmationDialogComponent } from './delete-product-confirmation-dialog.component';

describe('DeleteProductConfirmationDialogComponent', () => {
  let component: DeleteProductConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteProductConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProductConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProductConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
