function signup() {

    alert("Signup function is working!");

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all the fields.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("smartvestUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    alert("Account created successfully!");

    window.location.href = "home.html";
}

function login() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedUser =
        JSON.parse(localStorage.getItem("smartvestUser"));

    if (!savedUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "dashboard.html";

    } else {

        alert("Incorrect email or password.");

    }
}

function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";
}

function checkLogin() {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        window.location.href = "login.html";

    }
}

function showUserName() {

    const savedUser =
        JSON.parse(localStorage.getItem("smartvestUser"));

    const nameElement =
        document.getElementById("userName");

    if (savedUser && nameElement) {

        nameElement.textContent =
            savedUser.name;

    }
}
let expenses =
    JSON.parse(
        localStorage.getItem("smartvestExpenses")
    ) || [];

function addExpense() {

    const amount =
        Number(
            document.getElementById("expenseAmount").value
        );

    const category =
        document.getElementById("expenseCategory").value;

    const description =
        document.getElementById("expenseDescription").value;


    if (amount <= 0 || category === "") {

        alert("Please enter a valid expense.");

        return;

    }
    const expense = {

        amount: amount,
        category: category,
        description: description

    };

    expenses.push(expense);

    localStorage.setItem(
        "smartvestExpenses",
        JSON.stringify(expenses)
    );


    displayExpenses();


    document.getElementById("expenseAmount").value = "";

    document.getElementById("expenseDescription").value = "";
}

function displayExpenses() {

    const expenseList =
        document.getElementById("expenseList");

    if (!expenseList) return;


    expenseList.innerHTML = "";

    let total = 0;


    expenses.forEach(function(expense) {

        total += expense.amount;


        const item =
            document.createElement("div");

        item.className = "expense-item";


        item.innerHTML = `
            <span>
                <strong>${expense.category}</strong>
                ${expense.description}
            </span>

            <span>
                ₹${expense.amount}
            </span>
        `;


        expenseList.appendChild(item);

    });


    const totalElement =
        document.getElementById("totalExpenses");


    if (totalElement) {

        totalElement.textContent =
            "₹" + total;

    }


    calculateSavings();
}
function calculateSavings() {

    const income =
        Number(
            document.getElementById("income")?.value
        ) || 25000;


    let totalExpenses = 0;


    expenses.forEach(function(expense) {

        totalExpenses += expense.amount;

    });


    const savings =
        income - totalExpenses;


    const savingsElement =
        document.getElementById("savings");


    if (savingsElement) {

        savingsElement.textContent =
            "₹" + savings;

    }


    calculateFinancialHealth(
        income,
        totalExpenses,
        savings
    );
}

function calculateGoal() {

    const target =
        Number(
            document.getElementById("goalTarget").value
        );


    const current =
        Number(
            document.getElementById("currentSavings").value
        );


    const months =
        Number(
            document.getElementById("goalMonths").value
        );


    if (
        target <= 0 ||
        months <= 0
    ) {

        alert("Please enter valid goal details.");

        return;

    }


    const remaining =
        target - current;


    const monthlySaving =
        remaining > 0
            ? Math.ceil(remaining / months)
            : 0;


    document.getElementById(
        "monthlySaving"
    ).textContent =
        "₹" + monthlySaving + " / month";


    const progress =
        Math.min(
            Math.round(
                (current / target) * 100
            ),
            100
        );


    document.getElementById(
        "goalProgress"
    ).textContent =
        progress + "%";
}

function calculateRisk() {

    const duration =
        document.querySelector(
            'input[name="investmentDuration"]:checked'
        );


    const lossComfort =
        document.querySelector(
            'input[name="lossComfort"]:checked'
        );


    if (!duration || !lossComfort) {

        alert(
            "Please answer both questions."
        );

        return;

    }


    const score =
        Number(duration.value) +
        Number(lossComfort.value);


    let profile;


    if (score <= 3) {

        profile = "Conservative";

    }
    else if (score <= 6) {

        profile = "Moderate";

    }
    else {

        profile = "Aggressive";

    }


    const result =
        document.getElementById("riskResult");


    if (result) {

        result.textContent =
            "Your Risk Profile: " + profile;

    }


    localStorage.setItem(
        "riskProfile",
        profile
    );
}

function calculateFinancialHealth(
    income = 25000,
    expensesAmount = 0,
    savings = income
) {

    let score = 50;


    const savingsRate =
        income > 0
            ? (savings / income) * 100
            : 0;

    if (savingsRate >= 40) {

        score += 30;

    }
    else if (savingsRate >= 20) {

        score += 20;

    }
    else if (savingsRate >= 10) {

        score += 10;

    }

    const expenseRate =
        income > 0
            ? (expensesAmount / income) * 100
            : 100;


    if (expenseRate < 50) {

        score += 20;

    }
    else if (expenseRate < 70) {

        score += 10;

    }


    score =
        Math.min(score, 100);


    const healthElement =
        document.getElementById("healthScore");


    if (healthElement) {

        healthElement.textContent =
            score + "/100";

    }


    generateInsights(
        income,
        expensesAmount,
        savings,
        savingsRate
    );
}

function generateInsights(
    income,
    expensesAmount,
    savings,
    savingsRate
) {

    const insightBox =
        document.getElementById("insights");


    if (!insightBox) return;


    let message = "";


    if (savingsRate >= 30) {

        message +=
            "💚 You're maintaining a healthy savings rate.<br><br>";

    }
    else {

        message +=
            "⚠️ Consider increasing your monthly savings.<br><br>";

    }


    if (expensesAmount > income * 0.7) {

        message +=
            "⚠️ Your expenses are taking up a large portion of your income.<br><br>";

    }
    else {

        message +=
            "✅ Your expenses are currently within a reasonable range.<br><br>";

    }


    if (savings > 0) {

        message +=
            "🎯 You have positive monthly savings. Keep working toward your goals.";

    }


    insightBox.innerHTML =
        message;
}

document.addEventListener(
    "DOMContentLoaded",
    function() {


        if (
            document.body.classList.contains(
                "dashboard-page"
            )
        ) {

            checkLogin();

            showUserName();

            displayExpenses();

            calculateSavings();

        }

    }
); 

function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}
