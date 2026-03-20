import { Component, OnInit } from '@angular/core';
import {of,from,interval,Subscription,take,timer} from 'rxjs';
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
 private subscriptions: Subscription[] = [];
//emittedValue: any;
ngOnInit(): void {
  const numbers$ = of (10,20,30);
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
  const fruits$ = from(fruitsname)
  fruits$.subscribe({
     next : name => this.fruits.push(name),
  complete : () => console.log('from observables')
  })

  
 const interval$ = interval(1000).pipe(
  take(5)
);

  this.subscriptions.push(
  interval$.subscribe({
    next: time => {
      this.intervalvalues.push(time);
      console.log('interval ',time);
    },
    complete: () => console.log('interval completed')
  })
);
const timer$ =timer(2000,1000).pipe(take(5));
this.subscriptions.push(
  timer$.subscribe({
    next: val => {
      this.timervalues.push(val);
      console.log('timer',val);
    },
    complete: () => console.log('timercompleted')
  })
)

}
ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    console.log('All subscriptions unsubscribed');
  }

}