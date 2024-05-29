import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, of, Subject} from "rxjs";
import {concatMap, delay, exhaustMap, filter, map, mergeMap, switchMap, take, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'face-snap-list',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent implements OnInit, OnDestroy {

  // we can also instead of subscribing use the pipe async on the observable
  // to see the results
  interval$!: Observable<number>;
  intervalString$!: Observable<string>;
  private redTrainsCalled: number = 0;
  private yellowTrainsCalled: number = 0;

  // a subject is an observable that can emit when asked to
  private destroy$!: Subject<boolean>;
  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    //this.firstExampleClassicSubscription();
    //this.usingAsyncPipe();
    //this.mapOperator();
    //this.filterOperator();
    //this.lowLevelOperators();
    //this.highLevelObservables();
    this.takeUntil();

  }


  usingAsyncPipe() {
    this.interval$ = interval(1000);
  }
  firstExampleClassicSubscription() {
    // add a $ at the end of a variable which contains an observable
    // this is an observable which gives numbers each period of time
    const interval$ = interval(1000);
    // we decide to subscribe to this observable
    // !! WE CREATE A NEW INSTANCE FOR EACH SUBSCRIPTION
    // WE CAN HAVE NUMEROUS OBSERVABLES AT ONCE
    interval$.subscribe(value => console.log(value));
  }

  lowLevelOperators() {
    // operators are passed to the pipe function
    // map transforms the emissions of the observables
    // filter filters emissions of an observable
    // tap allows us to tap into others functions or to add more effects to an observable
    this.intervalString$ = interval(1000).pipe(
      filter(value => value % 3 === 0),
      map(value => value % 2 === 0 ?
        `Je suis ${value} et je suis pair` :
        `Je suis ${value} et je suis impair`
      ),
      tap(text => this.logger(text))
    );
  }

  // high level observables consist of an external observable
  // which subscribe to interior observables according to the values
  highLevelObservables() {
    // 1. MERGE MAP - the simpler one : we don't wait for the first observable to finish
    // we switch observables when we have data coming in
    // For each value, mergeMap subscribes to an observable
    // without worrying if another has been completed
    // to be used when we don't care about the order

    // 2. CONCAT MAP
    // Assures that the order is restored
    // wait for the first observable to be finished before plugging into another
    // if numerous data comes from different observables - we note the order, wait for the first one to finish and then call the others in order

    // 3. EXHAUST MAP
    // We ignore all of the other calls if the first observable is not completed
    // Once it is we listen again (the calls are completely ignored)
    // to use if we need an event to be entirely processed before allowing others to come

    // 4. SWITCH MAP
    // If we detect another event, we will cancel the first obsservable - unsuscribe
    // Only used when the last emission of the observable is the one which we are interested in

    interval(500).pipe(
      take(10),
      map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
      tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
      switchMap(color => this.getTrainObservable$(color)),
      tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
    ).subscribe();
  }

  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({ color, trainIndex }).pipe(
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }


  logger(text: string): void {
    console.log(`Log: ${text}`);
  }

  // Unsubscribe strategies to escape data leakages
  unsusbcribe () {
    // either you know how much data you need and you decide to take only certain
    interval(1000).pipe(
      // here we take only 3 values
      // hence the observables completes after 3 values
      take(3),
      tap(console.log),
    ).subscribe();
  }


  // if you want to keep the emissions of your observable during the whole lifecycle of your component
  // there are a few ways to go about
  // you can use ngOnDestroy which is called when the component is destroyed
  ngOnDestroy(): void {
    // we tell our subject to complet once the destroy emits
    this.destroy$.next(true);
  }

  // take Until tells the observable to keep emitting until the destroy is called
  // Once the destroy emits then the observable must complete
  // we can see that each time the component is refreshed the observables starts again
  // it completes at each page change
  // best way to deal with observables !!
  takeUntil () {
    interval(1000).pipe(
      tap(console.log),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  // A LITTLE NOTE !!
  // Each observable subscribed with the async pipe is automatically unsubscribed during the destruction of the component

}
