import { WhmcsClient } from '@play.app/types/Whmcs/WhmcsClient';
import { WhmcsOrder } from '@play.app/types/Whmcs/WhmcsOrder';
import { WhmcsDomain } from '@play.app/types/Whmcs/WhmcsDomain';
import { WhmcsPurchasedProduct } from '@play.app/types/Whmcs/WhmcsPurchasedProduct';
import { WhmcsProduct } from '@play.app/types/Whmcs/WhmcsProduct';

export interface WhmcsStateModel {
  stats: string | null;
  clients: WhmcsClient[] | null;
  orders: WhmcsOrder[] | null;
  clientDomains: WhmcsDomain[] | null;
  clientProducts: WhmcsPurchasedProduct[] | null;
  clientDetails: string | null;
  products: WhmcsProduct[] | null;
}
