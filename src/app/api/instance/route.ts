import { NextResponse } from "next/server";
import { db } from "@/db";
import { instances } from "@/db/schema/workspace";
import { createInstanceSchema } from "@/lib/schemas/instance";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = createInstanceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validation.error.flatten() },
        { status: 400 },
      );
    }

    const { instanceName } = validation.data;
    const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
    const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

    if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
      return NextResponse.json(
        { error: "Configuração da API Evolution ausente no servidor." },
        { status: 500 },
      );
    }

    const createResponse = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        instanceName,
        token: "", 
        qrcode: true,
      }),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error("Error creating Evolution instance:", errorData);
      return NextResponse.json(
        {
          error: "Falha ao criar instância na Evolution API",
          details: errorData,
        },
        { status: createResponse.status },
      );
    }

    const instanceData = await createResponse.json();

    await db.insert(instances).values({
      name: instanceName,
      teamId: 1,
      evolutionInstanceName: instanceData.instance.instanceName,
      evolutionToken: instanceData.instance.token,
      status: 'disconected'
    });

    return NextResponse.json({ qrcode: instanceData.qrcode.base64 });
  } catch (error) {
    console.error("[INSTANCES_POST]", error);
    return NextResponse.json(
      { error: "Ocorreu um erro interno." },
      { status: 500 },
    );
  }
}
