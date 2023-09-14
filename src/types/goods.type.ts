import { UserData } from '@/store/user';

export enum Quality {
  normal = 'normal',
  best = 'best',
  epic = 'epic',
  legend = 'legend',
}

export enum Part {
  head = 'head',
  hand = 'hand',
  body = 'body',
  weapon = 'weapon',
  leg = 'leg',
  ring = 'ring',
}

export interface Goods {
  name: string;
  quality: Quality;
  part: Part;
  weight: number;
  property: Pick<Partial<UserData>, 'goldPercent' | 'damagePercent' | 'dpsPercent' | 'goldSpeedPercent'>;
}
