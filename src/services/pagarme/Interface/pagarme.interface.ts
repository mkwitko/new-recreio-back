import { Card } from './card.interface';

export interface CreditCardInterface {
  name?: string;
  amount?: number;
  description?: string;
  quantity?: number;
  card?: Card;
}
