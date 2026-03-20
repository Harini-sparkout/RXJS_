import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsCreation } from './rxjs-creation';

describe('RxjsCreation', () => {
  let component: RxjsCreation;
  let fixture: ComponentFixture<RxjsCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
