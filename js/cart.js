function validateCartItem(cartItem) {
  if(!(Object.prototype.toString.call(cartItem) === '[object Object]')) throw new Error("Argument must be a CartItem object.");
  if(!(cartItem.hasOwnProperty('id') && 
    cartItem.hasOwnProperty('name') && 
    cartItem.hasOwnProperty('category') && 
    cartItem.hasOwnProperty('price') && 
    cartItem.hasOwnProperty('discount'))) throw new Error("This is not CartItem object, argument needs to be a CartItem object.");
}

function validateAmount(amount) {
  if(!(typeof amount === 'number')) throw new Error("Argument must be a number.");
  if(isNaN(amount)) throw new Error("Argument must be a number.");
  if(amount < 0) throw new Error("Argument must be greater or equal to zero.");
}

function validateString(str) {
  if(!(typeof str === 'string')) throw new Error("Argument must be a string.");
  if(str.length === 0) throw new Error("Empty string.")
}

function validateNumber(num) {
  if(!(typeof num === 'number' && !isNaN(num))) throw new Error("Argument should be a number.");
  if(!(num >= 0)) throw new Error("Argument should be more than zero.");
}

  export class CartItem {
    constructor(name, category, price, discount = 0) {
      this.id = uuidv4();
      this.name = name;
      this.category = category;
      this.price = price - (price * discount / 100);
      this.discount = discount;
    }
   
    modifyPrice(price) {
      validateNumber(price);
      this.price = price;
    }
   
    modifyName(name) {
      validateString(name);
      this.name = name;
    }
   
    modifyDiscount(discount) {
      validateNumber(price);
      this.discount = discount;
    }
   
    addCategory(category) {
      validateString(category);
      this.category = category;
    }
  }

  export class Cart {
    constructor(discountCode = 'noDiscount') {
      validateString(discountCode);
      const discountCodes = {
        bestreader: 30,
        midbestreader: 25,
        midreader: 20,
        newreader: 5,
        noDiscount: 0
      };

      this.id = uuidv4();
      this.discountCode = discountCode;

      if(Object.keys(discountCodes).find(key => discountCode === key)) {
        Object.keys(discountCodes).some(key => {
          if(discountCode === key) {
            this.discount = discountCodes[key];
          }
        });
      } else this.discount = 0;

      this.cartList = [];
    }
   
    addItem(cartItem, amount) {
      validateCartItem(cartItem);
      validateAmount(amount);
      this.cartList.push({...cartItem, amount})
    }
   
    deleteItem(cartItem) {
      validateCartItem(cartItem);
      const result = this.cartList.filter(item => item.id !== cartItem.id ? item : null);
      this.cartList = result;
    }
   
    changeItemAmount(cartItem, amount) {
      validateCartItem(cartItem);
      validateAmount(amount);
      const result = this.cartList.filter(item => item.id === cartItem.id);
      const [ item ] = result;
      item.amount = amount;
    }
   
    cartSummary() {
      const result = this.cartList.map(item => ((item.price * item.amount) - (item.price * item.amount * (this.discount/100)))).reduce((acc, el) => acc += el);
      console.log(`Your cart is worth ${result.toFixed(2)} PLN.`);
    }
  }
  
