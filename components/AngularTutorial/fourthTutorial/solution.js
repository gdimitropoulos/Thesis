import { Component, OnInit, Input } from "@angular/core";
import { HelloWorldService } from "../../services/hello-world.service";

@Component({
  selector: "app-hello-world",
  templateUrl: "./hello-world.component.html",
  styleUrls: ["./hello-world.component.css"]
})
export class HelloWorldComponent implements OnInit {
  message: string;

  constructor(private HelloWorldService: HelloWorldService) {}

  ngOnInit(): void {
    this.message = this.HelloWorldService.getMessage();
  }
}
