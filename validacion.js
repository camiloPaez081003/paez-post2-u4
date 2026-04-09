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
