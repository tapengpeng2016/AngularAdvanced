import { Component } from "@angular/core";

@Component({
    selector: 'app-layout',
    template: `
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
    `
})
export class LayoutComponent {}