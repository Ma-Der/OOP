function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const images = {
    img1: '../img/01.jpg',
    img2: '../img/02.jpg',
    img3: '../img/03.jpg',
    img4: '../img/04.jpg',
    img5: '../img/05.jpg'
}
function randomPic() {
    const value = Object.values(images);
    const randomNum = Math.floor(Math.random() * 5);
    return value[randomNum];
}

function validateBook(book) {
    if(!(book instanceof Book)) throw new Error("Argument must be a Book object.");
}

function validateString(str) {
    if(!(typeof str === 'string')) throw new Error("Argument must be a string.");
    if(str.length === 0) throw new Error("Empty string.")
}
  
export class Book {
    constructor(title, author, description) {
        validateString(title);
        validateString(author);
        validateString(description);
        this.id = uuidv4();
        this.title = title;
        this.author = author;
        this.picture = randomPic();
        this.description = description;
    }
}

class Booking {
    constructor() {
        this.lendDate = new Date();
        this.returnDate = addDays(this.lendDate, 7);
        let result = (Date.parse(this.returnDate) - Date.parse(this.lendDate)) / (1000*60*60*24);
        let penalty = 0;
        if(result > 7) {
            let penaltyDays = result - 7;
            penalty = 10;
            for(let i = 1; i < penaltyDays; i++) {
               penalty += 10;
            }        
        }
        this.penalty = penalty;
    }

    setBook(book) {
        validateBook(book);
        this.id = book.id;
        this.title = book.title;
        return this;
    }
    lendBook(book, list) { 
        validateBook(book);
        if(!Array.isArray(list)) throw new Error("Second argument should be an array.");
        if(!list.find(item => item.id === book.id)) return console.log("Currently this book is unavailable in our library.");
        const result = list.filter(item => item.id !== book.id);
        return result;
    }

    giveBackBook(book, list) {
        validateBook(book);
        if(!Array.isArray(list)) throw new Error("Second argument should be an array.");
        if(!list.find(item => item.id === book.id)) return console.log("This book was never borrowed in first place.");
        
        const penalty = list.reduce((acc, el) => {
            if(el.id === book.id) {
                acc = el.penalty;
            }
            return acc;
        }, 0);

        if(penalty === 0) { 
            return console.log("You've returned book on time, thank you come again.");
        } else return console.log(`You've missed deadline, you need to pay penalty for each day: ${penalty} PLN`);
    }
}

export class Library {
    constructor() {
        this.bookList = [];
        this.lendList = [];
        this.lendedBookList = [];
    }

    addBook(book) {
        validateBook(book);
        this.bookList.push(book);
    }

    deleteBook(book) {
        validateBook(book);
        this.bookList = this.bookList.reduce((acc, el) => {
            if(book.id !== el.id) {
                acc.push(el);
            }
            return acc;
        }, []);
    }

    rentBook(book) {
        validateBook(book);
        const rent = new Booking();
        rent.setBook(book);
        this.bookList = rent.lendBook(book, this.bookList);
        this.lendList.push(rent);
        this.lendedBookList.push(book);
    }

    returnBook(book) {
        validateBook(book);
        const returned = new Booking();
        returned.giveBackBook(book, this.lendList);
        this.bookList.push(book);
        this.lendedBookList = this.lendedBookList.filter(item => item.id !== book.id);
    }
}