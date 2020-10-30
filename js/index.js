import { Contact, Group, AddressBook } from '/js/addressBook.js';
import { CartItem, Cart } from '/js/cart.js';
import { EmailBuilder } from '/js/EmailBuilder.js';
import { Library, Book } from '/js/Library.js';

// AddressBook

const man = new Contact(
  'Mike',
  'Nowak',
  'any@anu.pl'
);

const man1 = new Contact(
  'Guy',
  'Ford',
  'asdadasasd@asd.pl'
);

const man2 = new Contact(
  'Haron',
  'Call',
  'asdadasasd@asd.pl'
);
const man3 = 'kjasd';
man.modifyName('Jared');
console.log("Contacts: " + JSON.stringify(man) + JSON.stringify(man1));

const groupOne = new Group('Best');

groupOne.addContact(man);

console.log(groupOne);
groupOne.checkContact(man);
groupOne.addContact(man1);
//groupOne.addContact(man3);
console.log(groupOne);
groupOne.deleteContact(man1);
console.log(groupOne);

const addressOne = new AddressBook();

console.log(addressOne);
addressOne.addContact(man);
addressOne.addContact(man1);
addressOne.addContact(man2);
console.log(addressOne);
addressOne.deleteContact(man1);
console.log(addressOne);
addressOne.searchContact('jared');
addressOne.editContact(man, 'Tommy', undefined, 'dsa@AudioDestinationNode.pl');
console.log(addressOne);

console.log(addressOne);


//document.querySelector('#main').innerHTML = JSON.stringify(man);

// CART

console.log("-------------------------------------------------------------------------------");

const item1 = new CartItem('True', 'Thriller', 35, 5);
const item2 = new CartItem('Vaery', 'Comedy', 50);
const cart1 = new Cart('midreader');

cart1.addItem(item1, 5);
cart1.addItem(item2, 15);
//cart1.deleteItem(item1);
cart1.changeItemAmount(item2 ,20);
console.log(cart1);
cart1.cartSummary();

// Email Builder

console.log("-------------------------------------------------------------------------------");

const newMail = new EmailBuilder('Leon Zawodowiec')
.setFrom('sdasd@dsd.pl')
.setTo('xzczxvb@poi.eu')
.setCc('dsadfaf@sdsd.sd', 'asdasd@dfffdd.fd')
.setBcc('dsadsadasdsadd@dsds.khh', 'dsassdafa@dsg.kh')
.setMessage('sd')
.build()
console.log(newMail)

// Library

console.log("-------------------------------------------------------------------------------");

const gambit = new Book('Gambit', 'Neil Shon', 'short description');
const fightingDestiny = new Book('Fighting with destiny', 'Carl Lewis', 'very short description');
const temptations = new Book('Temptations', 'Tom Nowak', 'another short description');
const original = new Book('Original Sin', 'Jane Below', 'so short desscription');
const fixer = new Book('Fixer', 'John Grisham', 'good good book');

const library = new Library();
library.addBook(gambit);
library.addBook(fightingDestiny);
library.addBook(temptations);
library.addBook(original);
library.addBook(fixer);
library.rentBook(gambit);
library.rentBook(original);
library.returnBook(gambit);
//library.returnBook(original);
console.log(library);


// User

console.log("--------------------------------------------------------------------------------------");

