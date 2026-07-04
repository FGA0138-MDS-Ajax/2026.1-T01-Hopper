import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/*rota para deslogar o usuário autenticado*/
export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: object) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: object) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      },
    );

    //invalida a sessão no Supabase e limpa os cookies de auth
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { error: "Erro ao encerrar sessão" },
        { status: 500 },
      );
    }

    //aqui devolvemos JSON (não redirect), porque quem chama essa rota
    //é o front via fetch() — é ele quem decide pra onde navegar depois
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deslogar:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

/*
    ---- Código para teste de login e logout via curl: -----

    npm run dev 
    
    curl -i -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","senha":"suasenha"}' \
  -c cookies.txt

*/
