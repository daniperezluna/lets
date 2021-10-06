import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../supabase/supabase.profile.service";
import {Profile} from "../../supabase/supabase.types";
import {HeaderCategorySelectionService} from "./header.category-selection.service";

@Component({
  selector: 'uh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profile: Profile | undefined;
  openMenu: boolean = false;
  categories: string[] = ["eat", "meet", "play", "inform"];

  constructor(
    private profileService: ProfileService,
    private categoriesService: HeaderCategorySelectionService,
  ) {
  }

  ngOnInit(): void {
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile;
    });
    this.categoriesService.categorySelection$.next(this.categories.map(x => x.toUpperCase()));
  }

  picture(): string {
    return this.profile?.picture_url || 'https://edyepibtnkccgdrkqcix.supabase.in/storage/v1/object/public/public-assets/anonymous.png';
  }

  categoryClicked(category: string) {
    this.categoriesService.onCategorySelection(category);
  }
}
