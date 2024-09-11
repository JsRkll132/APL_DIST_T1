import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoUserPanelComponent } from './alumno-user-panel.component';

describe('AlumnoUserPanelComponent', () => {
  let component: AlumnoUserPanelComponent;
  let fixture: ComponentFixture<AlumnoUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoUserPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnoUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
