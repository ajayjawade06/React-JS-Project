"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app.get("/", (req, res) => {
    console.log(path_1.default.join(__dirname, "../public"));
    const foodData = [
        {
          "name": "Boiled Egg",
          "price": 10,
          "text": "A simple and healthy protein-packed boiled egg, perfect for a quick breakfast.",
          "image": "/images/egg.png",
          "type": "breakfast"
        },
        {
          "name": "RAMEN",
          "price": 25,
          "text": "A delicious bowl of ramen with rich broth, noodles, and fresh toppings for a satisfying lunch.",
          "image": "/images/ramen.png",
          "type": "lunch"
        },
        {
          "name": "GRILLED CHICKEN",
          "price": 45,
          "text": "Juicy and tender grilled chicken, seasoned to perfection and served with fresh veggies.",
          "image": "/images/chicken.png",
          "type": "dinner"
        },
        {
          "name": "CAKE",
          "price": 18,
          "text": "A soft and fluffy cake, perfect for satisfying your sweet tooth in the morning.",
          "image": "/images/cake.png",
          "type": "breakfast"
        },
        {
          "name": "BURGER",
          "price": 23,
          "text": "A classic juicy burger with fresh lettuce, cheese, and a toasted bun for a fulfilling lunch.",
          "image": "/images/burger.png",
          "type": "lunch"
        },
        {
          "name": "PANCAKE",
          "price": 25,
          "text": "Fluffy golden pancakes drizzled with syrup, making for a delightful dinner treat.",
          "image": "/images/pancake.png",
          "type": "dinner"
        }
      ];
      
    res.json(foodData);
});
app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
//# sourceMappingURL=index.js.map