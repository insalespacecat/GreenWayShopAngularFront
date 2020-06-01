import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardAdminEditComponent } from './product-card-admin-edit.component';

describe('ProductCardAdminEditComponent', () => {
  let component: ProductCardAdminEditComponent;
  let fixture: ComponentFixture<ProductCardAdminEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardAdminEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
