import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';
import { Post } from '../services/post.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  id : string;
  nome : string;
  imagem : string;
  valor : number;
  descricao : string;
  url_site_img : string;
  cpf : string;
  total_carrinho : string;
  dadosLogin : any;

  constructor(private storage : NativeStorage, private toast : ToastController, private router : Router, private actRouter : ActivatedRoute, private provider : Post) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.id = data.id;
     
    });

    
  }
  ionViewWillEnter(){
    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
      this.cpf = this.dadosLogin.cpf;
     
      
    }); 
    this.cpf = '777.777.777-77';

    this.listarCarrinho();
    this.url_site_img = this.provider.url_site_img_produtos; 
    this.mostrarProduto();

  }

  mostrarProduto(){
    return new Promise(resolve => {

      let dados = {
        requisicao : 'mostrar-produto',
        id :this.id
        };

        this.provider.dadosApi(dados,'apiProdutos.php').subscribe(data => {
          this.nome = data['nome'];
          this.imagem = data['imagem'];
          this.valor = data['valor'];
          this.descricao = data['descricao'];
        });
      });
  }

  addCarrinho(){
    if(this.cpf === undefined){
      this.mensagemLogar();
      this.router.navigate(['/login']);
      console.log(this.cpf);
      return;
    }
    return new Promise(resolve => {
          
      let dados = {
        requisicao : 'add-carrinho',
        id_produto : this.id, 
        cpf : this.cpf, 
        
        };
  
        this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
                 
            this.mensagemSalvar();
            this.listarCarrinho();
                    
        });
    });
  }

  listarCarrinho(){
    return new Promise(resolve => {
  
    let dados = {
      requisicao : 'listar-carrinho',
      cpf :this.cpf, 
      };
  
      this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
  
          
            this.total_carrinho = data['total'];
           
               
        resolve(true);
        
    });
  
  });
    
  }

  categorias(){
    this.router.navigate(['/categorias']);
  }

  carrinhoPage(){
    this.router.navigate(['/carrinho']);
  }


  //MENSAGENS
  async mensagemSalvar() {
    const toast = await this.toast.create({
      message: 'Adicionado ao Carinho!',
      duration: 500,
      color: 'primary'
    });
    toast.present();
  }
  
  
  async mensagemLogar() {
    const toast = await this.toast.create({
      message: 'Você precisa estar logado! Faça Login ou Cadastre-se!',
      duration: 4000,
      color: 'danger'
    });
    toast.present();
  }

}
