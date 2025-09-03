import { Component } from '@angular/core';

@Component({
  selector: 'app-coursecard',
  imports: [],
  templateUrl: './coursecard.html',
  styleUrl: './coursecard.css'
})
export class Coursecard {
  course1:{name:string; duration:string; trainername:string }={
    name:"Fullstack",
    duration : "6 months",
    trainername :"pradeep"
  };
   course2:{name:string; duration:string; trainername:string }={
    name:"Web Development",
    duration : "8 months",
    trainername :"peter parker"
  };
  course3:{name:string; duration:string; trainername:string }={
    name:"Auto-Mobiles",
    duration : "10 months",
    trainername :"Tony"
  };
}
