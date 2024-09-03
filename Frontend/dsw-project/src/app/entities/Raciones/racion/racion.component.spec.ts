import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacionComponent } from './racion.component';

describe('RacionComponent', () => {
  let component: RacionComponent;
  let fixture: ComponentFixture<RacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
