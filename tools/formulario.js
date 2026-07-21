
const form = document.getElementById("userForm");
const respuesta = document.getElementById("respuesta");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const usuario = {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value,
        addresses: [
            {
                label: form.addressLabel.value,
                address: form.address.value.trim(),
                reference: form.reference.value.trim()
            }
        ],
        role: form.role.value,
        documents: form.documentType.value
        ? [form.documentType.value]
        : []
    };

    // Archivo seleccionado
    const profileImageFile = form.profileImage.files[0];

    // URL de imagen
    const imageUrl = form.imageUrl.value.trim();

    try {

        let res;

        // Si hay archivo, usar FormData
        if (profileImageFile) {

            const formData = new FormData();

            formData.append("firstName", usuario.firstName);
            formData.append("lastName", usuario.lastName);
            formData.append("email", usuario.email);
            formData.append("password", usuario.password);
            formData.append("addresses", JSON.stringify(usuario.addresses));
            formData.append("role", usuario.role);
            formData.append("documents", JSON.stringify(usuario.documents));

            // IMPORTANTE: debe llamarse "images"
            formData.append("images", profileImageFile);

            // Si escribió una URL también se envía
            if (imageUrl) {
                formData.append("imageUrls", imageUrl);
            }

            res = await fetch("/api/users", {
                method: "POST",
                body: formData
            });

        } else {

            // Si no hay archivo, enviar JSON
            if (imageUrl) {
                usuario.imageUrls = [imageUrl];
            }

            res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

        }

        const data = await res.json();

        respuesta.innerHTML = data.message || "Usuario registrado.";

        if (res.ok) {

            if (data.payload?._id) {
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(data.payload)
                );
            }

            respuesta.innerHTML +=
                "<br>Tu usuario quedó guardado. Ahora podrá crear productos y comprar.";

            form.reset();
        }

    } catch (error) {

        console.error(error);
        respuesta.innerHTML = "Ocurrió un error al registrar el usuario.";

    }

});