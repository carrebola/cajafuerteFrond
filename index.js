swal({
	confirmButtonText: "Dale!",
	title: "Bienvenido!!!",
	text: `Averigua y valida los dígitos de la caja fuente. \n
	Pero ¡Cuidado! Solo tienes 3 oportunidades `,
	
	
});

const form = document.querySelector("form");
		const validar = document.querySelector("#validar");
		const enviar = document.querySelector("#enviar");

		validar.addEventListener("click", (e) => {
			console.log("validar");
			e.preventDefault();
			//console.log(form.user.value,form.pass.value);
			//petición a la api
			const peticionValidar = async () => {
				user = document.querySelector("#user").value;
				pass = 
					(document.querySelector("#d1").value)+
                    (document.querySelector("#d2").value)+
                    (document.querySelector("#d3").value)+
                    (document.querySelector("#d4").value)+
                    (document.querySelector("#d5").value)+
                    (document.querySelector("#d6").value)
				;

				const urlHost = `https://cajafuerte.herokuapp.com`
				const url = `${urlHost}/api/validar?user=${user}&pass=${pass}`;

				try {
					var respuesta = await fetch(url);
					respuesta = await respuesta.json();
					var icono = "";
					var titulo = "";
					if (respuesta.error == false) {
						icono = "success";
						titulo = "¡Buen trabajo!";
						document.querySelectorAll(".digito").forEach((elemento) => {
							elemento.classList.add("bg-success");
						});
						document.querySelector("#enviar").classList.remove("disabled");
					} else {
						icono = "warning";
						titulo = "¡Uf...!";
					}
					//alert(respuesta.mensaje)

					swal({
						title: titulo,
						text: respuesta.mensaje,
						icon: icono,
					});
				} catch (error) {
					swal({
						title: "Error en la conexión",
						text: "Se ha producido un error al conectar con la API",
						icon: "warning",
					});
				}
				
				//pintaExamen(respuesta)
			};
			peticionValidar();
		});
		enviar.addEventListener("click", (e) => {
			e.preventDefault();
			//console.log(form.user.value,form.pass.value);
			//petición a la api
			const peticionEnviar = async () => {
				user = document.querySelector("#user").value;
				pass = document.querySelector("#pass").value;
                console.log("user",user);
				const urlHost = `https://cajafuerte.herokuapp.com`
				const url = `${urlHost}/api/enviar?user=${user}&pass=${pass}`;
				
				var respuesta = await fetch(url);
				respuesta = await respuesta.json();

				var icono = ""
				var titulo = ""
				var confirm = ""
				if (respuesta.error == false) {
					confirm = "Ver examen"
					icono = "success"
					titulo = "¡Buen trabajo!"
					console.log(respuesta.datos.modelo, respuesta.datos.preguntas);
					localStorage.setItem("datos", JSON.stringify(respuesta.datos));
					window.location.assign("https://carrebola.github.io/cajafuerteFrond/examen.html")
				} else {
					confirm = "Volver"
					icono = "error"
					titulo = "¡Uf...!"
					swal({
						title: titulo,
						text: respuesta.mensaje,
						icon: icono,
						
					});
				}
				
			};
			peticionEnviar();
		});
