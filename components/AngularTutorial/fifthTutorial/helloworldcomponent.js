import { Component, OnInit, Input } from '@angular/core';
import { HelloWorldService } from '../../services/hello-world.service';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
   messages :  {title: string, text: string,id : number,target: string}[]; 

  constructor(private HelloWorldService : HelloWorldService) { }

  ngOnInit(): void {
      this.messages=this.HelloWorldService.getMessage();
      }

}
