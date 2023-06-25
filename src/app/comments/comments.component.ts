import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  name: string = '';
  email: string = '';
  comment: string = '';
  comments: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchComments();
  }

  handleFormSubmit() {
    const formData = {
      name: this.name,
      email: this.email,
      comment: this.comment
    };

    this.http.post<any>('/.netlify/functions/add-comment', formData)
      .subscribe(result => {
        console.log('Comment added:', result);
        this.resetForm();
        this.appendComment(result.data);
      }, error => {
        console.error('Error adding comment:', error);
      });
  }

  appendComment(comment: any) {
    this.comments.push(comment);
  }

  fetchComments() {
    this.http.get<any[]>('/.netlify/functions/get-comments')
      .subscribe(data => {
        this.comments = data;
      }, error => {
        console.error('Error fetching comments:', error);
      });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.comment = '';
  }
}
