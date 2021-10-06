import {Injectable} from "@angular/core";
import {ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderCategorySelectionService {

  categorySelection$: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  categories: string[] = ["EAT", "MEET", "PLAY", "INFORM"];

  selected: string[] = [];

  constructor() {
    this.categorySelection$.next(this.categories);
  }

  onCategorySelection(category: string) {
    category = category.toUpperCase();
    if (this.selected.includes(category)) {
      this.selected = this.selected.filter(cat => cat != category);
    } else {
      this.selected.push(category);
    }

    if (this.selected.length === 0) {
      this.categorySelection$.next(this.categories);
    } else {
      this.categorySelection$.next(this.selected);
    }
  }
}
