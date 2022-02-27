import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightEventComponent } from './fight-event.component';

describe('FightEventComponent', () => {
  let component: FightEventComponent;
  let fixture: ComponentFixture<FightEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FightEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
