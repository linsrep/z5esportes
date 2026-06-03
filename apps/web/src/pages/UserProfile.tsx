import React, { FormEvent, useState } from 'react';
import Toast from '../components/Toast';
import { getAuthUser, setAuthUser } from '../lib/auth';
import { auth, db } from '../lib/firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export default function UserProfile() {
  const authUser = getAuthUser();
  const [name, setName] = useState(authUser?.name ?? '');
  const [email, setEmail] = useState(authUser?.email ?? '');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const save = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          if (name !== user.displayName) {
            await updateProfile(user, { displayName: name });
          }
          if (email !== user.email) {
            await updateEmail(user, email);
          }
          if (password) {
            await updatePassword(user, password);
          }
        }

        if (db && user) {
          const ref = doc(db, 'users', user.uid);
          await updateDoc(ref, { name, email });
        }

        setAuthUser({ name, email, role: authUser?.role ?? 'athlete' });
        setToastMessage('Perfil atualizado com sucesso');
        setShowToast(true);
      } catch (err: any) {
        setToastMessage(err?.message || 'Erro ao atualizar perfil');
        setShowToast(true);
      }
    };

    void save();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-black mb-4">Perfil do Usuário</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">E-mail</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded border px-3 py-2" type="email" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Nova senha</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded border px-3 py-2" type="password" />
        </div>

        <div className="flex gap-3 mt-4">
          <button className="px-6 py-3 bg-primary text-white rounded-2xl font-black">Salvar alterações</button>
        </div>
      </form>

      <Toast isOpen={showToast} onClose={() => setShowToast(false)} message={toastMessage} variant="success" />
    </div>
  );
}
