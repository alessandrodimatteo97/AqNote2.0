import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MediaPreviewDirective} from '../media-preview.directive';


@NgModule({
  declarations: [MediaPreviewDirective],
  imports: [
    CommonModule
  ],
  exports: [MediaPreviewDirective]

})
export class MyCommonModule { }
