import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserWebpageComponent } from './admin-user-webpage.component';

describe('AdminUserWebpageComponent', () => {
  let component: AdminUserWebpageComponent;
  let fixture: ComponentFixture<AdminUserWebpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserWebpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUserWebpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
