Feature: Nota de venta

    Scenario: Crear nota de venta E2E
        Given navego a URL "https://demo.relbase.cl"
        And ingreso usuario "qa_junior@relke.cl"
        And ingreso contraseña "Demo123456!"
        And hacer click en boton Iniciar sesion
        And hacer click en boton "Ventas"
        And hacer click en boton "Notas de venta"
        And hacer click en boton "Nuevo"
        And hacer click en boton "Nota de venta"
        And validar redireccion a "https://demo.relbase.cl/dtes/notas-venta/new"
        Then capturar folio de nomina y guardarlo localmente
        And seleccionar cliente "19089"
        When lleno el formulario con los siguientes datos:
            | campo                | valor              |
            | Sucursal             | Casa matriz        |
            | Bodega               | Bodega principal   |
            | Moneda               | Pesos              |
            | Documento tributario | BOLETA ELECTRÓNICA |
            | Ciudad               | Santiago           |
            | Vendedor             | QA Junior          |
            | Forma de pago        | Efectivo           |
        And agrego la cantidad de 3 "Tornillo"
        And escribo el comentario "Este es un comentario de prueba"
        And validar monto total 
        And tomo una captura de pantalla
        And hacer click en boton Enviar
        Then la url debe comenzar con "https://demo.relbase.cl/dtes/notas-venta/"
        And hacer click en boton "Ventas"
        And hacer click en boton "Notas de venta"
        Then validar nomina con folio guardado
        And validar que monto sea 357

    Scenario: cerrar sesion
        Given navego a URL "https://demo.relbase.cl"
        And ingreso usuario "qa_junior@relke.cl"
        And ingreso contraseña "Demo123456!"
        And hacer click en boton Iniciar sesion
        And cerrar sesion