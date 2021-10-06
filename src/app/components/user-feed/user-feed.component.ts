import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from "../../supabase/supabase.profile.service";
import {AuthService} from '../../supabase/auth.service';
import {PostService} from "../../supabase/post.service";
import {enrichPostWithCreator, Post, Profile} from "../../supabase/supabase.types";
import {HeaderCategorySelectionService} from "../header/header.category-selection.service";

@Component({
  selector: 'uh-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {

  profile = {} as Profile;
  createdPosts = [] as Post[];
  likedPosts = [] as Post[];
  joinedPosts = [] as number[];
  categories = [] as string[];

  constructor(
    public profileService: ProfileService,
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private categoryService: HeaderCategorySelectionService
  ) {

    this.categoryService.categorySelection$.subscribe(categories => {
      this.categories = categories;
      this.update();
    });

    this.profileService.profile$.subscribe(
      profile => {
        if (profile) {
          this.profile = profile;
          this.update()
        }
      }
    );
  }

  ngOnInit(): void {
    console.log(this.profile)
  }

  update() {

    if (!this.profile?.user?.id) {
      return;
    }

    this.createdPosts = [];
    this.likedPosts = [];

    this.postService.getPostFromUser(this.profile.user.id)
      .then(results => {
        results
          .filter(dto => this.categories.includes(dto.category))
          .forEach(dto => this.createdPosts.push(enrichPostWithCreator(dto, this.profile)));
      });

    this.postService.likedPostsFrom(this.profile.user.id)
      .then(results => {
        results
          .filter(dto => this.categories.includes(dto.category))
          .forEach(dto => {
            this.profileService.getProfile(dto.creator_id)
              .then(profile => this.likedPosts.push(enrichPostWithCreator(dto, profile)))
          });
      });
    this.postService.joinedPostsFrom(this.profile.user.id)
      .then(result => result.map(x => x.id).forEach(x => this.joinedPosts.push(x)));
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  likedPostsIds(): number[] {
    return this.likedPosts.map(post => post.id);
  }

  joinedPostsIds(): number[] {
    return this.joinedPosts;
  }
}
