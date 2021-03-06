import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoverToolbarModule,ModalModule } from '../../components';
//import { CreateboardcomponentModule } from '../../components';
import { MagazineviewComponent } from './magazineview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HoverToolbarModule,
        ModalModule,
        NgbModule.forRoot(),
        NgxPaginationModule
    ],
    declarations: [MagazineviewComponent],
    exports: [MagazineviewComponent]
})
export class MagazineviewModule { }
