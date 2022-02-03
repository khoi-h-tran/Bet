import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title!: string;

  public constructor(private titleService: Title) {}

  ngOnInit() {
    this.title = 'Bet.';
    this.titleService.setTitle(this.title);
  }
}
