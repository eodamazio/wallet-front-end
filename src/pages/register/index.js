const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };

    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/users",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};
const onClickRegister = async () => {
  const nome = document.getElementById("input-nome").value;
  const sobrenome = document.getElementById("input-sobrenome").value;
  const email = document.getElementById("input-email").value;
  const nascimento = document.getElementById("input-nascimento").value;
  const sexo = document.getElementById("input-sexo").value;
  const senha = document.getElementById("input-senha").value;

  // Validação básica dos campos
  if (!nome || !sobrenome || !email || !nascimento || !sexo || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Restante do código para enviar dados ao servidor ou processar conforme necessário
  // ...

  // Exemplo de alerta para teste
  alert("Registro bem-sucedido!");
};

const onRegister = async () => {
  const email = document.getElementById("input-email").value;
  const name = document.getElementById("input-name").value;

  if (name.length < 3) {
    alert("Nome deve conter mais de 3 caracters.");
    return;
  }

  if (email.length < 5 || !email.includes("@")) {
    alert("Email inválido!");
    return;
  }

  const result = await onCallRegister(email, name);

  if (result.error) {
    alert("Falha ao validar e-mail.");
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
