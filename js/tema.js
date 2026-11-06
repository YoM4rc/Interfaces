document.addEventListener("DOMContentLoaded", () => {

  // === MODO CLARO / OSCURO (Bootstrap 5 nativo) ===
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const htmlElement = document.documentElement;
  const icon = themeToggle.querySelector("i");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // localStorage puede fallar (modo privado, cookies bloqueadas...)
  const getSavedTheme = () => {
    try { return localStorage.getItem("theme"); } catch { return null; }
  };
  const saveTheme = (theme) => {
    try { localStorage.setItem("theme", theme); } catch { /* sin persistencia */ }
  };

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    const label = isDark ? "Activar modo claro" : "Activar modo oscuro";

    htmlElement.setAttribute("data-bs-theme", theme);
    icon.className = isDark ? "bi bi-sun" : "bi bi-moon-stars";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.title = label;
  };

  // Preferencia guardada; si no hay, la del sistema
  const saved = getSavedTheme();
  applyTheme(
    saved === "dark" || saved === "light"
      ? saved
      : (prefersDark.matches ? "dark" : "light")
  );

  themeToggle.addEventListener("click", () => {
    const newTheme = htmlElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    saveTheme(newTheme);
  });

  // Si el usuario nunca eligió, seguir los cambios del sistema
  prefersDark.addEventListener("change", (e) => {
    if (!getSavedTheme()) applyTheme(e.matches ? "dark" : "light");
  });
});
