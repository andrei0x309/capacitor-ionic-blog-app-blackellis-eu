
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

 


@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
  styleUrls: ['post.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostPage implements OnInit {
  public post;
  public postContent;
  public postTitle;
 
  constructor( public sanitizer:DomSanitizer  ) {

  }
   

preparePostContent(content: string){
  content = this.decodeHtml(content);
  
  if( content.match(/class="wpulike wpulike-robeen/) !== null ){
    content = content.replace(/<div class="wpulike wpulike-robeen.*?<\/div><\/div>/s, '');
  }

return this.sanitizer.bypassSecurityTrustHtml(content);
}


  ngOnInit() {
    this.post = history.state.data.post;
    history.state.data.post = undefined;
    this.postTitle = this.decodeHtml(this.post.title.rendered);
    this.postContent = this.preparePostContent( '&nbsp;&nbsp;&nbsp;' + this.post.content.rendered);
  }

  decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
  
 
   
  ionViewDidLoad() {
 
  } 
  
  
}
