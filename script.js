const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

class Item {
    text;
    amount;
    constructor(text, amount) {
        this.text = text;
        this.amount = amount;
    }
}

const setClickEventOnDeleteButton = (deleteButtons) => {
  deleteButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      console.log("clicked");
      let li = btn.parentElement;
      let ul = li.parentElement;
      ul.removeChild(li);
      historyList.splice(index, 1);
      localStorage.setItem("historyList", JSON.stringify(historyList));
      addToIncomeOrExpense();
    })
  })
}

let historyList = Boolean(localStorage.getItem("historyList")) ? JSON.parse(localStorage.getItem("historyList")) : [];

const convertDecimalStringToDecimalNumber = (decimalString) => {
    return Number(new Number(parseFloat(decimalString)).toFixed(2));
};

const measureBalance = (income, expense) => {
  balance.childNodes[1].textContent = income + expense;
}

const addToIncomeOrExpense = () => {
  let income = historyList.filter(item => item.amount >= 0).reduce(((accumulator, item) => accumulator + item.amount), 0.00);
  let expense = historyList.filter(item => item.amount < 0).reduce(((accumulator, item) => accumulator + item.amount), 0.00)
  money_plus.childNodes[1].textContent = income;
  money_minus.childNodes[1].textContent = expense;
  measureBalance(income, expense);
};

const showItemsInHistoryList = () => {
  list.innerHTML = historyList.map(item => 
      `
      <li class=${item.amount >=0 ? "plus" : "minus"}>
        ${item.text}  <span>${item.amount}$</span><button class="delete-btn">x</button>
      </li>
    `
    ).join();

    const deleteButtons =  document.querySelectorAll(".delete-btn");
    setClickEventOnDeleteButton(deleteButtons);
};

const addToHistoryList = (item) => {
    historyList.push(item);
    localStorage.setItem("historyList", JSON.stringify(historyList));
    showItemsInHistoryList();
    addToIncomeOrExpense();
};

const addTransaction = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const item = new Item(text.value, parseFloat(amount.value));
        addToHistoryList(item);
        text.value = "";
        amount.value = "";
    });
};

addTransaction();
showItemsInHistoryList();
addToIncomeOrExpense();


// const balance = document.getElementById('balance');
// const money_plus = document.getElementById('money-plus');
// const money_minus = document.getElementById('money-minus');
// const list = document.getElementById('list');
// const form = document.getElementById('form');
// const text = document.getElementById('text');
// const amount = document.getElementById('amount');

// // const dummyTransactions = [
// //   { id: 1, text: 'Flower', amount: -20 },
// //   { id: 2, text: 'Salary', amount: 300 },
// //   { id: 3, text: 'Book', amount: -10 },
// //   { id: 4, text: 'Camera', amount: 150 }
// // ];

// const localStorageTransactions = JSON.parse(
//   localStorage.getItem('transactions')
// );

// let transactions =
//   localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// // Add transaction
// function addTransaction(e) {
//   e.preventDefault();

//   if (text.value.trim() === '' || amount.value.trim() === '') {
//     alert('Please add a text and amount');
//   } else {
//     const transaction = {
//       id: generateID(),
//       text: text.value,
//       amount: +amount.value
//     };

//     transactions.push(transaction);

//     addTransactionDOM(transaction);

//     updateValues();

//     updateLocalStorage();

//     text.value = '';
//     amount.value = '';
//   }
// }

// // Generate random ID
// function generateID() {
//   return Math.floor(Math.random() * 100000000);
// }

// // Add transactions to DOM list
// function addTransactionDOM(transaction) {
//   // Get sign
//   const sign = transaction.amount < 0 ? '-' : '+';

//   const item = document.createElement('li');

//   // Add class based on value
//   item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

//   item.innerHTML = `
//     ${transaction.text} <span>${sign}${Math.abs(
//     transaction.amount
//   )}</span> <button class="delete-btn" onclick="removeTransaction(${
//     transaction.id
//   })">x</button>
//   `;

//   list.appendChild(item);
// }

// // Update the balance, income and expense
// function updateValues() {
//   const amounts = transactions.map(transaction => transaction.amount);

//   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

//   const income = amounts
//     .filter(item => item > 0)
//     .reduce((acc, item) => (acc += item), 0)
//     .toFixed(2);

//   const expense = (
//     amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
//     -1
//   ).toFixed(2);

//   balance.innerText = `$${total}`;
//   money_plus.innerText = `$${income}`;
//   money_minus.innerText = `$${expense}`;
// }

// // Remove transaction by ID
// function removeTransaction(id) {
//   transactions = transactions.filter(transaction => transaction.id !== id);

//   updateLocalStorage();

//   init();
// }

// // Update local storage transactions
// function updateLocalStorage() {
//   localStorage.setItem('transactions', JSON.stringify(transactions));
// }

// // Init app
// function init() {
//   list.innerHTML = '';

//   transactions.forEach(addTransactionDOM);
//   updateValues();
// }

// init();

// form.addEventListener('submit', addTransaction);
