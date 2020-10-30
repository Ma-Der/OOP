function validateEmail(email) {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
}
function validateContact(contact) {
  if(!(contact instanceof Contact)) throw new Error("Argument must be a Contact object.");
}

function validateGroup(group) {
  if(!(group instanceof Group)) throw new Error("Argument must be a Group object.");
}

export class Contact {
  constructor(name, surname, email) {

    if(!validateEmail(email)) throw new Error("Invalid email.");
    if(!(typeof name === 'string')) throw new Error("Argument must be string.");
    if(!name) throw new Error("Please type your name."); 
    if(!(typeof surname === 'string')) throw new Error("Argument must be string.");
    if(!surname) throw new Error("Please type your surname.");
    
    this.id = uuidv4();
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.createDate = Date.now();
    this.modificationDate = Date.now();
    
  }

  modifyName(name) {
    if(!(typeof name === 'string')) throw new Error("Argument must be string.");
    if(!name) throw new Error("Please type your modify name."); 
    this.name = name;
    this.modificationDate = Date.now();
  }
  modifySurname(surname) {
    if(!(typeof surname === 'string')) throw new Error("Argument must be string.");
    if(!surname) throw new Error("Please type your modify surname.");
    this.surname = surname;
    this.modificationDate = Date.now();
  }
  modifyEmail(email) {
    if(!validateEmail(email)) throw new Error("Modified E-mail is invalid.");
    this.email = email;
    this.modificationDate = Date.now();
  }
}

export class Group {
  constructor(groupName) {
    if(!(typeof groupName === 'string')) throw new Error("Argument must be string.");
    this.id = uuidv4();
    this.groupName = groupName;
    this.contactList = [];
  }

  modifyGroupName(name) {
    if(!(typeof name === 'string')) throw new Error("Argument must be string.");
    this.groupName = name;
  }
  addContact(contact) {
    validateContact(contact); 
    if(!(this.contactList.find(foundContact => foundContact.id === contact.id))) {
      this.contactList.push(contact);
    } else return alert("Contact already exists in this address book.");
    
  }
  deleteContact(name) {
    if(!validateContact(name)) {
      const result = this.contactList.filter((element) => {
        return element.id !== name.id ? element : null;
      });
      this.contactList = result;
    }
  }
  checkContact(contact) {
    validateContact(contact);   
    this.contactList.some((element) => element.id === contact.id)
      ? console.log('Contact exists')
      : console.log('Contact does not exists');
  }
}

export class AddressBook {
  constructor() {
    this.contactList = [];
    this.groupList = [];
  }

  searchContact(filter) {
    let filtr = filter.toString().toLowerCase();
    if (!(filtr.length > 2)) alert("For search I need more than 2 characters.")
      const result = this.contactList.filter(function search(element) {
        return Object.keys(element).some((key) => {
          if (typeof element[key] === 'string') {
            if (element[key].toLowerCase().includes(filtr)) {
              return element;
            }
          } else if (typeof element[key] === 'number') {
            if (element[key].toString().includes(filtr)) {
              return element;
            }
          } else if (element[key] && typeof element[key] === 'object') {
            return search(element[key]);
          }
        });
      });
      return console.log(result);
  }

  addContact(contact) {
    validateContact(contact);  
    if(!(this.contactList.find(foundContact => foundContact.id === contact.id))) {
      this.contactList.push(contact);
    } else return alert("Contact already exists in this address book.");
      
  }

  editContact(contact, name = contact.name, surname = contact.surname, email = contact.email) {

    validateContact(contact);
    if(!(typeof name === 'string')) throw new Error("Name should be string type.");
    if(!(typeof surname === 'string')) throw new Error("Surname should be string type.");
    if(!validateEmail(email)) throw new Error("Invalid email address.");
    
    if(name !== contact.name) {
      contact.name = name;
      console.log(contact.id + ' name modified.');
    }
    if(surname !== contact.surname) {
      contact.surname = surname;
      console.log(contact.id + ' surname modified.');
    }  
    if(email !== contact.email) {
      contact.email = email;
      console.log(contact.id + ' email modified.');
    }

    contact.modificationDate = Date.now();
  }

  deleteContact(contact) {

    validateContact(contact);
    const result = this.contactList.filter((element) => {
      return element.id !== contact.id ? element : null;
    });
    this.contactList = result;
  }

  addGroup(group) {
    validateGroup(group);
    if(!(this.groupList.find(foundGroup => foundGroup.id === group.id))) {
      this.contactList.push(group);
    } else return alert(this.group.groupName + " already exists in this address book.");
  }
  editGroup(group, name = group.groupName) {
    validateGroup(group);
    if(!(typeof name === 'string')) throw new Error("Name should be string type.");
    
    if(name !== group.groupName) {
      group.groupName = name;
      console.log(group.id + ' name of the group has been modified.');
    }
  }
  deleteGroup(group) {
    validateGroup(group);
    const result = this.groupList.filter((element) => {
      return element.id !== group.id ? element : null;
    });
    this.groupList = result;
  }
}