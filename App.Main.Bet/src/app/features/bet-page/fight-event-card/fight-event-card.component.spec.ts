import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightEventCardComponent } from './fight-event-card.component';

describe('FightEventCardComponent', () => {
  let component: FightEventCardComponent;
  let fixture: ComponentFixture<FightEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FightEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
