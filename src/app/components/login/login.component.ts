import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "src/app/supabase/auth.service";
@Component({
  selector: 'uh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  validationMessage!: string;
  isAdminRole: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      params['role'] === "admin" ? this.isAdminRole = true : ''
    });
    this.errorMessage = '';
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
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
       .catch(reason => this.validationMessage = reason.message);
  }
}

