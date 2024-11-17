import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivechatwidgetComponentComponent } from './livechatwidget-component.component';

describe('LivechatwidgetComponentComponent', () => {
  let component: LivechatwidgetComponentComponent;
  let fixture: ComponentFixture<LivechatwidgetComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivechatwidgetComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivechatwidgetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
