import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uh-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  @Input() picture: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
