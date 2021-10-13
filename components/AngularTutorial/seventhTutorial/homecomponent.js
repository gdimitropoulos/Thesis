import { Component, OnInit } from '@angular/core';
import { NewsServices } from '../../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messages :  {title: string, text: string,id : number,target: string}[]; 

  constructor(private NewsServices : NewsServices) { }

  ngOnInit(): void {
      this.messages=this.NewsServices.getMessage();
      }

}
