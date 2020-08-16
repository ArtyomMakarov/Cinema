import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CinemaComponent } from './Cinema.component';

describe('CinemaComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CinemaComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CinemaComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Cinema-Project'`, () => {
    const fixture = TestBed.createComponent(CinemaComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Cinema-Project');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CinemaComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Cinema-Project app is running!');
  });
});
