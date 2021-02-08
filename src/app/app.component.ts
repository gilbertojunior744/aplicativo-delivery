import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Produtos',
      url: '/produtos',
      icon: 'fast-food'
    },

    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'list-circle'
    },

    {
      title: 'Carrinho',
      url: '/carrinho',
      icon: 'cart'
    },
    {
      title: 'Acompanhar Pedido',
      url: '/pedidos',
      icon: 'list'
    }
   
  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    
  }
}
