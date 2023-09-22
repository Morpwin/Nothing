import { Quality } from './goods.type';

export interface Monster {
  level: number;
  hp: number;
  gold: number;
  quality?: Quality;
}
