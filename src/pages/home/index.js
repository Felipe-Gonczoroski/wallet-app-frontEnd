const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");

  data.map((item) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "mt smaller";

    //title  |  título
    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);

    //category  |  categoria
    const categoryTd = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd);

    //date  |  data
    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    //value  |  valor
    const valueTd = document.createElement("td");
    valueTd.className = "center";
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.value)
    );
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

    //delete  |  deletar
    const deleteTd = document.createElement("td");
    deleteTd.className = "right";
    const deleteText = document.createTextNode("Deletar");
    deleteTd.appendChild(deleteText);
    tableRow.appendChild(deleteTd);

    //table add tableRow  |  tabela adiciona linhas nela
    table.appendChild(tableRow);
  });
};

const renderFinanceElement = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;

  //render total items

  const financeCard1 = document.getElementById("finance-card-1");
  const totalText = document.createTextNode(totalItems);
  const totalTextElement = document.createElement("h1");
  totalTextElement.className = "mt smaller";
  totalTextElement.appendChild(totalText);
  financeCard1.appendChild(totalTextElement);

  //render revenue

  const financeCard2 = document.getElementById("finance-card-2");
  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  revenueText.className = "mt smaller";
  const revenueTextElement = document.createElement("h1");
  revenueTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTextElement);

  //render expenses

  const financeCard3 = document.getElementById("finance-card-3");
  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  expensesText.className = "mt smaller";
  const expensesTextElement = document.createElement("h1");
  expensesTextElement.appendChild(expensesText);
  financeCard3.appendChild(expensesTextElement);

  //render balance

  const financeCard4 = document.getElementById("finance-card-4");
  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalValue)
  );
  const balanceTextElement = document.createElement("h1");
  balanceTextElement.className = "mt smaller";
  balanceTextElement.style.color = "#5936CD";
  balanceTextElement.appendChild(balanceText);
  financeCard4.appendChild(balanceTextElement);
};

const onLoadFinancesData = async () => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");
    const date = "2022-12-15";
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElement(data);
    renderFinancesList(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  //add user email  |  adicionar email do usuário
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  // add logout link  |  adicionar link de sair da conta
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("Sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  // add user first letter inside avatar  |  adicionar letra inicial do usuário dentro do avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
};
