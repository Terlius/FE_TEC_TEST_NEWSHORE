
import { Transport } from './transport.model';

export interface Flight {
   
    transport?: Transport;
    price?: number;
    origin?: string;
    destination?: string;
    currency?: string;
  
}