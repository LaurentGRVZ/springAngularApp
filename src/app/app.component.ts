import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
      this.getEmployees();
  }

  //Method deprecated

  /*public getEmployees():void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/

  public getEmployees():void {
    this.employeeService.getEmployees().subscribe(
      {
        next: (response: Employee[]) => {this.employees = response;},
        error: (error: HttpErrorResponse) => {alert(error.message);}
      }
    );
  }

  public onAddEmployee(addForm : NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      {
        next: (response: Employee) => {
          console.log(response);
          this.getEmployees();
        },
        error: (error: HttpErrorResponse) => {alert(error.message);}
      }
    );
  }

  // The | null allows null parameter instead of the object employee
  public onOpenModal(employee: Employee | null, mode: string): void{

    //Retrieve the container of the html page
    const container = document.getElementById('main-container');

    //Create button for modal
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display ='none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(mode === "add"){
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    if(mode === "edit"){
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if(mode === "delete"){
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
