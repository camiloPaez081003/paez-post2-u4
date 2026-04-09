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
