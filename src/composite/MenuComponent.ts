import type { MenuItemData } from "../domain/types.js";

export interface MenuComponent {
  getName(): string;
  getPrice(): number;
  display(indent?: number): string;
  getItems(): MenuItemData[];
}

export abstract class BaseMenuComponent implements MenuComponent {
  constructor(protected name: string) {}

  getName(): string {
    return this.name;
  }

  protected pad(level: number): string {
    return "  ".repeat(level);
  }

  abstract getPrice(): number;
  abstract display(indent?: number): string;
  abstract getItems(): MenuItemData[];
}

/** Leaf — a single menu item. */
export class MenuItem extends BaseMenuComponent {
  constructor(
    name: string,
    private price: number,
    private description: string,
    private id: string,
    private category = "General"
  ) {
    super(name);
  }

  getPrice(): number {
    return this.price;
  }

  display(indent = 0): string {
    return `${this.pad(indent)}• ${this.name} — ${this.price.toFixed(2)} EUR (${this.description})`;
  }

  getItems(): MenuItemData[] {
    return [
      {
        id: this.id,
        name: this.name,
        price: this.price,
        description: this.description,
        category: this.category,
      },
    ];
  }
}

/** Composite — a category containing items or sub-categories. */
export class MenuCategory extends BaseMenuComponent {
  private children: MenuComponent[] = [];

  add(component: MenuComponent): void {
    this.children.push(component);
  }

  getPrice(): number {
    return this.children.reduce((sum, c) => sum + c.getPrice(), 0);
  }

  display(indent = 0): string {
    const header = `${this.pad(indent)}[${this.name}]`;
    const body = this.children.map((c) => c.display(indent + 1)).join("\n");
    return `${header}\n${body}`;
  }

  getItems(): MenuItemData[] {
    return this.children.flatMap((c) => c.getItems());
  }
}
