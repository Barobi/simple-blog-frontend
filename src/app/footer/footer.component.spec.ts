import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render the footer as 'Coding challenge: Simple Blog Application'`, () => {
    const result = 'Coding challenge: Simple Blog Application';

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const expected = compiled.querySelector('span').textContent;

    expect(expected).toContain(result);
  });
});
