import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { RecentlyReadRoutingModule } from './recently-read-routing.module';
import { RecentlyReadComponent } from './recently-read.component';
import { PageHeaderModule } from '../../shared';
import { StatModule } from '../../shared';
import { Service } from '../../services/services';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
    ArticleviewModule,
    MagazineviewModule,
    TitleViewModule,
    CardViewModule
} from '../../sharedfeeds/view';
import { HoverToolbarModule } from '../../sharedfeeds/components';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        RecentlyReadRoutingModule,
        StatModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        MagazineviewModule,
        TitleViewModule,
        CardViewModule,
        ArticleviewModule,
        HoverToolbarModule
    ],
    declarations: [
        RecentlyReadComponent
        
       
    ],
   
    providers: [Service,DatePipe]
     
})
export class RecentlyReadModule { }
