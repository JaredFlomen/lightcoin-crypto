class Account {
  constructor(username) {
    this.username = username;
    // this.balance = 0;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

console.log("Withdraw 120")
const t1 = new Withdrawal(120.00, myAccount);
console.log("Commit result", t1.commit());
console.log('Account Balance:', myAccount.balance)

console.log("Deposit 50");
const t2 = new Deposit(50.00, myAccount);
console.log("Commit Result", t2.commit());
console.log('Account Balance:', myAccount.balance)

// t1 = new Withdrawal(50.25, myAccount);
// t1.value();
// console.log('Transaction 1:', t1);

// t2 = new Withdrawal(9.99, myAccount);
// t2.value();
// console.log('Transaction 2:', t2);

// t3 = new Deposit(120.00, myAccount);
// t3.value();
// console.log('Transaction 3:', t3)


