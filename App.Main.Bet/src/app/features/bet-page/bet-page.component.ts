import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bet-page',
  templateUrl: './bet-page.component.html',
  styleUrls: ['./bet-page.component.scss'],
})
export class BetPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // initial state of accordian headers
  activeState: boolean[] = [false, false, false];

  // toggles accordion headers (open and close)
  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }
}
