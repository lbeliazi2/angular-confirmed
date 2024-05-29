import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, of, Subject} from "rxjs";
import {concatMap, delay, exhaustMap, filter, map, mergeMap, switchMap, take, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


}
