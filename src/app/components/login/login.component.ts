import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "src/app/supabase/auth.service";
@Component({
  selector: 'uh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.errorMessage = '';
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      alert('Already logged in!');
      this.router.navigate(['/feed']);
    }
  }

  createAccount() {
    if ( this.loginForm.invalid ) {
      return;
    }

    this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {
        this.router.navigate(['/feed']);
      })
      .catch(reason => console.log(`Sign In error ${JSON.stringify(reason)}`));
  }

  submit() {
    if ( this.loginForm.invalid ) {
      return;
    }

     this.authService.logIn(this.loginForm.value.email, this.loginForm.value.password)
      .then(
        () => {
            this.router.navigate(['/feed']);
        })
       .catch(error => console.log(`Login error: ${JSON.stringify(error)}`));
  }
}

