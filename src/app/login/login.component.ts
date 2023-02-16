import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Credentials } from '../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: Credentials = {
    email: '',
    password: '',
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    console.log('formValue', form.value);
    this.apiService.login(this.credentials).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }
}
