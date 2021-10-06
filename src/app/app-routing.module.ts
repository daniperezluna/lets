import { AppComponent } from './app.component';
import { DetailsPostComponent } from './components/details-post/details-post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NewPostComponent } from './components/new-post/new-post.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import {MainContentComponent} from "./components/main-content/main-content.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'feed', component: MainContentComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create', component: NewPostComponent, canActivate: [AuthGuard]
  },
  {
    path: 'user', component: UserFeedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'content/:id', component: DetailsPostComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
