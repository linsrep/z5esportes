const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

type RegisterPayload = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};

export const registerUser = async (payload: RegisterPayload) => {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Nao foi possivel conectar com a API. Verifique se o servidor esta rodando.');
  }

  const data = (await response.json().catch(() => null)) as {error?: string; message?: string} | null;

  if (!response.ok) {
    throw new Error(data?.error ?? 'Nao foi possivel concluir o cadastro agora.');
  }

  return {
    message: data?.message ?? 'Cadastro realizado com sucesso.',
  };
};
