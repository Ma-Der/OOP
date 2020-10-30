function validateString(str) {
  if(!(typeof str === 'string')) throw new Error("Argument must be a string.");
  if(str.length === 0) throw new Error("Empty string.")
}

function validateEmail(email) {
  const reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return reg.test(email);
}

class Email {
    constructor(from, to, cc, bcc, title, html) {
      this.from = from
      this.to = to
      this.cc = cc
      this.bcc = bcc
      this.title = title
      this.html = html
    }
  }
  
  export class EmailBuilder {
    constructor(title) {
      this.cc = []
      this.bcc = []
      this.title = title
    }
    setFrom(mail) {
      if(!validateEmail(mail)) throw new Error('Invalid email address.');
      this.from = mail
      return this
    }
    setTo(mail) {
      if(!validateEmail(mail)) throw new Error('Invalid email address.');
      this.to = mail
      return this
    }
   
    setCc(...cc) {
      if(!Array.isArray(cc)) throw new Error("Argument should be an array of emails.");
      cc.forEach(item => {
        if(!validateEmail(item)) throw new Error('Invalid ' + item +' address.');
        this.cc.push(item)
      });
      return this
    }
    setBcc(...bcc) {
      if(!Array.isArray(bcc)) throw new Error("Argument should be an array of emails.");
      bcc.forEach(item => {
        if(!validateEmail(item)) throw new Error('Invalid ' + item +' address.');
        this.bcc.push(item)
      });
      return this
    }
    setMessage(msg) {
      validateString(msg);
      this.html = msg
      return this
    }
    build() {
      return JSON.stringify(new Email(this.from, this.to, this.cc, this.bcc, this.title, this.html));
    }
  }
  
