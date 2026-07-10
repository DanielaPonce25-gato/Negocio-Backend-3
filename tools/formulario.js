
const form = document.getElementById("userForm");
const respuesta = document.getElementById("respuesta");

form.addEventListener("submit", async (enfor) => {

    enfor.preventDefault();

    const usuario = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        password: form.password.value,
        addresses: [
            {
                label: form.addressLabel.value,
                address: form.address.value,
                reference: form.reference.value || ""
            }
        ],
        role: form.role.value
    };

    // Verificar si hay imagen seleccionada
    const profileImageFile = form.profileImage?.files?.[0];
    const hasImage = profileImageFile !== undefined;

    try {
        let res;

        if (hasImage) {
            // Si hay imagen, usar FormData (multipart/form-data)
            const formData = new FormData();
            formData.append('firstName', usuario.firstName);
            formData.append('lastName', usuario.lastName);
            formData.append('email', usuario.email);
            formData.append('password', usuario.password);
            formData.append('addresses', JSON.stringify(usuario.addresses));
            formData.append('role', usuario.role);
            formData.append('profileImage', profileImageFile);

            res = await fetch("/api/users", {
                method: "POST",
                body: formData
            });
        } else {
            // Si no hay imagen, usar JSON (application/json)
            res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        }

        const data = await res.json();

        respuesta.innerHTML = data.message || "Usuario registrado";

        if (res.ok) {
            const userPayload = data.payload || {};
            if (userPayload._id || userPayload.id) {
                localStorage.setItem("currentUser", JSON.stringify(userPayload));
                respuesta.innerHTML += "<br>Tu usuario quedó guardado. Ahora podra crear productos, y comprar";
            }
            form.reset();
        }

    } catch (error) {

        respuesta.innerHTML = "Ocurrio un error a cagar el formulario.";
        console.error('Error:', error);

    }

});