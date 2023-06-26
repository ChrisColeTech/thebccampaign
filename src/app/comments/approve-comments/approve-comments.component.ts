import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-approve-comments',
  templateUrl: './approve-comments.component.html',
  styleUrls: ['./approve-comments.component.scss']
})
export class ApproveCommentsComponent implements OnInit {
  comments: any[];
  displayedColumns: string[] = ['name', 'comment', 'actions'];
  dataSource: MatTableDataSource<any>;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUnapprovedComments();
  }

  fetchUnapprovedComments() {
    this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-unapproved-comments`)
      .subscribe(data => {
        this.comments = data;
        this.dataSource = new MatTableDataSource(this.comments);
      }, error => {
        console.error('Error fetching comments:', error);
      });
  }

  approveComment(commentId: string) {
    let data = { ref: commentId }
    this.http.post(`${environment.apiUrl}/.netlify/functions/approve-comment`, data)
      .subscribe(response => {
        console.log('Comment approved successfully:', response);
        this.fetchUnapprovedComments();
      }, error => {
        console.error('Error approving comment:', error);
      });
  }

  denyComment(commentId: string) {
    // Logic for denying a comment
  }
}
