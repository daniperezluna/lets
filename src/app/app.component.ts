import { Component } from '@angular/core';
import { AuthService } from 'src/app/supabase/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Let\'s';

  constructor(
    public authService: AuthService
  ) {}
}
