import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRacionesComponent } from './editar-raciones.component';

describe('EditarRacionesComponent', () => {
  let component: EditarRacionesComponent;
  let fixture: ComponentFixture<EditarRacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarRacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
