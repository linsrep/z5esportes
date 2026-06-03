import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type RegisterPayload = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};

export const registerUser = async (payload: RegisterPayload) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: payload.name,
    });

    if (db) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: payload.name,
        cpf: payload.cpf,
        email: payload.email,
        createdAt: serverTimestamp(),
      });
    } else {
      // Firestore not available for this project — log a warning and continue.
      // eslint-disable-next-line no-console
      console.warn('@firebase/firestore: Firestore not available, skipping user profile write');
    }

    return {
      message: 'Cadastro realizado com sucesso.',
      uid: user.uid,
      email: user.email,
      name: payload.name,
    };
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message.replace('Firebase: ', '');
      throw new Error(message);
    }
    throw new Error('Nao foi possivel concluir o cadastro agora.');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message.replace('Firebase: ', '');
      throw new Error(message);
    }
    throw new Error('Nao foi possivel fazer login.');
  }
};

export const logoutUser = async () => {
  await signOut(auth);
};
