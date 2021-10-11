import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { HelloWorldComponent } from "./components/hello-world/hello-world.component";
import { AppComponent } from "./app.component";
let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let h1;

beforeEach(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
  TestBed.configureTestingModule({
    declarations: [AppComponent, HelloWorldComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
  });
});

it("should create", () => {
  fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  component = fixture.componentInstance;
  h1 = fixture.nativeElement.querySelector("#myh1");
  expect(h1.textContent).toContain("Hello World");

  expect(component).toBeDefined();
});
