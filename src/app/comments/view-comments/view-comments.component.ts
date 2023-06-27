import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {
  name: string = '';
  email: string = '';
  comment: string = '';
  comments: any[] = [];
  currentIndex: number = 0;
  displayComment: any = null;
  timerInterval: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchComments();
    this.startTimer();
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
        this.fetchComments(); // Refresh comments after adding a new one
      }, error => {
        console.error('Error adding comment:', error);
      });
  }

  fetchComments() {
    this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-approved-comments`)
      .subscribe(data => {
        this.comments = data;
        this.currentIndex = 0; // Reset the current index to the first comment
        this.displayComment = this.comments[this.currentIndex];
      }, error => {
        console.error('Error fetching comments:', error);
      });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.comment = '';
  }

  goBack() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.displayComment = this.comments[this.currentIndex];
    } else {
      this.currentIndex = this.comments.length - 1; // Set currentIndex to the last comment index
      this.displayComment = this.comments[this.currentIndex];
    }
  }

  goForward() {
    if (this.currentIndex < this.comments.length - 1) {
      this.currentIndex++;
      this.displayComment = this.comments[this.currentIndex];
    } else {
      this.currentIndex = 0; // Set currentIndex to the first comment index
      this.displayComment = this.comments[this.currentIndex];
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.goForward();
    }, 5000); // Adjust the interval duration (in milliseconds) as needed
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }
}
