import { Response } from '@angular/http';
import { TicTacService } from './services/tictac.services';
import TicTac from './models/tictac.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    private tictacService: TicTacService
  ) { }

  //Declaring the new todo Object and initilizing it
  public newTictac: TicTac = new TicTac()

  //An Empty list for the visible todo list
  tictacsList: TicTac[];
  editTictacs: TicTac[] = [];


  ngOnInit(): void {

    //At component initialization the 
    this.tictacService.getTicTacs()
      .subscribe(tictacs => {
        //assign the todolist property to the proper http response
        this.tictacsList = tictacs
        console.log(tictacs)
      })
  }

  //This method will get called on Create button event
  
  create() {
    this.tictacService.createTictac(this.newTictac)
      .subscribe((res) => {
        this.tictacsList.push(res.data)
        this.newTictac = new TicTac()
      })
  }

  // editTodo(tictac: TicTac) {
  //   console.log(tictac)
  //    if(this.tictacsList.includes(tictac)){
  //     if(!this.editTodos.includes(tictac)){
  //       this.editTodos.push(tictac)
  //     }else{
  //       this.editTodos.splice(this.editTodos.indexOf(tictac), 1)
  //       this.tictacService.editTodo(tictac).subscribe(res => {
  //         console.log('Update Succesful')
  //        }, err => {
  //           this.editTodo(tictac)
  //           console.error('Update Unsuccesful')
  //         })
  //       }
  //     }
  //   }

}


