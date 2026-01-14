import { Component,EventEmitter,Input, Output, signal } from '@angular/core';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css'
})
export class Child {
  @Input() compname:string="Child Class";
  @Input() listuser:User={
    username:"",userage:0,usergender:""
  }
  @Output() childevent : EventEmitter<User> = new EventEmitter();
  onsubmit(){
    // this.childevent.emit(true);
    if(this.listuser){
      this.listuser.username="Jerry";
    }
    this.childevent.emit(this.listuser);
  }
  count=signal(0);
  Increment(){
    this.count.update(v=>v+1);
  }
  Decrement(){
    if(this.count()>0)    
    this.count.update(v=>v-1);
  else this.count.update(v=>0);
  }
  bgcolor(){
    if(this.count()%3==0)return "Darkgreen";
    if(this.count()%2==0)return "Darkblue";
    return "red";
  }
}
