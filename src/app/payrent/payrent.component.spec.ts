import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrentComponent } from './payrent.component';

describe('PayrentComponent', () => {
  let component: PayrentComponent;
  let fixture: ComponentFixture<PayrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
