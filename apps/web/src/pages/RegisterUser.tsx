import React, { FormEvent, useState } from 'react';
import Toast from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { db } from '../lib/firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function RegisterUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'athlete' | 'organizer' | 'admin'>('athlete');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const create = async () => {
      try {
        const res = await registerUser({ name, cpf: '', email, password });
        if (db) {
          await setDoc(doc(db, 'users', res.uid), {
            uid: res.uid,
            name,
            email,
            role,
            active: true,
            createdAt: serverTimestamp(),
          });
        }
        setToastMessage(`Usuário ${name} criado com sucesso.`);
        setShowToast(true);
        setTimeout(() => navigate('/admin/users'), 700);
      } catch (err) {
        setToastMessage('Erro ao criar usuário');
        setShowToast(true);
      }
    };

    create();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-black mb-4">Cadastrar Usuário</h1>
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
            <label className="block text-sm font-bold mb-1">Senha</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded border px-3 py-2" type="password" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Papel</label>
            <select value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full rounded border px-3 py-2">
              <option value="athlete">Atleta</option>
              <option value="organizer">Gerente de prova</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button className="w-full bg-primary text-white py-3 rounded font-black">Cadastrar usuário</button>
        </form>
      </div>

      <Toast isOpen={showToast} onClose={() => setShowToast(false)} message={toastMessage} variant="success" />
    </div>
  );
}
