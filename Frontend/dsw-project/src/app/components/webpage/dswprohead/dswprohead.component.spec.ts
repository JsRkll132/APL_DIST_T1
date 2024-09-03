import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DswproheadComponent } from './dswprohead.component';

describe('DswproheadComponent', () => {
  let component: DswproheadComponent;
  let fixture: ComponentFixture<DswproheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DswproheadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DswproheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
