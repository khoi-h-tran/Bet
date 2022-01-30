import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Bet.',
        icon: 'pi pi-fw pi-money-bill',
        title: 'Bet on who you think will win!',
      },
      {
        label: 'Stats.',
        icon: 'pi pi-fw pi-chart-line',
        title: 'Statistics on your previous betting performance.',
      },
    ];

    this.activeItem = this.items[0];
  }
}
