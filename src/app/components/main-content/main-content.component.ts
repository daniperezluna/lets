import {Component, OnInit} from '@angular/core';
import {PostService} from "../../supabase/post.service";
import {ProfileService} from "../../supabase/supabase.profile.service";
import {HeaderCategorySelectionService} from "../header/header.category-selection.service";
import {enrichPostWithCreator, Post, Profile} from "../../supabase/supabase.types";

@Component({
  selector: 'uh-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  posts = [] as Post[];
  categories = [] as string[];
  profile = {} as Profile;
  likedPosts = [] as number[];
  joinedPosts = [] as number[];

  constructor(
    private postsService: PostService,
    private profileService: ProfileService,
    private categorySelectedService: HeaderCategorySelectionService) {
    this.profileService.profile$.subscribe(
      profile => {
        if (profile) {
          this.profile = profile
          this.postsService.likedPostsFrom(this.profile.user.id)
            .then(posts => posts.map(post => post.id).filter(id => !!id).forEach(id => {
              if (id) {
                this.likedPosts.push(id)
              }
            }));
          this.postsService.joinedPostsFrom(this.profile.user.id)
            .then(posts => posts.map(post => post.id).filter(id => !!id).forEach(id => {
              if (id) {
                this.joinedPosts.push(id)
              }
            }));
        }
      }
    );

    this.categorySelectedService.categorySelection$.subscribe(categories => {
      this.categories = categories;
      this.update();
    });

  }

  ngOnInit(): void {
  }

  update() {
    this.posts = [];
    this.postsService.getPosts().then(dtos => {
      dtos
        .filter(dto => this.categories.includes(dto.category))
        .map(dto => {
          this.profileService.getProfile(dto.creator_id)
            .then(creator => {
              this.posts.push(enrichPostWithCreator(dto, creator));
            })
        })
    });
  }

}
