import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DswpronavComponent } from './dswpronav.component';

describe('DswpronavComponent', () => {
  let component: DswpronavComponent;
  let fixture: ComponentFixture<DswpronavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DswpronavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DswpronavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
