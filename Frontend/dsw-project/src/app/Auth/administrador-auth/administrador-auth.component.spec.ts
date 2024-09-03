import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorAuthComponent } from './administrador-auth.component';

describe('AdministradorAuthComponent', () => {
  let component: AdministradorAuthComponent;
  let fixture: ComponentFixture<AdministradorAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministradorAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
