class UI {

    // disaplay expenses
    displayExpenses(expense) {
        let html = `
        <li class="item">
            <p class="title"><span>-</span> ${expense.expenseTitle}</p>
            <p class="value"><span>$</span>${expense.expenseValue}</p>
            <p class="options">
                <i class="fa fa-pencil-square edit"></i>
                <i class="fa fa-trash delete"></i>
            </p>
            <p class="id-disp">${expense.id}</p>
        </li>
        `;
        document.querySelector('.items-container').innerHTML += html;
    }

    // update Expense
    updateExpensesDom(id) {
        const ul = document.querySelector('.items-container');
        const lis = ul.querySelectorAll('li.item');
        lis.forEach((li) => {
            if (li.lastElementChild.textContent === id) {
                li.firstElementChild.lastChild.textContent = expenseInput.value;
                li.firstElementChild.nextElementSibling.lastChild.textContent = expenseAmountInput.value;
           }
        });
    }

    // set alert
    setAlert(msg, className, position) {
        const p = document.createElement('p');
        p.className = className;
        p.appendChild(document.createTextNode(msg));
        position.insertBefore(p, position.firstElementChild);
    }

    // remove alert after 2s
    removeAlert(position) {
        if (position.firstElementChild.classList.contains('error')) {
           setTimeout(() => {
               position.firstElementChild.remove();
        }, 2000); 
        }
    }

    // clear fields
    clearFields() {
        document.querySelector('#expense-input').value = '';
        document.querySelector('#expense-amount-input').value = '';
        document.querySelector('#budget-input').value = '';
    }
}