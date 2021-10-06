import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uh-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() category: string = "";
  isActive: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  getCssClasses() {
    return this.isActive ? `bg-${this.category} bg-opacity-50 text-white` : 'text-gray-700';
  }
}
