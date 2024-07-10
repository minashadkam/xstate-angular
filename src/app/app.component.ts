import { Component, OnInit } from '@angular/core';
import { promiseMachineActors } from './machines/promise.machine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

ngOnInit(): void {
  promiseMachineActors.start();

}
  
send(){
  promiseMachineActors.send({ type: 'RESOLVE' });
}
}
