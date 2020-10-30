// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';



export class Product {
  _id?: number;
  name?: string;
  price?: number;
  saleprice?: number;
  discount?: number;
  pictures?: string;
  shortdetails?: string;
  description?: string;
  stock?: number;
  newPro?: boolean;
  brand?: string;
  sale?: boolean;
  categoryname?: string;
  tags?: ProductTags[];
  colors?: ProductColor[];

  constructor(
    _id?: number,
    name?: string,
    price?: number,
    saleprice?: number,
    discount?: number,
    pictures?: string,
    shortdetails?: string,
    description?: string,
    stock?: number,
    newPro?: boolean,
    brand?: string,
    sale?: boolean,
    categoryname?: string,
    tags?: ProductTags[],
    colors?: ProductColor[]
  ) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.saleprice = saleprice;
    this.discount = discount;
    this.pictures = pictures;
    this.shortdetails = shortdetails;
    this.description = description;
    this.stock = stock;
    this.newPro = newPro;
    this.brand = brand;
    this.sale = sale;
    this.categoryname = categoryname;
    this.tags = tags;
    this.colors = colors;
  }

 }
  // Color Filter
  export interface ColorFilter {
    color?: ProductColor;
  }
