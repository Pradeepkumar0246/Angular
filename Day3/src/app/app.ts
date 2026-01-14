import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child } from './child/child';
import { User } from './Models/User.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Child],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Day3');
  comp='Child from parent class';
  ListUser:User={
    username:"pradeep",userage:21,usergender:"Male"
  }
  Onclick(e:User){
    console.log(e);
  }
}
