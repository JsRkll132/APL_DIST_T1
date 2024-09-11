import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoNavbarComponent } from './alumno-navbar.component';

describe('AlumnoNavbarComponent', () => {
  let component: AlumnoNavbarComponent;
  let fixture: ComponentFixture<AlumnoNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnoNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
