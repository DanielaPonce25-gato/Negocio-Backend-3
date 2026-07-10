const form = document.getElementById('productForm');
const respuesta = document.getElementById('respuesta');
const sellerInput = document.getElementById('seller');
const userStatus = document.getElementById('userStatus');
const submitBtn = document.getElementById('submitBtn');

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem('currentUser'));
    } catch (error) {
        return null;
    }
};

const showUserState = () => {
    const user = getStoredUser();

    if (!user || (!user._id && !user.id)) {
        userStatus.textContent = 'No estas registrado. Debes registrarte antes de crear un producto.';
        userStatus.className = 'status warning';
        sellerInput.value = '';
        submitBtn.disabled = true;
        return false;
    }

    sellerInput.value = user._id || user.id;
    userStatus.textContent = `Usuario: ${user.firstName || ''} ${user.lastName || ''}`.trim();
    userStatus.className = 'status success';
    submitBtn.disabled = false;
    return true;
};

showUserState();

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!showUserState()) {
        respuesta.innerHTML = 'Debes registrarte primero para crear un producto.';
        return;
    }

    const productData = {
        title: form.title.value.trim(),
        description: form.description.value.trim(),
        price: Number(form.price.value),
        stock: Number(form.stock.value || 0),
        category: form.category.value.trim(),
        seller: sellerInput.value,
        imageUrls: form.imageUrls.value.trim()
    };

    // Verificar si hay archivos seleccionados
    const imageFiles = form.imageFiles?.files;
    const hasFiles = imageFiles && imageFiles.length > 0;

    try {
        let response;

        if (hasFiles) {
            // Si hay archivos, usar FormData (multipart/form-data)
            const formData = new FormData();
            formData.append('title', productData.title);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            formData.append('stock', productData.stock);
            formData.append('category', productData.category);
            formData.append('seller', productData.seller);
            
            // Agregar URLs si existen
            if (productData.imageUrls) {
                formData.append('imageUrls', productData.imageUrls);
            }

            // Agregar archivos
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('images', imageFiles[i]);
            }

            response = await fetch('/api/products', {
                method: 'POST',
                body: formData
            });
        } else {
            // Si no hay archivos, usar JSON (application/json)
            response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
        }

        const data = await response.json();
        respuesta.innerHTML = data.message || 'Producto creado';

        if (response.ok) {
            form.reset();
            sellerInput.value = getStoredUser()?._id || getStoredUser()?.id || '';
            showUserState();
        }
    } catch (error) {
        respuesta.innerHTML = 'No se pudo crear el producto.';
    }
});
