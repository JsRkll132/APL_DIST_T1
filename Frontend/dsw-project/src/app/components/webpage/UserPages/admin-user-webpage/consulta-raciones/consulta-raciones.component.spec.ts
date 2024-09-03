import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRacionesComponent } from './consulta-raciones.component';

describe('ConsultaRacionesComponent', () => {
  let component: ConsultaRacionesComponent;
  let fixture: ComponentFixture<ConsultaRacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaRacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaRacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
