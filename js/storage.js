class Store{
    // get expenses from storage
    getExpenses() {
        let expenses;
        if (localStorage.getItem('expenses') === null) {
            expenses = [];
        } else {
            expenses = JSON.parse(localStorage.getItem('expenses'));
        }
        return expenses;
    }

    // save expense
    saveExpense(expense) {
        const expenses = this.getExpenses();
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // update expenses
    updateExpenseStorage(id) {
        const expenses = this.getExpenses();
        expenses.forEach((expense) => {
            if (id === expense.id) {
                expense.expenseTitle = expenseInput.value;
                expense.expenseValue = expenseAmountInput.value;
            }
        });
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // delete expense
    deleteExpense(id) {
        const expenses = this.getExpenses();
        expenses.forEach((expense, i) => {
            if (id === expense.id) {
               expenses.splice(i, 1)
           }
        });
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
}