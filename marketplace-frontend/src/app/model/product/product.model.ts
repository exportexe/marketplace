import {Base} from '../base.model';
import {Price} from './price.model';

export interface Product extends Base {
    brand: string;
    imageSrc: string;
    rating: number;
    price: Price;
    description: string;
    imageAlt?: string;
    isSelected?: boolean;
}
