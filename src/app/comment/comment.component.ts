import { Component } from '@angular/core';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  comments$ = this.commentService.getComments();

  constructor(private commentService: CommentService, private router: ActivatedRoute){}

  ngOnInit(): void {
    this.router.data.subscribe((data) => console.log(data['comments']));
  }
}
