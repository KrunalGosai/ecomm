import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-home-three',
  templateUrl: './home-three.component.html',
  styleUrls: ['./home-three.component.sass']
})
export class HomeThreeComponent implements OnInit {


  products: Product[];
  public banners = [];

  shoppingCartItems: CartItem[] = [];
  wishlistItems  :   Product[] = [];

  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;

  public slides = [
    { title: 'Huge sale', subtitle: 'Up to 70%', image: 'https://img.freepik.com/free-vector/merry-christmas-banner-sale_91008-10.jpg' },
    { title: '', subtitle: '', image: 'https://image.freepik.com/free-vector/big-sale-special-offer-banner-template_7547-308.jpg' },
    { title: '', subtitle: '', image: 'https://cdni.iconscout.com/illustration/premium/thumb/halloween-offer-banner-997852.png' },
    { title: '', subtitle: '', image: 'https://image.freepik.com/free-vector/special-offer-vibrant-banner-background_105164-558.jpg' }
    // { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.productService.getProducts()
    .subscribe(
      (product: Product[]) =>  {
        this.products = product;
        console.log(product);
      }
    );

  }

     // Collection banner
     public discount = [{
      image: 'https://images-na.ssl-images-amazon.com/images/I/71hfs3%2BFRCL._AC_SL1500_.jpg',
      title: 'Tablets, Smartphones and more',
      subtitle: 'Sale up to 30%',
    }, {
      image: 'https://images-na.ssl-images-amazon.com/images/I/61ZL7iBKodL._AC_SL1000_.jpg',
      title: 'New Cameras Collection',
      subtitle: 'Sale up to 30%',
    }]

}
