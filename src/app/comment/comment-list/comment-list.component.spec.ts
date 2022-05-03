import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublishedByComponent } from 'src/app/published-by/published-by.component';

import { CommentListComponent } from './comment-list.component';

const mockComment = [
  {
    "id": 1,
    "blogPostId": 10,
    "parentId": 1,
    "dateCreated": "2022-05-02T08:56:07.000+00:00",
    "content": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    "user": "Benutzer 1"
  },
];

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentListComponent, PublishedByComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have displayed the card when there is comment', () => {
    component.comments = mockComment;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const expected = compiled.querySelector('.post-comment');

    expect(expected).toBeTruthy();
  });

  describe('#toggleComment', () => {
    it('should have updated the variable showButtonReply', () => {
      component.toggleComment(true);

      expect(component.showButtonReply).toBeTruthy();
    });
  });
});
