import { Component } from '@angular/core';

@Component({
  selector: 'app-studentcard',
  imports: [],
  templateUrl: './studentcard.html',
  styleUrl: './studentcard.css'
})
export class Studentcard {
  student1:{name:string,rollnumber:number,course:string,pic:string}={
    name:"pradeep",
    rollnumber: 23,
    course: "Fullstack",
    pic :"img.png"
  };
  student2:{name:string,rollnumber:number,course:string,pic:string}={
    name:"peter parker",
    rollnumber: 24,
    course: "Web Development",
    pic :"img.png"
  };
  student3:{name:string,rollnumber:number,course:string,pic:string}={
    name:"Tony",
    rollnumber: 25,
    course: "Mech",
    pic :"img.png"
  };

}
