

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("categoryCarousels");

    try {

        // OBTENER CATEGORÍAS
        const responseCategories = await fetch("/api/products/categories");
        const categoriesData = await responseCategories.json();
        const categories = categoriesData.payload;

        console.log("CATEGORIAS:", categories);

        // OBTENER PRODUCTOS
        const responseProducts = await fetch("/api/products");
        const productsData = await responseProducts.json();
        const allProducts = productsData.payload;


        console.log("PRODUCTOS:", allProducts);

        // CREAR CARRUSELES
        categories.forEach(category => {

            const products = allProducts
                .filter(product =>
                    product.category?.trim().toLowerCase() === category.trim().toLowerCase()
                )
                .slice(0, 10);

            if (products.length === 0) return;

            // SECCIÓN
            const section = document.createElement("section");
            section.className = "category-section";

            const title = document.createElement("h2");
            title.textContent = category;

            section.appendChild(title);

            // CARRUSEL
            const carousel = document.createElement("div");
            carousel.className = "carousel";

            // BOTÓN IZQUIERDA
            const prev = document.createElement("button");
            prev.className = "prev";
            prev.textContent = "❮";

            // BOTÓN DERECHA
            const next = document.createElement("button");
            next.className = "next";
            next.textContent = "❯";

            // CONTENEDOR PRODUCTOS
            const productsContainer = document.createElement("div");
            productsContainer.className = "products";

            // TARJETAS
            products.forEach(product => {

                const card = document.createElement("div");
                card.className = "product-card";

                card.innerHTML = `
                    <img
                        src="${product.images?.length ? product.images[0] : "/uploads/logo.jpg"}"
                        alt="${product.title}"
                    >

                    <h3>${product.title}</h3>

                    <p>$${product.price}</p>
                `;

                card.addEventListener("click",()=>{

                    window.location.href = `/producto?id=${product._id}`;

                });

                productsContainer.appendChild(card);

            });

            // ===============================
            // DESPLAZAMIENTO RESPONSIVE
            // ===============================
            const getScrollAmount = () => {

                const card = productsContainer.querySelector(".product-card");

                if (!card) return 300;

                const gap = parseInt(getComputedStyle(productsContainer).gap) || 20;
                const width = window.innerWidth;

                let visibleCards = 4;

                if (width <= 500) {
                    visibleCards = 1;
                } else if (width <= 768) {
                    visibleCards = 2;
                } else if (width <= 1024) {
                    visibleCards = 3;
                }

                return (card.offsetWidth + gap) * visibleCards;
            };

            // ===============================
            // BOTONES
            // ===============================
            prev.addEventListener("click", () => {

                productsContainer.scrollBy({
                    left: -getScrollAmount(),
                    behavior: "smooth"
                });

            });

            next.addEventListener("click", () => {

                productsContainer.scrollBy({
                    left: getScrollAmount(),
                    behavior: "smooth"
                });

            });

            // ===============================
            // MOVIMIENTO AUTOMÁTICO
            // ===============================
            const autoMove = () => {

                const amount = getScrollAmount();

                if (
                    productsContainer.scrollLeft + productsContainer.clientWidth >=
                    productsContainer.scrollWidth - 10
                ) {

                    productsContainer.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });

                } else {

                    productsContainer.scrollBy({
                        left: amount,
                        behavior: "smooth"
                    });

                }

            };

            let autoScroll = setInterval(autoMove, 4000);

            // ===============================
            // PAUSAR AL PASAR EL MOUSE
            // ===============================
            productsContainer.addEventListener("mouseenter", () => {
                clearInterval(autoScroll);
            });

            productsContainer.addEventListener("mouseleave", () => {
                autoScroll = setInterval(autoMove, 4000);
            });

            // ARMAR CARRUSEL
            carousel.appendChild(prev);
            carousel.appendChild(productsContainer);
            carousel.appendChild(next);

            section.appendChild(carousel);

            container.appendChild(section);

        });

    } catch (error) {

        console.error("Error cargando home:", error);

        container.innerHTML = `
            <h2>Error cargando productos</h2>
        `;

    }

});