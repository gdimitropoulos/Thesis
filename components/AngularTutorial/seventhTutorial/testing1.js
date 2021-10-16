import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import { Router } from "@angular/router";
import { By } from "@angular/platform-browser";
import { Location, CommonModule } from "@angular/common";
import { RouterTestingModule } from "@angular/router/testing";
import {
  ComponentFixture,
  TestBed,
  inject,
  async,
  getTestBed
} from "@angular/core/testing";

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppComponent } from "../../app.component";
import { RouterModule, Routes } from "@angular/router";

import { FirstComponent } from "../../components/first/first.component";
import { HomeComponent } from "../../components/home/home.component";
import { SecondComponent } from "../../components/second/second.component";
import { ThirdComponent } from "../../components/third/third.component";
import { routes } from "../../app.module";

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let h1;
let router;
let location;

beforeEach(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
  TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes(routes)], //<<< import it here also
    declarations: [
      AppComponent,
      HomeComponent,
      FirstComponent,
      SecondComponent,
      ThirdComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
  });
});

it("should create", async () => {
  let injector = getTestBed();
  location = injector.get(Location);
  router = injector.get(Router);
  fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  await router.navigate(["/"]);
  console.log("after expect");
  fixture.detectChanges();
  h1 = fixture.nativeElement.querySelectorAll(".tweet a");
  h1[2].click();
  fixture.detectChanges();
  await fixture.whenStable();
  h1 = fixture.nativeElement.querySelector("h2");
  expect(h1.textContent).toContain("I am on the third page");
});
