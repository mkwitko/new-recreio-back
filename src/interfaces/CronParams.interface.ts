import { CronParamsCustomInterface } from './CronParamsCustom.interface';
export interface CronParamsInterface {
  insert?: boolean;
  update?: boolean;
  delete?: boolean;
  customObj?: CronParamsCustomInterface;
}
