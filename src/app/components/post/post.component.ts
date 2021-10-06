import {Component, Input, OnInit} from '@angular/core';
import {Post, Profile} from "../../supabase/supabase.types";
import {PostService} from './../../supabase/post.service';

@Component({
  selector: 'uh-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  hasLike: boolean = false;

  @Input()
  areYouIn: boolean = false;

  @Input()
  post: Post;

  @Input()
  profile: Profile;


  constructor(
    private postService: PostService,
  ) {
    this.post = {} as Post;
    this.profile = {} as Profile;
  }


  ngOnInit(): void {

  }

  followPost() {
    this.hasLike ?
      this.postService.unlike(this.profile.user.id, this.post.id)
        .then(succeeded => this.hasLike = !succeeded)
        .catch(err => alert(`Error during unlike ${JSON.stringify(err)}`))
      :
      this.postService.like(this.profile.user.id, this.post.id)
        .then(succeeded => this.hasLike = succeeded)
        .catch(err => alert(`Error during like ${JSON.stringify(err)}`))

  }

  joinEvent() {
    this.areYouIn ?
      this.postService.leaveEvent(this.profile.user.id, this.post.id)
        .then(succeeded => this.areYouIn = !succeeded)
        .catch(err => alert(`Error during leaving ${JSON.stringify(err)}`))
      :
      this.postService.joinEvent(this.profile.user.id, this.post.id)
        .then(succeeded => this.areYouIn = succeeded)
        .catch(err => alert(`Error during join ${JSON.stringify(err)}`))
  }
}
