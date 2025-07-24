# 🚀 DESAFÍO TÉCNICO QA - Automatización E2E con Playwright + Cucumber

Este proyecto corresponde al desafío técnico para postular al cargo de QA. La automatización fue realizada con **Playwright** utilizando **TypeScript** y estructurada con **Cucumber** para mantener una arquitectura más escalable a futuro.

Evidencia de ejecución:

[Ver video](https://www.loom.com/share/7d388343d10d4314b97ecce15ad846c8?sid=708a9c45-aa93-4f9f-af64-5c33079cd922)


---

## FLUJO AUTOMATIZADO

El flujo automatizado cubre la creación completa de una **Nota de Venta**, validando que todos los pasos relevantes se cumplan correctamente y que los datos ingresados se reflejen en el listado final. A continuación, se describen las acciones que realiza el test automatizado:

1. Navegar a la URL del sistema.
2. Iniciar sesión con credenciales válidas.
3. Acceder a la sección **Ventas**.
4. Ingresar a **Notas de venta**.
5. Hacer clic en **Nuevo** y luego en **Nota de venta**.
6. Validar redirección a la ruta de creación de nota.
7. Capturar y guardar el folio de la nota.
8. Completar el formulario con los datos requeridos (sucursal, bodega, cliente, moneda, etc.).
9. Agregar un producto con su cantidad.
10. Ingresar un comentario.
11. Validar que se calcule correctamente el monto total.
12. Tomar una captura de pantalla del formulario completo.
13. Enviar la nota de venta.
14. Validar que se haya redirigido al detalle de la nota recién creada.
15. Volver a la sección **Notas de venta**.
16. Buscar el folio capturado.
17. Validar que el monto sea el esperado.

Este flujo representa una validación completa E2E, desde el login hasta la verificación final de los datos ingresados.
Adicional se hizo un flujo para cerrar la sesión del usuario.
También se toma una cáptura de pantalla para veriicar llenado correcto del formulario.

---

## ¿CÓMO EJECUTAR EL TEST?

1. Clonar el repositorio en tu máquina local.
2. Instalar las dependencias:

   ```bash
   npm install
   

3. Instalar cucumber:

   ```bash
   npm install --save-dev playwright @cucumber/cucumber

4. Ejecutar con:

   ```bash
   npx cucumber-js --config cucumber.js

---

## VALIDACIONES REALIZADAS

-  Redirección correcta a la URL de creación de nota de venta.
  
-  Captura y almacenamiento del folio generado para su posterior verificación.
  
-  Que el formulario se complete correctamente sin errores visibles.
  
-  Que el monto total se calcule automáticamente al agregar productos.

-  Que la nota de venta se envíe exitosamente y la URL resultante corresponda al detalle de la nota.

-  Que el folio guardado esté presente en el listado de notas de venta.

-  Que el monto total mostrado en el listado coincida con el esperado.

-  Que los datos del cliente y vendedor estén correctamente reflejados en el registro final.

---

## DECISIONES Y DESAFÍOS TÉCNICOS

Durante este desafío enfrenté múltiples retos, ya que las tecnologías requeridas no eran parte de mi stack principal.

- Playwright: Aunque había estudiado la herramienta en mi formación autodidacta, solo había trabajado con flujos más simples, por lo que este caso real me exigió profundizar conocimientos como en manejo de formularios más complejos y otras cosas.

- TypeScript: Mi formación previa fue en JavaScript, por lo que adaptarme a la sintaxis y tipado de TypeScript fue un desafío adicional que me obligó a investigar y probar activamente.

- Decisión de usar Cucumber: Aunque el flujo no es particularmente grande, opté por integrar Cucumber desde el inicio porque permite una mejor escalabilidad, legibilidad y mantenibilidad en flujos más complejos. Me pareció una decisión mejor alineada con buenas prácticas de automatización.

Aunque estas tecnologías no forman parte de mi stack principal, cuento con bases sólidas de programación y automatización en otros entornos, lo que me permitió abordar el desafío de forma estructurada y con criterio técnico. Este reto fue una oportunidad real para demostrar mi capacidad de adaptación, aplicar mis conocimientos y seguir aprendiendo. Fue una experiencia enriquecedora, donde confirmé que siempre se puede aprender algo nuevo al enfrentarse a un entorno distinto.

---

## ESTRATEGIA DE TESTING

- El enfoque fue una prueba E2E completa, cubriendo el flujo principal de negocio.

- Se priorizó la funcionalidad crítica y los caminos felices, con la intención de expandir a validaciones más exhaustivas en una segunda fase.

---

## OBSERVACIONES Y COMENTARIOS

Durante el desarrollo del desafío se detectaron los siguientes puntos relevantes:

- Uso de datos en duro: Por razones de tiempo, algunos datos fueron ingresados directamente en el archivo .feature. Esta es una práctica no recomendada, especialmente cuando se trata de datos sensibles, por razones de seguridad y mantenibilidad. Idealmente, estos deberían estar parametrizados o cargarse desde un archivo externo seguro.

- Falta de stock en productos existentes: Al intentar automatizar la selección de productos para una nota de venta, se evidenció que muchos productos listados no tienen stock disponible. Como solución temporal para poder continuar con la automatización, se agregó manualmente un producto nuevo con stock suficiente.

- Stock negativo: Al revisar la plataforma manualmente, se identificaron productos que presentan stock negativo. Esta situación podría afectar la lógica del sistema y es relevante para el control de inventario.

- Inconsistencia entre instrucciones y UI: En las instrucciones del desafío se menciona que se debe hacer clic en el botón "Crear nueva nota de venta", sin embargo, en la interfaz el texto visible del botón es simplemente "Nuevo", seguido de una opción "Nota de venta". Esta diferencia podría generar confusión, especialmente en pruebas automatizadas basadas en texto visible.

- Cambio automático de producto al seleccionar cliente: Al seleccionar el cliente existente "Falabella" y luego intentar agregar un producto, el sistema reemplaza automáticamente la selección del producto por otro específico, sin intervención del usuario. Este comportamiento inesperado puede afectar tanto la experiencia de usuario como la integridad de los datos ingresados.

---

## PARA MANTENER EL CONTACTO

-  Correo: [ksoto.albornoz@gmail.com](ksoto.albornoz@gmail.com)

---