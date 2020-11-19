import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks:[];
  constructor(
    private api:ApiService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.api.get(`/user/task`).subscribe(
      (res:any)=>{
        console.log(res);
      },
      (err)=>{
        console.log(err)
      })

  }

}
