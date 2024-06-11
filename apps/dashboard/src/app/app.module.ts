import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    appRoutes,
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
})
export class AppModule { }
