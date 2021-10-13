import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  constructor() { }

  getMessage(): string {
    return 'Hello World'
  }

}
