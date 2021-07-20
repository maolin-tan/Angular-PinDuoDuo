import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ImageSliderComponent, TopMenu } from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService, token } from '../../services';
// import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private service: HomeService,
    private route: ActivatedRoute
    ) { }

    @Inject(token) private baserUrl2: string;
    @ViewChild('imageSlider') imageSlider: ImageSliderComponent;
    scrollableTabagColor = 'red';
    topMenus: TopMenu[] = [];
    color: 'red';
    selectedTabLink$: Observable<string>;
    ngOnInit(): void {
      this.selectedTabLink$ = this.route.firstChild.paramMap.pipe(
        filter(params => params.has('tablink')),
        map(params => params.get('tablink'))
      );
      console.log(this.selectedTabLink$);
      // this.topMenus = this.service.getTabs();
      // 展示异步方法
      this.service.getTabs().subscribe( tabs => { this.topMenus = tabs; });
      // 打印services传过来的token
      console.log(this.baserUrl2);
    }
    handleTabSelected(topMenus: TopMenu): any{
      const colors = ['white', 'green', 'blue', 'black', 'red', 'pink', 'orange'];
      const idx = Math.floor(Math.random() * 2);
      this.scrollableTabagColor = colors[idx];
      console.log(topMenus);
      // 跳转
      this.router.navigate(['home', topMenus.link]);
    }


    ngAfterViewInit(): void {
     console.log('ngAfterViewInit', this.imageSlider);
    }

}
