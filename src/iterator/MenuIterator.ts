import type { MenuItemData } from "../domain/types.js";
import type { MenuComponent } from "./MenuComponent.js";

/**
 * Iterator — traverses all menu items in a composite menu tree
 * without exposing the internal structure to the client.
 */
export class MenuIterator implements Iterator<MenuItemData> {
  private items: MenuItemData[];
  private index = 0;

  constructor(menu: MenuComponent) {
    this.items = menu.getItems();
  }

  [Symbol.iterator](): Iterator<MenuItemData> {
    return this;
  }

  next(): IteratorResult<MenuItemData> {
    if (this.index < this.items.length) {
      return { value: this.items[this.index++], done: false };
    }
    return { value: undefined, done: true };
  }

  hasNext(): boolean {
    return this.index < this.items.length;
  }

  current(): MenuItemData | undefined {
    return this.items[this.index];
  }

  reset(): void {
    this.index = 0;
  }

  count(): number {
    return this.items.length;
  }
}
