import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DetailsPostComponent} from './components/details-post/details-post.component';
import {HeaderComponent} from './components/header/header.component';
import {PostComponent} from './components/post/post.component';
import {FeedComponent} from './components/feed/feed.component';
import {LoginComponent} from './components/login/login.component';
import {SupabaseModule} from "./supabase/supabase.module";
import {NewPostComponent} from './components/new-post/new-post.component';
import {MainContentComponent} from './components/main-content/main-content.component';
import {UserAvatarComponent} from './components/user-avatar/user-avatar.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {UserFeedComponent} from './components/user-feed/user-feed.component';
import {HeaderCategorySelectionService} from "./components/header/header.category-selection.service";

@NgModule({
  declarations: [
    AppComponent,
    DetailsPostComponent,
    HeaderComponent,
    PostComponent,
    FeedComponent,
    LoginComponent,
    NewPostComponent,
    MainContentComponent,
    UserAvatarComponent,
    CategoriesComponent,
    UserFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SupabaseModule,
  ],
  providers: [HeaderCategorySelectionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
