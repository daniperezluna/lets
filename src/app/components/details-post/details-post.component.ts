import { Post, Profile } from './../../supabase/supabase.types';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from './../../supabase/post.service';

@Component({
  selector: 'uh-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.css']
})
export class DetailsPostComponent implements OnInit {

  post$!: Promise<Post>;
  joiners$!: Promise<Profile[]>

  constructor(
    public postService: PostService,
    private router: ActivatedRoute
  ) { 
    this.router.params.subscribe(params => {
      this.post$ = this.postService.getEnrichedPost(+params['id']);
      this.post$.then(
        data => {
          this.joiners$ = this.postService.joinersFromEvent(data.id);
        }
      )
    });    
  }

  ngOnInit(): void {
  }

}
