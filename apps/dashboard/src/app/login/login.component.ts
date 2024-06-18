import { UserService } from './../../services/user.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, combineLatest, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/login.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NgxMaskDirective, ReactiveFormsModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy{
  private userService = inject(UserService);
  private loginService = inject(LoginService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private route = inject(Router);

  public isActive = false;

  public isPasswordEqual = false

  public form!: FormGroup;

  private unsubscribe = new Subject();

  public cpf = '';

  public password = '';

  ngOnInit(): void {
    this.initForm();
    this.getPasswordValue();
  }

  ngOnDestroy(): void {
      this.unsubscribe.next(null);
      this.unsubscribe.complete();
  }

  public onLogin(): void {
    this.loginService.createUser({
      cpf: this.cpf,
      password: this.password
    }).subscribe({
      next: () => {
        this.loginService.setUserLogged(true);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuário logado com sucesso' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao logar' });
      },
      complete: () => {
        this.route.navigate(['home']);
      }
    })
  }

  public onSignUp(): void {
    this.userService.createUser({
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      cpf: this.form.get('cpf')?.value,
      cellphone: this.form.get('cellphone')?.value,
      birthdate: this.form.get('birthday')?.value
    }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuário criado com sucesso' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao criar o usuário' });
      }
    })
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
