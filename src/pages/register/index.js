const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };

    const response = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();

    return user;
  } catch (error) {
    return { error };
  }
};

const onRegister = async () => {
  const email = document.getElementById("input-email").value;
  const nome = document.getElementById("input-name").value;

  if (nome.length < 3) {
    alert("O nome deve conter mais de 3 caracteres.");
  }

  if (email.length < 5 || !email.includes("@")) {
    alert("Email inválido!");
    return;
  }

  const result = await onCallRegister(email, nome);
  if (result.error) {
    alert("Falha ao validar e-mail!");
    return;
  }
  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("../home/index.html", "_self");
};

window.onload = () => {
  const form = document.getElementById("form-register");
  form.onsubmit = (event) => {
    event.preventDefault();
    onRegister();
  };
};
