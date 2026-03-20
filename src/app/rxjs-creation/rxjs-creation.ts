import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {of,from,interval,Subject,take,timer,fromEvent,takeUntil,map,filter,tap} from 'rxjs';
@Component({
  selector: 'app-rxjs-creation',
  imports: [],
  templateUrl: './rxjs-creation.html',
  styleUrl: './rxjs-creation.css',
})
export class RxjsCreation implements OnInit{
values :number []=[];
fruits: string []=[];
intervalvalues:number[]=[];
timervalues:number[]=[];
private destroy$ = new Subject<void>();
// private subscriptions: Subscription[] = [];
 clickCount =0;
 @ViewChild ('btn',{static:true} ) btn !:  ElementRef <HTMLButtonElement>
//emittedValue: any;
ngOnInit(): void {
  const numbers$ = of (10,20,30);
  const birds$ = of (['dove','sparrow','parrot'])
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

//fromEvent - 
fromEvent(this.btn.nativeElement, 'click').pipe(
  takeUntil(this.destroy$),
  tap(() => console.log('Button was clicked!')) // side effect using tap
).subscribe(() => {
  this.clickCount++;
  console.log('button clicked', this.clickCount);
});
}
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}