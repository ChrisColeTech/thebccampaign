import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent {
  name: string = '';
  email: string = '';
  comment: string = '';
  comments: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchComments();
  }


  appendComment(comment: any) {
    this.comments.push(comment);
  }


  handleFormSubmit() {
    const formData = {
      name: this.name,
      email: this.email,
      comment: this.comment
    };

    this.http.post<any>(`${environment.apiUrl}/.netlify/functions/add-comment`, formData)
      .subscribe(result => {
        console.log('Comment added:', result);
        this.resetForm();
        this.appendComment(result.data);
      }, error => {
        console.error('Error adding comment:', error);
      });
  }

  fetchComments() {
    this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-approved-comments`)
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
