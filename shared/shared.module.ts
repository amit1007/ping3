import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownDirective } from './dropdown.directive';

  //Components
@NgModule({
  exports: [      
    CommonModule,
    DropdownDirective
  ],
 
  imports: [
    CommonModule,
    RouterModule
  
    ],
    declarations: [
      DropdownDirective
    ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }