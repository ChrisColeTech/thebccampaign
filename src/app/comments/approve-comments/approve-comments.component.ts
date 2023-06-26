import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approve-comments',
  templateUrl: './approve-comments.component.html',
  styleUrls: ['./approve-comments.component.scss']
})
export class ApproveCommentsComponent implements OnInit {
  comments: any[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUnapprovedComments();
  }

  fetchUnapprovedComments() {
    this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-unapproved-comments`)
      .subscribe(data => {
        this.comments = data;
        this.totalPages = Math.ceil(this.comments.length / this.itemsPerPage);
      }, error => {
        console.error('Error fetching comments:', error);
      });
  }

  approveComment(commentId: string) {
    const body = { ref: commentId };

    this.http.post(`${environment.apiUrl}/.netlify/functions/approve-comment`, body)
      .subscribe(response => {
        console.log('Comment approved successfully:', response);
        // Optionally, you can update the local comments array or refresh the table here
      }, error => {
        console.error('Error approving comment:', error);
      });
  }

  sortComments(key: string) {
    // Logic for sorting the comments by the specified key
  }
  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }
  previousPage(event: Event) {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(event: Event) {
    event.preventDefault();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(event: Event, page: number) {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}
