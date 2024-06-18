import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { IEvent } from '../../models/event.interface';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { NgxMaskDirective } from 'ngx-mask';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService]
})
export class HomeComponent implements OnInit, OnDestroy{
  private eventService = inject(EventService);
  private loginService = inject(LoginService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  options!: any;

  form!: FormGroup;

  hasUser = false;

  events: IEvent[] = [];

  private unsubscribe = new Subject();

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          this.router.navigate([], { fragment: undefined, replaceUrl: true });
        }
      }
    });
    this.initForm();
    this.loadEvents();
    this.hasUser = this.loginService.hasUserLogged.getValue();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  loadEvents(): void {
    this.eventService.getEvents().pipe(takeUntil(this.unsubscribe)).subscribe((events) => {
      this.events = events;
    });
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      cep: ['', Validators.required],
      numberStreet: [''],
      street: [''],
      city: [''],
      state: [''],
      openingDate: ['', Validators.required],
      closingDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }
  
  onCreate(){
    this.eventService.createEvent(this.form.value).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Evento criado com sucesso' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao criar evento' });
      },
      complete: () => {
        this.loadEvents();
      }
    })
  }
}
