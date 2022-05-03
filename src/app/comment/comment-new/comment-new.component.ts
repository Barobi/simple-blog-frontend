import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comments.model';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.scss'],
})
export class CommentNewComponent implements OnInit {
  @Input() blogPostId: number | null = null;
  @Input() commentId: number | null = null;
  @Input() buttonName: 'Kommentieren' | 'Antworten' = 'Kommentieren';

  @Output() commented = new EventEmitter<number>();
  @Output() cancelled = new EventEmitter<boolean>();

  form: FormGroup = new FormGroup({
    user: new FormControl(null, []),
    content: new FormControl(null, [Validators.required]),
  });

  constructor(private commentsService: CommentService) {}

  ngOnInit(): void {}

  saveComment(form: FormGroup): void {
    const { valid, controls, value } = form;

    if (!valid) {
      for (const input in controls) {
        if (controls[input].invalid) {
          controls[input].markAsTouched();
        }
      }

      return;
    }

    const dateCreated = this.getCurrentDate();
    const parentId = this.commentId ? Number(this.commentId) : 0;
    const blogPostId = Number(this.blogPostId);
    const comment: Comment = {
      ...value,
      blogPostId,
      parentId,
      dateCreated,
    };

    this.commentsService.save(comment).subscribe((newComment) => {
      this.form.reset({
        user: '',
        content: '',
      });

      this.commented.emit(newComment.blogPostId);
    });
  }

  cancelComment(): void {
    this.cancelled.emit(false);
  }

  private getCurrentDate(): string {
    return new Date().toISOString();
  }
}
