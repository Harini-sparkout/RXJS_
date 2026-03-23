import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit,ElementRef,ViewChild,AfterViewInit } from '@angular/core';
import {of,from,interval,Subject,take,timer,fromEvent,takeUntil,map,filter,tap,switchMap, merge, combineLatest, forkJoin,
  withLatestFrom, delay} from 'rxjs';
 
@Component({
  selector: 'app-rxjs-creation',
  standalone:true,
  imports: [JsonPipe,CommonModule],
  templateUrl: './rxjs-creation.html',
  styleUrl: './rxjs-creation.css',
})
export class RxjsCreation implements OnInit,AfterViewInit{
values :number []=[];
fruits: string []=[];
intervalvalues:number[]=[];
timervalues:number[]=[];
mergedValues: any[] = [];
combinedValues: any[] = [];
forkJoinValues: any[] = [];
latestValues: any[] = [];
private destroy$ = new Subject<void>();
// private subscriptions: Subscription[] = [];
 clickCount =0;
@ViewChild('btn', { static: true }) btn!: ElementRef<HTMLButtonElement>;
//emittedValue: any;
ngOnInit(): void {
  const numbers$ = of (10,20,30);
  //const birds$ = of (['dove','sparrow','parrot'])
  numbers$.subscribe({
    next: value => this.values.push(value),
    complete : () => console.log('observable completed ')


  })

  
  //of using array 

  /* * const array$ = of([1, 2, 3]);

    array$.subscribe({
      next: value => {
        this.emittedValue = value; // value will be the whole array
        console.log('Received:', value);
      },
      complete: () => console.log('Observable completed.')
    });**/
  
 const fruitsname = ['apple','orange','mango','pineapple','starfruit'];
const fruits$ = from(fruitsname).pipe(
  map(name => name.toUpperCase()),// used map for transformation without changing original  value
  filter(name => name.length > 6)   //filter only give matched condition
);

fruits$.subscribe({
  next: name => this.fruits.push(name),
  complete: () => console.log('from observable with map')
});

  //interval-immediate start and comes 
 const interval$ = interval(1000).pipe(// without opreator we can use subscription to prevent memorry leakage 
  take(5)// take() operator used to emit limited values
);

  //this.subscriptions.push(
  interval$.subscribe({
    next: time => {
      this.intervalvalues.push(time);
      console.log('interval ',time);
    },
    complete: () => console.log('interval completed')
  } //)
);

//timer- make delay to start run
const timer$ =timer(1000);

  timer$.subscribe({
    next: val => {
      this.timervalues.push(val);
      console.log('timer',val);
    },
    complete: () => console.log('timercompleted')
  })
  const merged$ = merge(numbers$, interval$.pipe(delay(500)));

merged$.subscribe(val => {
  this.mergedValues.push(val);
  console.log('merge:', val);
});
 //combineLatest
    const combined$ = combineLatest([
      numbers$,
      interval$.pipe(delay(500))
    ]);

    combined$.subscribe(val => {
      this.combinedValues.push(val);
      console.log('combineLatest:', val);
    });

    //forkJoin (waits for all to complete)
    const fork$ = forkJoin([
      numbers$,
      fruits$.pipe(delay(500))
    ]);

    fork$.subscribe(val => {
      this.forkJoinValues.push(val);
      console.log('forkJoin:', val);
    });


}
  ngAfterViewInit(): void {
  fromEvent(this.btn.nativeElement, 'click').pipe(
    takeUntil(this.destroy$),
    tap(() => console.log('Button was clicked!')),
    switchMap(() => interval(1000).pipe(take(3))),
    withLatestFrom(of(10,20,30))
  ).subscribe(([intervalVal, numberVal]) => {
    this.clickCount++;
    this.latestValues.push({ intervalVal, numberVal });
    console.log('switchMap + withLatestFrom:', intervalVal, numberVal);
  });
}
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}