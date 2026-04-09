"use strict";

// ─── Mostrar error ───
function mostrarError(campoId, mensaje) {
  const campo = document.querySelector(`#${campoId}`);
  const span = document.querySelector(`#error-${campoId}`);

  campo.classList.add("invalido");
  campo.classList.remove("valido");

  span.textContent = mensaje;
  span.classList.add("visible");
}

// ─── Limpiar error ───
function limpiarError(campoId) {
  const campo = document.querySelector(`#${campoId}`);
  const span = document.querySelector(`#error-${campoId}`);

  campo.classList.remove("invalido");
  campo.classList.add("valido");

  span.textContent = "";
  span.classList.remove("visible");
}

// ─── Limpiar todo ───
function limpiarTodo() {
  ["nombre", "email", "password", "confirmar", "telefono"].forEach((id) =>
    limpiarError(id),
  );
}

// ─── VALIDACIONES ───

// Nombre
function validarNombre() {
  const campo = document.querySelector("#nombre");

  if (campo.validity.valueMissing) {
    mostrarError("nombre", "El nombre es obligatorio.");
    return false;
  }

  if (campo.validity.tooShort) {
    mostrarError(
      "nombre",
      `Debe tener al menos ${campo.minLength} caracteres.`,
    );
    return false;
  }

  limpiarError("nombre");
  return true;
}

// Email
function validarEmail() {
  const campo = document.querySelector("#email");

  if (campo.validity.valueMissing) {
    mostrarError("email", "El correo es obligatorio.");
    return false;
  }

  if (campo.validity.typeMismatch) {
    mostrarError("email", "El formato del correo no es válido.");
    return false;
  }

  limpiarError("email");
  return true;
}

// Password
function validarPassword() {
  const campo = document.querySelector("#password");

  if (campo.validity.valueMissing) {
    mostrarError("password", "La contraseña es obligatoria.");
    return false;
  }

  if (campo.validity.tooShort) {
    mostrarError("password", "Debe tener mínimo 8 caracteres.");
    return false;
  }

  const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
  if (!regex.test(campo.value)) {
    mostrarError("password", "Debe incluir una mayúscula y un número.");
    return false;
  }

  limpiarError("password");
  return true;
}

// Confirmar contraseña
function validarConfirmar() {
  const password = document.querySelector("#password").value;
  const confirmar = document.querySelector("#confirmar").value;

  if (!confirmar) {
    mostrarError("confirmar", "Debe confirmar la contraseña.");
    return false;
  }

  if (password !== confirmar) {
    mostrarError("confirmar", "Las contraseñas no coinciden.");
    return false;
  }

  limpiarError("confirmar");
  return true;
}

// Teléfono
function validarTelefono() {
  const campo = document.querySelector("#telefono");

  if (!campo.value.trim()) {
    limpiarError("telefono");
    return true;
  }

  if (campo.validity.patternMismatch) {
    mostrarError("telefono", "Solo números entre 7 y 15 dígitos.");
    return false;
  }

  limpiarError("telefono");
  return true;
}
// ─── Validación en tiempo real ───

// Evento blur (cuando sales del campo)
document.querySelector("#nombre").addEventListener("blur", validarNombre);

document.querySelector("#email").addEventListener("blur", validarEmail);

document.querySelector("#password").addEventListener("blur", validarPassword);

document.querySelector("#confirmar").addEventListener("blur", validarConfirmar);

document.querySelector("#telefono").addEventListener("blur", validarTelefono);

// Limpiar error al escribir en confirmar
document.querySelector("#confirmar").addEventListener("input", () => {
  if (document.querySelector("#confirmar").value) {
    limpiarError("confirmar");
  }
});
// ─── Manejo del submit ───

const form = document.querySelector("#form-registro");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita envío real

  // Ejecutar todas las validaciones
  const resultados = [
    validarNombre(),
    validarEmail(),
    validarPassword(),
    validarConfirmar(),
    validarTelefono(),
  ];

  const todoValido = resultados.every((r) => r === true);

  if (todoValido) {
    const mensajeExito = document.querySelector("#mensaje-exito");

    mensajeExito.classList.remove("oculto");
    mensajeExito.classList.add("visible");

    // Limpiar después de 2 segundos
    setTimeout(() => {
      form.reset();
      limpiarTodo();

      mensajeExito.classList.remove("visible");
      mensajeExito.classList.add("oculto");
    }, 2000);
  } else {
    // Ir al primer error
    const primerError = form.querySelector(".invalido");
    if (primerError) primerError.focus();
  }
});
// ─── Fortaleza de contraseña ───

function evaluarFortaleza(valor) {
  let puntos = 0;

  if (valor.length >= 8) puntos++;
  if (/[A-Z]/.test(valor)) puntos++;
  if (/[0-9]/.test(valor)) puntos++;
  if (/[^A-Za-z0-9]/.test(valor)) puntos++;

  const niveles = ["", "Débil", "Regular", "Buena", "Fuerte"];
  const colores = ["", "#C62828", "#F57F17", "#1565C0", "#2E7D32"];

  return {
    nivel: niveles[puntos],
    color: colores[puntos],
    puntos,
  };
}

const campoPassword = document.querySelector("#password");

campoPassword.addEventListener("input", () => {
  const { nivel, color, puntos } = evaluarFortaleza(campoPassword.value);

  let indicador = document.querySelector("#fortaleza");

  if (!indicador) {
    indicador = document.createElement("span");
    indicador.id = "fortaleza";
    campoPassword.insertAdjacentElement("afterend", indicador);
  }

  indicador.textContent = puntos > 0 ? `Contraseña: ${nivel}` : "";
  indicador.style.color = color;
});
