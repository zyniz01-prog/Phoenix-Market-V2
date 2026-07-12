const sessionKey = "phoenix-session";
function openLoginChoice() {
  document.getElementById("loginChoiceModal").hidden = false;
}
function closeLoginChoice() {
  document.getElementById("loginChoiceModal").hidden = true;
}
function openBenefits() {
  document.getElementById("benefitModal").hidden = false;
}
function closeBenefits() {
  document.getElementById("benefitModal").hidden = true;
}
function openLogin(role) {
  document.getElementById("loginRole").value = role;
  document.getElementById("loginTitle").textContent =
    role === "admin" ? "Masuk Admin" : "Masuk User";
  document.getElementById("loginHint").textContent =
    role === "admin"
      ? "Masukkan username Admin dan password untuk membuka panel pengelolaan."
      : "Masuk untuk berbelanja dan melihat pesananmu.";
  document.getElementById("loginHelp").innerHTML =
    role === "admin"
      ? "Admin dapat memakai username apa saja dengan password <strong>admin123</strong>."
      : "User dapat memakai akun bebas dengan password minimal 4 karakter.";
  document.getElementById("loginMessage").textContent = "";
  document.getElementById("loginModal").hidden = false;
  document.getElementById("loginUsername").focus();
}
function closeLogin() {
  document.getElementById("loginModal").hidden = true;
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLogin();
    closeLoginChoice();
    closeBenefits();
  }
});
document.getElementById("togglePassword")?.addEventListener("click", () => {
  const input = document.getElementById("loginPassword"),
    button = document.getElementById("togglePassword"),
    shown = input.type === "text";
  input.type = shown ? "password" : "text";
  button.innerHTML = shown ? "&#128065;" : "&#128064;";
  button.setAttribute(
    "aria-label",
    shown ? "Tampilkan password" : "Sembunyikan password",
  );
});
window.addEventListener("load", () =>
  document.getElementById("pageLoader")?.classList.add("hide"),
);
document.getElementById("loginForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const role = document.getElementById("loginRole").value;
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");
  if (role === "admin" && password !== "admin123") {
    message.textContent =
      "Password admin tidak sesuai. Gunakan password admin123.";
    return;
  }
  if (role === "user" && password.length < 4) {
    message.textContent = "Password user minimal 4 karakter.";
    return;
  }
  localStorage.setItem(
    sessionKey,
    JSON.stringify({ username, role, loggedInAt: new Date().toISOString() }),
  );
  location.href =
    role === "admin" ? "IT-II-ZynXiz-Admin.html" : "IT-II-ZynXiz-Beranda.html";
});
