import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoUserWebpageComponent } from '../alumno-realizar-op/alumno-user-webpage.component';

describe('AlumnoUserWebpageComponent', () => {
  let component: AlumnoUserWebpageComponent;
  let fixture: ComponentFixture<AlumnoUserWebpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoUserWebpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnoUserWebpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
