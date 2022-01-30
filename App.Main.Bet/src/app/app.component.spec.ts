import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppComponent } from './app.component';
import { NavbarComponent } from './features/navbar/navbar.component';

describe('AppComponent', () => {
  let titleService: Title;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TabMenuModule],
      declarations: [AppComponent, NavbarComponent],
      providers: [Title],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have component var title set to 'Bet.'`, () => {
    expect(app.title).toEqual('Bet.');
  });

  it('should render document tab title through Title service', () => {
    expect(titleService.getTitle()).toBe('Bet.');
  });
});
