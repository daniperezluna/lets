import {Component, Input, OnInit} from '@angular/core';
import {Post, Profile} from "../../supabase/supabase.types";

@Component({
  selector: 'uh-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input()
  posts = [] as Post[];
  @Input()
  profile = {} as Profile;
  @Input()
  likedPosts = [] as number[];
  @Input()
  joinedPosts = [] as number[];
  @Input()
  showCreate = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  isPostLikedByUser(post: Post): boolean {
    return this.likedPosts.includes(post.id);
  }

  hasUserJoined(post: Post): boolean {
    return this.joinedPosts.includes(post.id);
  }


}
