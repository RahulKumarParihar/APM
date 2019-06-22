import { Component } from '@angular/core';

@Component({
    selector: 'pm-product',
    templateUrl: './product-list.component.html'
})

export class ProductListComponent {
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    products: any[] = [
        {
            productId: 2,
            productName: 'Garden Cart',
            productCode: 'GDN-0023',
            releaseDate: 'March 18, 2016',
            description: '15 gallon capacity rolling garden cart.',
            price: 32.99,
            starRating: 4.2,
            imageUrl: 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
        },
        {
            productId: 5,
            productName: 'Hammer',
            productCode: 'TBX-0048',
            releaseDate: 'May 21, 2016',
            description: 'Curved claw steel hammer',
            price: 8.9,
            starRating: 4.8,
            imageUrl: 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
        }
    ];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
