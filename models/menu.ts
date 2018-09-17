import {MenuItem} from './menu-item';

export class Menu {
  key: string;
  menuItems: MenuItem[] = [];
  constructor(private paraMap?: {[ObjKey: string]: any}, private k?) {
    this.key = k;
    for (const key in paraMap) {
      if (paraMap.hasOwnProperty(key)) {
        if (key === 'menuItems') {
          for (const itemIndex in paraMap[key]) {
            if (true) {
              const temp = paraMap[key][itemIndex];
              temp.key = itemIndex;
              this.menuItems.push(temp);
            }
          }
        }
      }
    }
  }
}
