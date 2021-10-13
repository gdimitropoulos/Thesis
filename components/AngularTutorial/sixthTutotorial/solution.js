import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FirstComponent } from './components/first/first.component';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';

export const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'first', component: FirstComponent },
  {path: 'second', component: SecondComponent },
  {path: 'third', component: ThirdComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
