import { MenuCategory, MenuItem } from "./MenuComponent.js";

/**
 * weEatz master menu — 20 fast-food products across burgers, sandwiches,
 * sides, and drinks. Each ghost kitchen serves the same catalog.
 */
export function buildWeEatzMenu(): MenuCategory {
  const menu = new MenuCategory("weEatz — Prishtina Fast Food Menu");

  const burgers = new MenuCategory("Burgers");
  burgers.add(new MenuItem("Classic Smash Burger", 4.5, "Beef patty, lettuce, tomato, house sauce", "b1", "Burgers"));
  burgers.add(new MenuItem("Double Cheese Burger", 5.9, "Two patties, double cheddar, pickles", "b2", "Burgers"));
  burgers.add(new MenuItem("BBQ Bacon Burger", 6.5, "Smoky BBQ, crispy bacon, onion rings", "b3", "Burgers"));
  burgers.add(new MenuItem("Crispy Chicken Burger", 5.2, "Breaded chicken, mayo, slaw", "b4", "Burgers"));
  burgers.add(new MenuItem("Spicy Hellfire Burger", 6.0, "Jalapeños, pepper jack, chipotle mayo", "b5", "Burgers"));
  burgers.add(new MenuItem("Veggie Avocado Burger", 5.5, "Plant-based patty, avocado, sprouts", "b6", "Burgers"));

  const sandwiches = new MenuCategory("Sandwiches & Wraps");
  sandwiches.add(new MenuItem("Grilled Chicken Sandwich", 4.8, "Marinated breast, garlic aioli", "sw1", "Sandwiches & Wraps"));
  sandwiches.add(new MenuItem("Club Sandwich", 5.0, "Turkey, bacon, lettuce, triple-decker", "sw2", "Sandwiches & Wraps"));
  sandwiches.add(new MenuItem("Falafel Wrap", 4.2, "Crispy falafel, tahini, pickled veg", "sw3", "Sandwiches & Wraps"));
  sandwiches.add(new MenuItem("Philly Cheese Steak", 6.8, "Sliced beef, peppers, melted provolone", "sw4", "Sandwiches & Wraps"));
  sandwiches.add(new MenuItem("Tuna Melt Sub", 4.5, "Tuna salad, cheddar, toasted roll", "sw5", "Sandwiches & Wraps"));

  const sides = new MenuCategory("Sides");
  sides.add(new MenuItem("Crispy Fries", 2.0, "Golden shoestring fries", "sd1", "Sides"));
  sides.add(new MenuItem("Loaded Nachos", 3.5, "Chips, cheese sauce, jalapeños", "sd2", "Sides"));
  sides.add(new MenuItem("Onion Rings", 2.5, "Beer-battered rings", "sd3", "Sides"));
  sides.add(new MenuItem("Coleslaw", 1.8, "Creamy cabbage slaw", "sd4", "Sides"));
  sides.add(new MenuItem("Mozzarella Sticks", 3.0, "Six sticks, marinara dip", "sd5", "Sides"));

  const drinks = new MenuCategory("Drinks");
  drinks.add(new MenuItem("Coca-Cola 0.33L", 1.5, "Chilled can", "dr1", "Drinks"));
  drinks.add(new MenuItem("Fanta 0.33L", 1.5, "Orange, chilled can", "dr2", "Drinks"));
  drinks.add(new MenuItem("Rugova Water 0.5L", 1.0, "Still water", "dr3", "Drinks"));
  drinks.add(new MenuItem("Fresh Lemonade", 2.0, "House-made, daily", "dr4", "Drinks"));

  menu.add(burgers);
  menu.add(sandwiches);
  menu.add(sides);
  menu.add(drinks);

  return menu;
}
