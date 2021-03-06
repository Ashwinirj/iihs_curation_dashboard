import { Component, OnInit,Input } from '@angular/core';
import { NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { CategoryService } from '../../../services/category-service';
import { FeedService } from '../../../services/feed-service';
import { Userservice } from '../../../services/userservice';
import { Global } from '../../../shared/global';
import * as _ from 'lodash';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.scss']
})
export class CreateFeedComponent implements OnInit {

feedForm:FormGroup;
feedname = this.formBuilder.control('', [Validators.required]);
visible:boolean;
user:any;
labelForFeeds:any=[];
feedsnames:any=[];
followstatus:boolean=false;
queryString:any;
alertexists:boolean=false;
alertempty:boolean=false;
@Input('data') data:any;
@Input('url') url:any;
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public categoryservice:CategoryService,public variab:Global,public feedService:FeedService,public userservice:Userservice,public ngAlert:NgbAlertConfig) {
}

ngOnChanges(){
  console.log(this.labelForFeeds,this.data,this.url);
    this.user = localStorage.getItem('name')
    this.feedForm = this.formBuilder.group({
      feedname: this.feedname
    });
    this.userservice.getUserSubscriptions().then(res=>{
      this.variab.categoryupdated=res;
      this.feedsnames = this.variab.categoryupdated;
    });
    //Check for link is added to a feedname and user subscriptions
    var linkExists = this.variab.categoryupdated.map(link=>{
      
      var checkForLink = link.doc.metadata.map(everylink=>{

        if(everylink.link === this.url){
          this.followstatus=true;
          console.log("folloew",this.followstatus)
          return true;
        }
        else{
          this.followstatus=false;
        }
      })
      return _.compact(checkForLink);
    })
    console.log(linkExists);
    this.labelForFeeds = linkExists.map(link=>{
      if(link[0]){
        return true;
      }
      else{
        return false;
      }
    })
}
  ngOnInit() {
     
      //this.ngconfig.autoClose='outside';
  /*	this.user = localStorage.getItem('name')
  	this.feedForm = this.formBuilder.group({
  	  feedname: this.feedname
  	});
    this.userservice.getUserSubscriptions().then(res=>{
      this.variab.categoryupdated=res;
      this.feedsnames = this.variab.categoryupdated;
    });
    //Check for link is added to a feedname and user subscriptions
    var linkExists = this.variab.categoryupdated.map(link=>{
      
      var checkForLink = link.doc.metadata.feedlink.map(everylink=>{

        if(everylink === this.url){
          this.followstatus=true;
          return true;
        }
      })
      return _.compact(checkForLink);
    })
    
    this.labelForFeeds = linkExists.map(link=>{
      if(link[0]){
        return true;
      }
      else{
        return false;
      }
    })
    console.log(this.labelForFeeds);*/


  }
  //Create a new feed name and add the feed name and metadata to user subscriptions
 createfeed(i){

   //this.data.feedlink = [this.url];
   let doc={
         "feedname":this.feedname.value,
         "metadata":[this.data]
        }

     
     if(this.feedname.value === ''){
       console.log("feedname cant be empty");
       this.alertempty = true;
       this.ngAlert.type = 'warning';
       //this.visible = false;
     }
     else{
     
       
       var toCheckrepeatFeednames:any =[];
       var feednameExists :any = 0;
        
       this.feedsnames.map(feedname=>{
          if(this.feedname.value === feedname.doc.feedname){
            console.log("boardname exists");
            feednameExists = 1; 
          }
        })
       if(feednameExists == 1){
         console.log("exit");
         this.alertexists = true;
         this.ngAlert.type = 'warning'
       }
       if(feednameExists == 0){
         console.log("add");
         this.feedService.addFeed(doc).then(res=>{
               if(res['ok'] == true){
                 this.variab.categoryupdated.push({doc:doc});  
                 this.visible = false;
                 this.followstatus = true;
                 this.alertempty = false;
                    this.alertexists = false;
               }
         })
       }
     
       
       

     
   }
   
   
 }
 //Save the feed metadata and link  to a already feed name 
 addtofeed(feed,i){

 	var update:any;//update status variable

//Check if the feedname already exists in the database
   var checkForFeedname = this.variab.categoryupdated.map(name=>{
     
        if(name.doc.feedname === feed){
          update = 1;
         }
         else{
           update = 0;
       
         }
        
     //If the feedname exists then update the already existing doc with the new feed link 
   
     if(update == 1){
         console.log("doc",name.doc.metadata);
         name.doc.metadata.push(this.data);

         this.feedService.update(name.id,name.doc)
         this.labelForFeeds[i]=true;
        }

   })

 this.followstatus = true;
 }
 cancelfeed(){
   this.visible = false;
   this.alertempty = false;
   this.alertexists = false;
 }
 removefromboard(i){
    this.labelForFeeds[i]=false;
  }
  public closeAlert() {
      this.alertexists=false;
      this.alertempty= false;
      
  }

  
}
