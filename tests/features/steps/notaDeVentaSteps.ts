import { Before, After, Given, Then, When } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { expect } from "playwright/test";

let browser: Browser;
let folioGuardado = "";

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  this.page = page;
});

After(async function () {
  await this.page.context().browser()?.close();
});

Given("navego a URL {string}", async function (url: string) {
  await this.page.goto(url);
});

Then("ingreso usuario {string}", async function (usuario: string) {
  await this.page.fill("(//input[@id='user_email'])", usuario);
});

Then("ingreso contraseña {string}", async function (contraseña: string) {
  await this.page.fill("(//input[@id='user_password'])", contraseña);
});

Then("hacer click en boton Iniciar sesion", async function () {
  await this.page.click("(//input[@name='commit'])");
});

Then("hacer click en boton {string}", async function (texto: string) {
  await this.page.click(`text="${texto}"`);
});

Then("validar redireccion a {string}", async function (urlEsperada: string) {
  const urlActual = this.page.url();
  expect(await urlActual).toBe(urlEsperada);
});

When("lleno el formulario con los siguientes datos:", async function (dataTable) {
  for (const { campo, valor } of dataTable.hashes()) {
    let xpathSelector;

    switch (campo.toLowerCase()) {
      case "sucursal":
        xpathSelector = '(//span[@id="select2-sales_note_branch_id-container"])';
        break;
      case "bodega":
        xpathSelector = '(//span[@id="select2-sales_note_ware_house_id-container"])';
        break;
      case "moneda":
        xpathSelector = '(//span[@id="select2-sales_note_currency-container"])';
        break;
      case "documento tributario":
        xpathSelector = '(//span[@id="select2-sales_note_type_document_sii-container"])';
        break;
      case "ciudad":
        xpathSelector = '(//span[@id="select2-sales_note_city_id-container"])';
        break;
      case "vendedor":
        xpathSelector = '(//span[@id="select2-sales_note_seller_id-container"])';
        break;
      case "forma de pago":
        xpathSelector = '(//span[@id="select2-sales_note_type_payment_id-container"])';
        break;
      default:
        throw new Error(`Campo no reconocido: ${campo}`);
    }

    await this.page.click(xpathSelector);
    const xpathSelectValor = `//li[contains(@class, 'select2-results__option') and contains(text(), "${valor}")]`;
    await this.page.waitForSelector(xpathSelectValor, { timeout: 5000 });
    await this.page.click(xpathSelectValor);
  }
});

Then("tomo una captura de pantalla", async function () {
  await this.page.screenshot({
    path: "tests/formulario-lleno.png",
    fullPage: true,
  });
});

Then("seleccionar cliente {string}", async function (cliente: string) {
  const campoClienteXPath = '(//span[@id="select2-sales_note_customer_id-container"])[1]';
  await this.page.click(campoClienteXPath);
  const textboxXPath = "(//input[@role='textbox'])[1]";
  const textbox = await this.page.waitForSelector(textboxXPath, { timeout: 10000 });
  await textbox.waitForElementState("visible");
  await textbox.waitForElementState("editable");
  await textbox.type(cliente);
  await this.page.getByRole("treeitem", { name: "[19089916-0] Fantansia Prueba" }).click();
  await this.page.keyboard.press("Enter");
});

Then("agrego la cantidad de {int} {string}", async function (cantidad: number, producto: string) {
  const productoSelector = '(//span[contains(@id, "product_id-container")])[1]';
  await this.page.click(productoSelector);
  const textboxXPath = "(//input[@role='textbox'])[1]";
  const textbox = await this.page.waitForSelector(textboxXPath, { timeout: 8000 });
  await textbox.waitForElementState("visible");
  await textbox.waitForElementState("editable");
  await textbox.type(producto);
  await this.page.getByRole('treeitem', { name: '[SC-T-81172] Tornillo' }).click();
  await this.page.keyboard.press("Enter");
  const cantidadInput = '(//input[contains(@id, "sales_note_e_document_products_attributes_") and contains(@id, "_quantity")])[1]';
  const inputCantidad = await this.page.waitForSelector(cantidadInput, { timeout: 8000 });
  await inputCantidad.waitForElementState("visible");
  await inputCantidad.fill(cantidad.toString());
});

When("escribo el comentario {string}", async function (comentario: string) {
  const commentInput = this.page.locator("(//textarea[@id='sales_note_comment'])[1]");
  await commentInput.click();
  await commentInput.fill(comentario);
});

When("validar monto total", async function () {
  const page = this.page;
  const xpathNeto = '(//p[@id="neto_total"])[1]';
  const xpathIva = '(//p[@id="iva_total"])[1]';
  const xpathTotal = '(//p[@id="total"])[1]';
  const netoText = await page.textContent(xpathNeto);
  const ivaText = await page.textContent(xpathIva);
  const totalText = await page.textContent(xpathTotal);
  const parseMonto = (text: string | null): number => Number(text?.replace(/[^\d.-]+/g, "") || 0);
  const neto = parseMonto(netoText);
  const iva = parseMonto(ivaText);
  const total = parseMonto(totalText);
  expect(neto + iva).toBe(total);
  this.totalNotaVenta = total;
});

Then("hacer click en boton Enviar", async function () {
  this.page.once("dialog", async (dialog: import("playwright").Dialog) => {
    await dialog.accept();
  });
  await this.page.getByRole("button", { name: /Enviar/ }).click();
  await this.page.waitForNavigation({ waitUntil: "networkidle", timeout: 10000 });

});

Then("la url debe comenzar con {string}", async function (urlEsperada: string) {
  const urlActual = await this.page.url();
  if (!urlActual.startsWith(urlEsperada)) {
    throw new Error(`La URL actual (${urlActual}) no comienza con ${urlEsperada}`);
  }
});

Then("valido que el ultimo registro sea {string} con vendedor {string}", async function (cliente: string, vendedor: string) {
  await this.page.waitForSelector('table', { timeout: 15000 });
  const clienteXPath = `(//a[contains(translate(text(), 'áéíóúÁÉÍÓÚ', 'aeiouAEIOU'), '${cliente.toUpperCase()}')])[1]`;
  const vendedorXPath = `(//td[contains(text(),'${vendedor}')])[1]`;
  const clienteElemento = await this.page.waitForSelector(clienteXPath, { timeout: 15000 });
  const vendedorElemento = await this.page.waitForSelector(vendedorXPath, { timeout: 15000 });
  const textoCliente = await clienteElemento.textContent();
  const textoVendedor = await vendedorElemento.textContent();
  if (!textoCliente?.toUpperCase().includes(cliente.toUpperCase())) {
    throw new Error(`El cliente esperado era "${cliente}" pero se encontró "${textoCliente}"`);
  }
  if (!textoVendedor?.includes(vendedor)) {
    throw new Error(`El vendedor esperado era "${vendedor}" pero se encontró "${textoVendedor}"`);
  }
});

Then("valido que la nueva nota de venta tenga cliente {string} y precio correcto", async function (clienteEsperado: string) {
  await this.page.waitForSelector('table', { timeout: 15000 });
  const clienteSelector = 'table tbody tr:first-child td:nth-child(1) a';
  const precioSelector = 'table tbody tr:first-child td:nth-child(3)';
  const cliente = await this.page.textContent(clienteSelector);
  const precioTd = await this.page.textContent(precioSelector);
  const precioLinea = precioTd?.split('\n')[0].replace(/[^0-9.,]/g, '').trim();
  expect(cliente?.trim()).toContain(clienteEsperado);
  expect(Number(precioLinea)).toBe(this.totalNotaVenta);
});

Then("capturar folio de nomina y guardarlo localmente", async function () {
  const xpathFolio = "(//strong)[2]";
  await this.page.waitForSelector(xpathFolio, { timeout: 5000 }).catch(() => {
    throw new Error("No se encontró el folio en pantalla.");
  });
  const folioElement = await this.page.$(xpathFolio);
  if (!folioElement) throw new Error("No se pudo capturar el folio.");
  folioGuardado = (await folioElement.textContent())?.trim() || "";
  if (!folioGuardado) throw new Error("El folio estaba vacío o no se pudo leer.");
});

Then("validar nomina con folio guardado", async function () {
  const xpath = `//td[contains(text(), '${folioGuardado}')]`;
  const tdFolio = await this.page.waitForSelector(xpath, { timeout: 5000 });
  const contenido = await tdFolio.textContent();
  if (!contenido || !contenido.includes(folioGuardado)) {
    throw new Error(`El folio ${folioGuardado} no se encontró en la tabla.`);
  }
});

Then("validar que monto sea {int}", async function (montoEsperado: number) {
  const xpath = `//td[contains(text(), '${montoEsperado}')]`;
  const elemento = await this.page.waitForSelector(xpath, { timeout: 5000 });
  const texto = await elemento.textContent();

  if (!texto || !texto.includes(montoEsperado.toString())) {
    throw new Error(`No se encontró el monto ${montoEsperado} en la tabla.`);
  }
});

Then("cerrar sesion", async function () {
  const botonMenu = await this.page.waitForSelector("(//a[@role='button'])[2]", { timeout: 5000 });
  await botonMenu.click();

  const opcionSalir = await this.page.waitForSelector("(//a[normalize-space()='Salir'])[1]", { timeout: 5000 });
  await opcionSalir.click();
});
