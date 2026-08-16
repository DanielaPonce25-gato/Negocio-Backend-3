// deplegable navegador                                comentario presionar las teclas Ctrl + K + C

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu_visible");

    if (navMenu.classList.contains("nav-menu_visible")) {
        navToggle.setAttribute("aria-label", "Cerrar menú");
    } else {
        navToggle.setAttribute("aria-label", "Abrir menú");
    }
});

async function loadCategories() {
    const listContainer = document.getElementById("categoryList");
    if (!listContainer) return;

    try {
        const response = await fetch("/api/products/categories");
        const result = await response.json();
        const categories = Array.isArray(result.payload) ? result.payload : [];

        if (categories.length === 0) {
            listContainer.innerHTML = "<p>No hay categorías disponibles</p>";
            return;
        }

        listContainer.innerHTML = categories
            .map((category) =>
                `<a href="/products?category=${encodeURIComponent(category)}" class="itemnarvar nav-link">${category}</a>`
            )
            .join("");
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        listContainer.innerHTML = "<p>Error al cargar categorías</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadCategories);
