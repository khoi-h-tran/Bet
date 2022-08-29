import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [TabMenuModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  // Note: ink bar is the active tab selector
  it('should create tab menu with 3 tabs (plus inkbar)', () => {
    //check tab menu exists
    const tabMenuElement: HTMLElement = fixture.nativeElement;
    const tabMenu = tabMenuElement.querySelector('p-tabmenu')!;
    expect(tabMenu).toBeTruthy();

    // check it has 3 tabs
    const tabMenuNav = tabMenuElement.querySelectorAll('.p-tabmenu-nav li');
    expect(tabMenuNav.length).toEqual(4);
  });

  it('should create Bet. tab, with correct text, icon, and tooltip', () => {
    // Get the nav bar list items
    const tabMenuNavElement: HTMLElement = fixture.nativeElement;
    const tabMenuNav = tabMenuNavElement.querySelectorAll('.p-tabmenu-nav li');

    // Find the 2nd list item (for Stats.)
    let betTab = tabMenuNav.item(0);

    expect(betTab).toBeTruthy();
    // tab text
    expect(betTab?.textContent).toEqual('Bet.');

    // Find the anchor for Stats.
    let betAnchor = betTab.querySelector('a');

    // tab icon
    expect(
      betAnchor
        ?.querySelector('.p-menuitem-icon')
        ?.getAttribute('ng-reflect-ng-class')
    ).toEqual('pi pi-fw pi-money-bill');
    expect(betAnchor?.getAttribute('title')).toEqual(
      'Bet on who you think will win!'
    );
  });

  it('should create Stats. tab, with correct text, icon, and tooltip', () => {
    // Get the nav bar list items
    const tabMenuNavElement: HTMLElement = fixture.nativeElement;
    const tabMenuNav = tabMenuNavElement.querySelectorAll('.p-tabmenu-nav li');

    // Find the 2nd list item (for Stats.)
    let statsTab = tabMenuNav.item(1);

    expect(statsTab).toBeTruthy();
    // tab text
    expect(statsTab?.textContent).toEqual('Stats.');

    // Find the anchor for Stats.
    let statsAnchor = statsTab.querySelector('a');

    // tab icon
    expect(
      statsAnchor
        ?.querySelector('.p-menuitem-icon')
        ?.getAttribute('ng-reflect-ng-class')
    ).toEqual('pi pi-fw pi-chart-line');

    // tab tooltip
    expect(statsAnchor?.getAttribute('title')).toEqual(
      'Statistics on your previous betting performance.'
    );
  });
});
