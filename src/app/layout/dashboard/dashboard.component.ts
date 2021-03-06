import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { FeedService } from '../../services/feed-service';
import { DataService } from '../../services/data-service';
import { Global } from '../../shared';
import { Service } from '../../services/services';
import { Userservice } from '../../services/userservice';
import { CategoryService } from '../../services/category-service';
import { Router } from "@angular/router";
//import { SpinnerService } from 'angular-spinners';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
	feeds:any=[];
    user:any;
    imgstatus:number=0;
    constructor(/*public spinnerService: SpinnerService,*/public feedService:FeedService,public dataservice:DataService,public variab:Global,public service:Service,public categoryService:CategoryService,public router:Router,public userService:Userservice) {
    }

    ngOnInit() {

     
     

    this.user = localStorage.getItem('name');
   
       //Get recent feeds
        this.service.getrecentfeeds().then(res=>{
          
       console.log("recent",this.variab.recentdocs)
            //document.getElementById('loading').style.display = 'none';
            this.variab.recentdocs=res;

            //this.variab.recentdocs.length = 0
            if(this.variab.recentdocs.length == 0) {
               // code...
               /*console.log("len em",this.variab.recentdocs.length);
               //this.spinnerService.show('mySpinner');
               this.imgstatus == 1;*/
               document.getElementById('loading').style.display = 'block';
               setTimeout(5000);
               console.log("load spinner");
             }
             else {
               //this.spinnerService.hide('mySpinner');
               document.getElementById('loading').style.display = 'none';
               console.log("nt em",this.variab.recentdocs.length);
               this.variab.recentdocs.map(val=>{
               this.feeds.push({value:val});
               });
             }
            
         });
        /*this.service.getlatestfeeds().then(res=>{
            this.feeds=res;
        });*/

        /*this.service.getAll().then(res=>{
            console.log(res);
        });*/
        //Get the user database url from user session
        var usersession = localStorage.getItem("superlogin.session")
        var jsonusersession = JSON.parse(usersession);
        let url = jsonusersession.userDBs.supertest;
         localStorage.setItem('url',url);
       //Get user subscribed feed names
        this.userService.getUserSubscriptions().then(res=>{
          this.variab.categoryupdated=res;
          //console.log(this.variab.categoryupdated)
          this.variab.categoryupdated.map(user=>{
            
            this.userService.pullnewFeeds(user.doc);
          })
            
        });

        
        
  
    }
    //Click on a feed name to navigate to feeds page and get the feeds based on the feed name clicked
    oncategory(category){
        this.router.navigate(['/feeds'],{queryParams:{feedname:category}} )
         this.feedService.getcategoryfeeds(category).then(res=>{
              this.variab.globalfeeds=res;
                  console.log(res);
        
        });
    }

    
}
 
