import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, combineLatest, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NgxMaskDirective, ReactiveFormsModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy{
  public isActive = false;

  public isPasswordEqual = false

  public form!: FormGroup;

  private unsubscribe = new Subject();

  public cpf = '';

  public password = '';

  constructor(
    private fb: FormBuilder,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getPasswordValue();
  }

  ngOnDestroy(): void {
      this.unsubscribe.next(null);
      this.unsubscribe.complete();
  }

  public onLogin(): void {
    console.log(this.cpf, this.password);

  }

  public onSignUp(): void {
    console.log('asdsa');
  }

  public goToHome(): void {
    this.route.navigate(['home']);
  }

  public getPasswordValue(): void {
    combineLatest([
      this.form.get('password')?.valueChanges as Observable<string>,
      this.form.get('confirmPassword')?.valueChanges as Observable<string>
    ]).pipe(takeUntil(this.unsubscribe)).subscribe(
      ([password, confirmPassword]) => {
        this.isPasswordEqual = password === confirmPassword
        console.log(this.isPasswordEqual);

      }
    )
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      cpf: ['', Validators.required],
      cellphone: [''],
      birthday: ['', Validators.required],
    })
  }
}
