
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GlobalStore } from '../../store/globalStorage.service'
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  templateUrl: 'contact-me.html',
  styleUrls: ['contact-me.scss']
})

export class ContactMe implements OnInit, AfterViewInit  {

  private isInited;
  private contactIframe: ElementRef;
  public iframeHeight = 0;
  //@ViewChild('contactIframe', { static: false }) iframe; 

@ViewChild('contactIframe', { static: false }) set content(content: ElementRef) {
    if(content) { // initially setter gets called with undefined
        this.contactIframe = content;
    }
 }
  
  public iframeUrl: string = `https://${this.globalStore.getBlogDomain()}/contact-me/#main`;
  public iframeUrlSafe: SafeResourceUrl;
  public showLoading: boolean = true;

  constructor(  private globalStore: GlobalStore,
    private sanitizer:DomSanitizer   ) {

  }
  
  ngOnInit() {
    this.iframeUrlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
  }



  async contactIframeLoaded(){
    
if(this.contactIframe !== undefined){
  if (this.isInited) {
    //let submitButton = this.contactIframe.nativeElement.querySelector('input[submit]');
    //console.log(submitButton);
    //submitButton.getBoundingClientRect();
    //console.log(submitButton);
   //this.contactIframe.nativeElement.height = 835;
   this.contactIframe.nativeElement.contentWindow.postMessage('getIframeSize', "*")
   //console.log();
   //this.contactIframe.nativeElement.postMessage("getIframeSize");
  }
}
    
  }


  ionViewDidLoad() {
 
  } 

  ngAfterViewInit() {
    this.isInited = true;
 }
  
  //window.postMessage("getIframeSize", document.querySelector('iframe'), true);
  @HostListener('window:message', ['$event'])
   onGetContactPageSize(ev:any) {
    if(ev.data.msg !== undefined && ev.data.msg === 'contactHeight'){
      this.contactIframe.nativeElement.height = ev.data.size;
      this.showLoading = false;
    }

  }

  

}
