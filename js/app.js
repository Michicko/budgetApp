class Expense {
    constructor(id, expenseTitle, expenseValue) {
        this.id = id;
        this.expenseTitle = expenseTitle;
        this.expenseValue = expenseValue;
    }
}

// variables
const budgetInput = document.querySelector('#budget-input');
const addBtn = document.querySelector('#add-expense');
const updateBtn = document.querySelector('#update-expense');
const budgetOutput = document.querySelector('.budget');
const expenseInput = document.querySelector('#expense-input');
const expenseOutput = document.querySelector('.expenses');
const balanceOutput = document.querySelector('.balance');
const expenseAmountInput = document.querySelector('#expense-amount-input');
const budgetForm = document.querySelector('#budget-form');
const expenseForm = document.querySelector('#expense-form');
const itemsContainer = document.querySelector('.items-container');

// ======================
// Event Listeners
// ====================
// DOMCONTENT 
document.addEventListener('DOMContentLoaded', () => {
    const store = new Store();
    const ui = new UI();
    const expenses = store.getExpenses();
    expenses.forEach((expense) => {
        ui.displayExpenses(expense);
    });
    // calculate all expenses
    addAllExpenses();
    // calculate budget and show balance
    balanceOutput.innerHTML = calcualteBudget();
});

// add budget
budgetForm.addEventListener('submit', addBudget);
// create expense
addBtn.addEventListener('click', addExpense);
// edit expense
itemsContainer.addEventListener('click', editExpenses);
// update expense
updateBtn.addEventListener('click', updateExpenses);
// delete expense
itemsContainer.addEventListener('click', deleteExpenses);



// add budget
function addBudget(e) {
    const budget = parseInt(budgetInput.value);
    const position = document.querySelector('#budget-input-section');
    const ui = new UI();
    // validate 
    if (isNaN(budget)) {
        ui.setAlert('Please enter a budget', 'error', position);
        ui.removeAlert(position);
    } else {
        budgetOutput.lastChild.textContent = budget;
        // clear fields
        ui.clearFields();
        // calculate all expenses
        addAllExpenses();
        // calculate budget and show balance
        balanceOutput.innerHTML = calcualteBudget();
    }
    e.preventDefault();
}

// create expense
function addExpense() {
    const id = getId();
    const expenseTitle = expenseInput.value;
    const expenseValue = parseInt(expenseAmountInput.value)
    const expense = new Expense(id, expenseTitle, expenseValue);
    const position = document.querySelector('#expenses-input-section');
    const ui = new UI();
    const store = new Store();

    // validate
    if (expenseTitle === '' || isNaN(expenseValue)) {
        ui.setAlert('Please fill all fields', 'error', position);
        ui.removeAlert(position);
    } else {
        // display expense
        ui.displayExpenses(expense);
        // add expense to storage
        store.saveExpense(expense);
        ui.clearFields();
        // add all expenses and display
        addAllExpenses();
        // calculate budget
        balanceOutput.innerHTML = calcualteBudget();
    }
}


// Edit expenses
function editExpenses(e) {
    if (e.target.classList.contains('edit')) {
        const id = e.target.parentElement.parentElement.lastElementChild.textContent;
        const title = e.target.parentElement.parentElement.firstElementChild.lastChild.textContent;
        const amount = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.lastChild.textContent;
        expenseInput.value = title;
        expenseAmountInput.value = amount;
        expenseForm.lastElementChild.textContent = id;
        addBtn.style.display = 'none';
        updateBtn.style.display = 'block';
    }
}

// Update Expenses
function updateExpenses(e) {
    const ui = new UI();
    const store = new Store();
    const id = expenseForm.lastElementChild.textContent;
    ui.updateExpensesDom(id);
    store.updateExpenseStorage(id);
    // calculate all expenses
    addAllExpenses();
    // calculate budget and show balance
    balanceOutput.innerHTML = calcualteBudget();
    updateBtn.style.display = 'none';
    addBtn.style.display = 'block';
    ui.clearFields();
}

// delete expense
function deleteExpenses(e) {
    const store = new Store();
    if (e.target.classList.contains('delete')) {
        const id = e.target.parentElement.parentElement.lastElementChild.textContent;
        e.target.parentElement.parentElement.remove();
        // delete from Localstorage
        store.deleteExpense(id);
        // calculate all expenses
        addAllExpenses();
        // calculate budget and show balance
        balanceOutput.innerHTML = calcualteBudget();
    }
}

// calculate Budget
function calcualteBudget() {
    const ul = document.querySelector('.items-container');
    const lis = ul.querySelectorAll('li.item');
    const budgetAllocation = parseInt(budgetOutput.lastChild.textContent);
    const totalExpenses = parseInt(expenseOutput.lastChild.textContent);
    const totalBalance = budgetAllocation - totalExpenses;
    if (totalBalance < 0) {
        let bal = totalBalance.toString();
        let sign = bal.slice(0, 1);
        let rem = bal.slice(1, bal.length);
        let html = `
        ${sign}<span>$</span>${rem}
        `;
        balanceOutput.style.color = '#d9534f';
        return html;
    } else {
        let html = `
        <span>$</span>${totalBalance}
        `;
        balanceOutput.style.color = '#333';
        return html;
    }
}


// calculate all expenses
function addAllExpenses() {
    const ul = document.querySelector('.items-container');
    const lis = ul.querySelectorAll('li.item');
    let values = [];
    const expenseArrays = Array.from(lis);
    expenseArrays.forEach((arr) => {
        values.push(parseInt(arr.firstElementChild.nextElementSibling.lastChild.textContent));
    })
    const totalExpenses = values.reduce((a, b) => a + b, 0);
    expenseOutput.lastChild.textContent = totalExpenses;
}

// get random Ids
function getId() {
    return this.hex(Date.now() / 1000) +
        ' '.repeat(16).replace(/./g, () => this.hex(Math.random() * 16))
}
// round up
function hex(value) {
    return Math.floor(value).toString(16)
}