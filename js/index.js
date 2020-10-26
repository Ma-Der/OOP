import { Contact, Group, AddressBook } from '/js/addressBook.js';

// start AddressBook

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


document.querySelector('#main').innerHTML = JSON.stringify(man);
