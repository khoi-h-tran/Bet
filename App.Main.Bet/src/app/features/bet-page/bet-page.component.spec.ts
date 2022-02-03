import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'primeng/accordion';

import { BetPageComponent } from './bet-page.component';

describe('BetPageComponent', () => {
  let component: BetPageComponent;
  let fixture: ComponentFixture<BetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetPageComponent],
      imports: [AccordionModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create bet page component', () => {
    expect(component).toBeTruthy();
  });

  it('should create accordian', () => {
    const betPageElement: HTMLElement = fixture.nativeElement;

    let betAccordian = betPageElement.querySelector('.p-accordion');
    console.log(betAccordian);
    expect(betAccordian).toBeTruthy();
  });
});
