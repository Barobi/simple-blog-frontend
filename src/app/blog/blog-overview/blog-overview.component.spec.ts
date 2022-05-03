import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlogOverviewComponent } from './blog-overview.component';
import { of } from 'rxjs';
import { SortByPropertyPipe } from 'src/app/pipes/sort-property.pipe';
import { PublishedByComponent } from 'src/app/published-by/published-by.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlogOverviewComponent', () => {
  let component: BlogOverviewComponent;
  let fixture: ComponentFixture<BlogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BlogOverviewComponent,
        SortByPropertyPipe,
        PublishedByComponent,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the .banner h2 message', () => {
    const result = 'Mehr als blosse News';

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const expected = compiled.querySelector('h2').textContent;

    expect(expected).toContain(result);
  });

  it('should render the .banner h3 message', () => {
    const result = 'Die spannendsten Themen';

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const expected = compiled.querySelector('h3').textContent;

    expect(expected).toContain(result);
  });

  it(`should show the message 'Es sind noch keine Blog-Einträge vorhanden.' when there is no blog post`, () => {
    const result = 'Es sind noch keine Blog-Einträge vorhanden.';

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const expected = compiled.querySelector('section.articles h3').textContent;

    expect(expected).toEqual(result);
  });

  it(`should not show the message 'Es sind noch keine Blog-Einträge vorhanden.' when there is a blog post`, () => {
    component.posts$ = of([
      {
        id: 1,
        dateModified: '2022-05-02T04:56:07.000+00:00',
        title: 'Unglaubliche Entdeckung!',
        description: 'Das erste Mal in der Geschichte ...',
        content: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>',
        author: 'Author 1',
        numComments: 0,
      },
    ]);

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const expected = compiled.querySelector('section.articles h3');

    expect(expected).toBeNull();
  });
});
