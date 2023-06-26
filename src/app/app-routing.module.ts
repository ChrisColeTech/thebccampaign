import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ApproveCommentsComponent } from './comments/approve-comments/approve-comments.component';
import { ViewCommentsComponent } from './comments/view-comments/view-comments.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'comments', children: [
      { path: '', component: CommentsComponent },
      { path: 'approve-comments', component: ApproveCommentsComponent },
      { path: 'view-comments', component: ViewCommentsComponent }
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
