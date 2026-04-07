import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    id: "spotify",
    name: "Spotify",
    slug: "spotify",

    plans: [
      {
        id: "individual",
        name: "Individual",
        price: 3299,
        currency: "ARS",
        interval: "month",
        features: ["1 cuenta Premium"],
      },
      {
        id: "student",
        name: "Estudiantes",
        price: 1799,
        currency: "ARS",
        interval: "month",
        features: ["1 cuenta Premium verificada", "Descuento para estudiantes"],
      },
      {
        id: "duo",
        name: "Duo",
        price: 4399,
        currency: "ARS",
        interval: "month",
        features: ["2 cuentas Premium"],
      },
      {
        id: "family",
        name: "Familiar",
        price: 5499,
        currency: "ARS",
        interval: "month",
        features: ["Hasta 6 cuentas Premium", "Controles parentales"],
      },
    ],

    lastUpdated: new Date().toISOString(),
  });
}
