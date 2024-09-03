import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DswproinitComponent } from './dswproinit.component';

describe('DswproinitComponent', () => {
  let component: DswproinitComponent;
  let fixture: ComponentFixture<DswproinitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DswproinitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DswproinitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
