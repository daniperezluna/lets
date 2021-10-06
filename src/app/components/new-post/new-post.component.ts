import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseAssetsService } from "../../supabase/supabase.assets.service";
import { PostService } from "../../supabase/post.service";
import { ProfileService } from "../../supabase/supabase.profile.service";
import { PostDTO, Profile, PostCategory } from "../../supabase/supabase.types";

@Component({
  selector: 'uh-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  newPostForm: FormGroup;
  errorMessage: string;
  post: PostDTO | null = null;
  file: File | null = null;
  imageUrl: string | null = null;
  profile: Profile | null = null;
  successMessage: boolean = false;
  failureMessage: boolean = false;
  allCategories = [
    "EAT",
    "MEET",
    "PLAY",
    "INFORM"
  ];
  selectedCategory: PostCategory | null | string = null;
  allPostTypes = [
    "News",
    "Event",
    "Survey"
  ]
  selectedPostType: string = "News";

  draftContent: {[key: string]: any} = {
    News: {},
    Event: { eventDate: '', maxNumberOfParticipants: '' },
    Survey: { surveyOptions: '' }
  }

  constructor(private router: Router,
              private assetsService: SupabaseAssetsService,
              private postService: PostService,
              private profileService: ProfileService,
              private elementRef: ElementRef
  ) {
    this.errorMessage = '';
    this.newPostForm = new FormGroup({
      category: new FormControl('',[Validators.required]),
      title: new FormControl('',[Validators.required, Validators.minLength(6)]),
      image: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      dueDate: new FormControl('',[Validators.required]),
      eventDate: new FormControl(''),
      surveyOptions: new FormControl(''),
      maxParticipantsNumber: new FormControl(0)
    });
    profileService.profile$.subscribe(profile => this.profile = profile);
  }

  validateFile(name: String) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    return ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg';
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files.length && this.validateFile(event.target.files[0].name))
    {
      this.file = event.target.files[0];
    }
  }

  selectPostType(type: string, e: any) {
    document.querySelectorAll('#categories > li').forEach(
      (li) => {
        li.querySelector('button')?.classList.remove('active');
      }
    );
    e.currentTarget.classList.add('active')
    console.log(e.currentTarget.classList.add('active'));
    this.selectedPostType = type;
  }

  updateCategory(event: any) {
    this.selectedCategory = event.target.value;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  incrementMaxParticipantsNumber() {
    let currentMaxParticipantsNumber: number = this.newPostForm.get("maxParticipantsNumber")?.value;
    this.newPostForm.controls["maxParticipantsNumber"].setValue(currentMaxParticipantsNumber + 1);
  }

  decrementMaxParticipantsNumber() {
    if (this.newPostForm.get("maxParticipantsNumber")?.value > 0) {
      let currentMaxParticipantsNumber: number = this.newPostForm.get("maxParticipantsNumber")?.value;
      this.newPostForm.controls["maxParticipantsNumber"].setValue(currentMaxParticipantsNumber - 1);
    }
  }

  async submit() {
    if ( this.newPostForm.invalid || !this.file ) {
      this.failureMessage = true;
      return;
    } else {

      if (this.file) this.imageUrl = await this.assetsService.store(this.file);
      if (this.profile && this.imageUrl && this.selectedCategory) {

        this.post = {
          title: this.newPostForm.get("title")?.value,
          due_to: (new Date(this.newPostForm.get("dueDate")?.value)).toISOString(),
          category: this.selectedCategory.slice(3),
          content: this.draftContent[this.selectedPostType],
          creator_id: this.profile.user.id,
          description: this.newPostForm.get("description")?.value,
          image_url: this.imageUrl,
          type: this.selectedPostType.toUpperCase()
        } as PostDTO;
      }

      if(this.post) {
      // Upload it to the backend
      this.postService.createPost(this.post);

      // Display success message
        this.failureMessage = false;
        this.successMessage = true;
      }

      // Navigate back to the feed after 3 seconds
      await this.delay(3000);
      await this.router.navigate(['/feed']);
    }
  }

}
