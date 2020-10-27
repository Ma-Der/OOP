/*
1. Single Responsibility Principle
Zasada mówi o tym, iż każda klasa powinna mieć swój jeden główny cel, czyli powinna zajmować się tylko jedną rzeczą. W poniższym przykładzie widać (przykład 1), iż klasa dodaje ucznia oraz może wyświetlić nam listę uczniów. Według zasady SRP powinniśmy rozdzielić to na 2 klasy, jedna klasa powinna zajmować się wyłącznie dodawaniem ucznia, druga zaś wydrukowaniem listy studentów (przykład 2)
*/
//Przykład 1
class ClassRegister {
    constructor(){
        this.studentList = [];
    }

    addStudent(student) {
        this.studentList.push(student);
    }
  
    printStudentsList(...students) {
      students.forEach(student => {
        console.log(student);
      })
    }
}

//Przykład 2

class ClasssRegister {
    constructor(){
        this.studentList = [];
    }

    addStudent(student) {
        this.studentList.push(student);
    }
}

class PrintStudentsList {
  constructor(...students) {
    this.students = students;
  }
  
      printStudentsList(...students) {
      students.forEach(student => {
        console.log(student);
      })
    }
}


/*
2. Open/Closed Principle
Zasada mówi o tym, aby kod można było rozszerzać, ale bez ingerencji w modyfikacje samego kodu. Jeśli będę chciał dodać kolejną kategorie w listOfClasses i wyświetlić za pomocą showClasses, będę musiał zmodyfikować funkcje showClasses poprzez dodanie kolejnego case'a co już narusza zasade OCP (przykład 1). Rozwiązaniem będzie wydzielenie każdej kategorii do oddzielnej klasy, a funkcja showClasses będzie tylko i wyłącznie wyświetlała przedmioty bez konieczności jej modyfikowania(przykład 2).
*/
//Przykład 1
 
  function showClasses(classes) {
    console.log("List of classes: ");
    classes.forEach(singleClass => {
      switch(singleClass.type) {
        case 'humanities': 
          console.log(singleClass.name);
          break;
        case 'science':
          console.log(singleClass.name);
          break;
          
      }
    })
  }
    const listOfClasses = [
                    {
                      type: 'humanities',
                      name: 'polish'
                    },
                    {
                      type: 'science',
                        name: 'math'
                    },
                    ]
                    

showClasses(listOfClasses);

//Przykład 2
class Humanities {
  constructor(name) {
    this.name = name;
  }
  
  printSubjectName() {
    console.log("Humanities: " + this.name);
  }
}

class Science {
  constructor(name) {
    this.name = name;
  }
  
  printSubjectName() {
    console.log("Science: " + this.name);
  }
}

class Sport {
  constructor(name) {
    this.name = name;
  }
  
  printSubjectName() {
    console.log("Sport: " + this.name);
  }
}

function showClassess(classes) {
    console.log("List of classes: ");
    classes.forEach(singleClass => {
      singleClass.printSubjectName();
    });
  }
    const listOfClassess = [
      new Humanities('English'),
      new Science('Chemistry'),
      new Sport('Basketball')
    ]
                    

showClassess(listOfClassess);


/*
3. Liskov Substitude Principle
  Według tej zasady cały kod powinien poprawnie działać z klasą Exams, jak i jej podklasami (Polish, Chemistry, Sports), w tym wypadku metoda writeTest() powinna działać w poszczególnych podklasach (Polish, Chemistry, Sports), jednak tak nie jest co widoczne jest przy klasie Sports (przykład 1). Aby ta zasada była spełniona można stworzyć 2 klasy Exams - TestExams oraz PhysicalExams oraz 2 funkcje wywołujące metody w podklasach (Polish, Chemistry, Sports) (przykład 2).
*/
//Przykład 1
 /*
class Exams {
  constructor(){
    
  }
  writeTest() {
    console.log("You passed.")
  }
  
  
}

class Polish extends Exams {
  constructor(){
    super();
  }
  
}

class Chemistry extends Exams {
  constructor(){
    super();
  }
}
class Sports extends Exams {
  constructo() {
 }
  writeTest() {
    console.log("You can't write test from Sports.");
  }
}

function executeWriteExams(subject) {
  subject.writeTest();
}

const polishClass = new Polish();
const chemistryClass = new Chemistry();
const sports = new Sports();

executeWriteExams(polishClass);
executeWriteExams(chemistryClass);
executeWriteExams(sports);

*/

//Przykład 2
 
class TestExams {
  constructor(){
    
  }
  writeTest() {
    console.log("You passed.")
  }
  
}

class PhysicalExams {
  constructor(){
    
  }
  physicalTest() {
    console.log("You passed.")
  }
  
}

class Polish extends TestExams {
  constructor(){
    super();
  }
  
}

class Chemistry extends TestExams {
  constructor(){
    super();
  }
}
class Sports extends PhysicalExams {
  constructo() {
 }

}

function executeTestExams(subject) {
  subject.writeTest();
}

function executePhysicalExams(sports) {
  sports.physicalTest();
}

const polishClass = new Polish();
const chemistryClass = new Chemistry();
const sports = new Sports();

executeTestExams(polishClass);
executeTestExams(chemistryClass);
executePhysicalExams(sports);


/*
4. Interface Segregation Principle
Zasada mówi o tym, iż klasy korzystające z interfejsów, muszą wykorzystywać wszystkie metody, które są w danym interfejsie, tak aby nie pomijać żadnej metody, aby nie pozostawała nieużywana w danej klasie. W klasie Wieżyczka są nieużywane metody oraz zmienna, co łamie tą zasadę(przykład 1). W celu naprawienia tego należy rozbić interfejs(w naszym wypadku klase zastępującą interfejs) na mniejsze komponenty, które dodamy jako metody dla poszczególnych podklas Jednostki (przykład 2).
*/
//Przykład 1

//interfejs Jednostka
/*
class Jednostka {
  constructor(nazwa, atak, obrona, zdrowie) {
    this.nazwa = nazwa;
    this.atak = atak;
    this.obrona = obrona;
    this.zdrowie = zdrowie;
  }
  
  ruch() {
    console.log(`${this.nazwa} się ruszyła.`);
  }

  attak() {
    console.log(`Siła ${this.atak}`);
  }
  
  obronna() {
    console.log(`Wytrzymałość ${this.obrona}`);
  }
  
  obrażenia() {
    console.log(`Obrażenia: ${(this.zdrowie)-20}`);
  }
}

class Żołnierz extends Jednostka {
  constructor(nazwa, atak, obrona, zdrowie){
    super(nazwa, atak, obrona, zdrowie);
  }
  ruch(){
    console.log(`${this.nazwa} się ruszył.`);
  }
  
  attak(){
    console.log(`Siła ${this.atak}`);
  }
  
  obronna(){
    console.log(`Wytrzymałość ${this.obrona}`);
  }
  
  obrażenia() {
    console.log(`Obrażenia: ${(this.zdrowie)-10}`);
  }
  
}

class Wieżyczka extends Jednostka {
  constructor(nazwa, atak, obrona, zdrowie){
    super(nazwa, atak, obrona, zdrowie);
  }
  
  ruch() {
    return null;
  }
  
  attak() {
    console.log(`Siła ${this.atak}`);
  }
  
  obronna() {
  return null;
  }
  
  obrażenia() {
    console.log(`Obrażenia: ${(this.zdrowie)-10}`);
  }
}

const zolnierz = new Żołnierz('Marine', 100, 200, 100);
const wieza = new Wieżyczka('Armatka', 100, 100, 200);

zolnierz.ruch();
zolnierz.attak();
zolnierz.obronna();
zolnierz.obrażenia();

wieza.attak();
wieza.obrażenia();
*/
//Przykład 2
class Jednostka {
  constructor(nazwa, atak, obrona, zdrowie) {
    this.nazwa = nazwa;
    this.atak = atak;
    this.obrona = obrona;
    this.zdrowie = zdrowie;
  }
}
  
  const poruszaćSię = {
    ruch() {
    console.log(`${this.nazwa} się ruszyła.`);
    }
  }
  
  const atakowac = {
     attak() {
      console.log(`Siła ${this.atak}`);
     }
  }
  
const obronic = {  
  obronna() {
    console.log(`Wytrzymałość ${this.obrona}`);
  }
}
 
const krwawic = {
    obrażenia() {
      console.log(`Obrażenia: ${(this.zdrowie)-20}`);
    }
}

class Żołnierz extends Jednostka {
  constructor(nazwa, atak, obrona, zdrowie){
    super(nazwa, atak, obrona, zdrowie);
  }
}
Object.assign(Żołnierz.prototype, poruszaćSię);
Object.assign(Żołnierz.prototype, atakowac);
Object.assign(Żołnierz.prototype, obronic);
Object.assign(Żołnierz.prototype, krwawic);

class Wieżyczka extends Jednostka {
  constructor(nazwa, atak, obrona, zdrowie){
    super(nazwa, atak, obrona, zdrowie);
  } 
}

Object.assign(Wieżyczka.prototype, atakowac);
Object.assign(Wieżyczka.prototype, krwawic);

const zolnierz = new Żołnierz('Marine', 100, 200, 100);
const wieza = new Wieżyczka('Armatka', 100, 100, 200);

zolnierz.ruch();
zolnierz.attak();
zolnierz.obronna();
zolnierz.obrażenia();

wieza.attak();
wieza.obrażenia();


/*
5. Dependency Inversion Principle

Wysokopoziomowe klasy nie powinny zależeć od niskopoziomowych klas poprzez stworzenie dodatkowego elementu, z którego będą korzystały jedne i drugie klasy.
Zamiast dodawać za każdym razem w klasie Store (przykład 1) metodę nowej płatności, tworzymy klasę PaymentProcessor, która będzie się zajmowała właśnie metodami płatności. Wszystko po to aby nie zmieniać i nie dodawać za każdym razem klasy Store. Dla metod płatności payU i paypal stworzone zostały klasy, które zajmują się przetwarzaniem metod płatności, przez co kod klasy Store nie będzie już zmieniany.
*/

//Przykład 1
/*
class Store {
  constructor(user) {
    // element dodany 
    this.paypal = new Paypal();
    //
    this.user = user;
    this.payU = new PayU(user);
  }
  
  buyCable(quant) {
    this.payU.makePayment(5);
    this.paypal.makePayment(this.user, 5);
   
  }
  
}

class PayU {
  constructor(user) {
    this.user = user;
  }
  makePayment(amount) {
     console.log(`${this.user} paid ${amount + 10} bucks using PayU.`);
  }
}

class Paypal {
  makePayment(user, amount) {
     console.log(`${user} paid ${amount} bucks using PayPal.`);
  }
}

const store = new Store('John');
store.buyCable();

*/

// Przykład 2

class Store {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }
  
  buyCable(quant) {
    this.paymentProcessor.pay(quant);
  }
}

class PayUPaymentProcessor {
  constructor(user) {
    this.payU = new PayU(user); //
  }
  
  pay(amount) {
    this.payU.makePayment(amount);
  }
}
class PayPalPaymentProcessor {
  constructor(user) {
    this.user = user;
    this.paypal = new Paypal(); 
  }
  
  pay(amount) {
    this.paypal.makePayment(this.user, amount);
  }
}

class PayU {
  constructor(user) {
    this.user = user;
  }
  makePayment(amount) {
     console.log(`${this.user} paid ${amount + 10} bucks using PayU.`);
  }
}

class Paypal {
  makePayment(user, amount) {
     console.log(`${user} paid ${amount} bucks using PayPal.`);
  }
}

const store = new Store(new PayUPaymentProcessor('John'));
store.buyCable(5);
const store2 = new Store(new PayPalPaymentProcessor('Tom'));
store2.buyCable(5);
