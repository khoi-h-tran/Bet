import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';

import { StatisticsPageComponent } from './statistics-page.component';

describe('StatisticsPageComponent', () => {
  let component: StatisticsPageComponent;
  let fixture: ComponentFixture<StatisticsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticsPageComponent],
      imports: [ScrollPanelModule, TableModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
