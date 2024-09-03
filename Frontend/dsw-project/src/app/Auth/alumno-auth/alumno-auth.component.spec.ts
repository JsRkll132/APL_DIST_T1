import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAuthComponent } from './alumno-auth.component';

describe('AlumnoAuthComponent', () => {
  let component: AlumnoAuthComponent;
  let fixture: ComponentFixture<AlumnoAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnoAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
