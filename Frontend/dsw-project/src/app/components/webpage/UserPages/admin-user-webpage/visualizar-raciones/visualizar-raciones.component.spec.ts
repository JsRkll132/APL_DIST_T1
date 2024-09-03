import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarRacionesComponent } from './visualizar-raciones.component';

describe('VisualizarRacionesComponent', () => {
  let component: VisualizarRacionesComponent;
  let fixture: ComponentFixture<VisualizarRacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarRacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarRacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
