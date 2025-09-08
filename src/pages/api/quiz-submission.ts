import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { preference, income, email, name, acceptedTerms } = data;

    // Basic validation
    if (!email || !name || !acceptedTerms) {
      return new Response(
        JSON.stringify({ message: "Faltan campos obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const apiKey = import.meta.env.KIT_API_KEY;
    const apiUrl = import.meta.env.KIT_API_URL;

    if (!apiKey || !apiUrl) {
      console.error("Faltan las credenciales de la API de ConvertKit");
      return new Response(
        JSON.stringify({ message: "Error de configuración del servidor" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const payload = {
      first_name: name,
      email_address: email,
      state: "active",
      fields: {
        acepto_politicas_de_tratamiento_de_datos_y_terminos_y_condiciones:
          acceptedTerms ? "1" : "0",
        cual_es_tu_ingreso_mensual: income,
        date_created: new Date().toISOString().slice(0, 19).replace("T", " "),
        pais: "Estados Unidos",
        marca: "Mejores Finanzas",
        que_es_lo_que_mas_importante_en_una_tarjeta_de_credito: preference,
        quiz_tarjetas: "SI",
        utm_adgroup: "utm_adgroup",
        utm_campaign: "22188538750",
        utm_content: "172989200783",
        utm_medium: "cpc",
        utm_source: "adwords",
        utm_term: "utm_term",
      },
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Error de la API de ConvertKit:", errorBody);
      throw new Error("Error al suscribir al usuario");
    }

    return new Response(JSON.stringify({ message: "¡Suscrito con éxito!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al procesar el envío del cuestionario:", error);
    return new Response(JSON.stringify({ message: "Error al suscribir" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
