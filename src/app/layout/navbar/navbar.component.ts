import { AppService } from './../../core/services/app.service';
import { UserService } from './../../core/services/user.service';
import { FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
    title: Observable<string> = this.appService.title$;
    // count = 0;
    // countToShow = 0;
    search: FormControl = new FormControl();
    constructor( private userService: UserService,
                 private appService: AppService,
                 private zone: NgZone,
                 private changeDetector: ChangeDetectorRef) {}

    ngOnInit(): void {
      this.search.valueChanges.pipe(
        debounceTime(2000),
        distinctUntilChanged()
      ).subscribe((value) => {
        this.userService.setSearch(value);
      });

      // this.zone.runOutsideAngular(() =>
      //   setInterval(() => {
      //     this.count++;
      //     if (this.count % 4 === 0){
      //       this.countToShow = this.count;
      //       this.changeDetector.detectChanges();
      //     }
      //   }, 1000)
      // );
    }

    changeTitle(): void{
      this.appService.setTitle$('new Title') ;
    }
}
