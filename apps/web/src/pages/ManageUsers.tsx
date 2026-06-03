import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';
import { db } from '../lib/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'athlete' | 'organizer' | 'admin';
  active: boolean;
};

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'João Silva', email: 'joao@example.com', role: 'athlete', active: true },
  { id: 'u2', name: 'Maria Souza', email: 'maria@example.com', role: 'organizer', active: true },
  { id: 'u3', name: 'Carlos Admin', email: 'admin@example.com', role: 'admin', active: true },
];

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        if (!db) return;
        const snap = await getDocs(collection(db, 'users'));
        const list: User[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setUsers(list as User[]);
      } catch (err) {
        // keep mocks
      }
    };

    load();
  }, []);

  const toggleActive = async (id: string) => {
    setUsers((cur) => cur.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
    setToastMessage('Status do usuário atualizado');
    setShowToast(true);

    try {
      if (!db) return;
      const ref = doc(db, 'users', id);
      await updateDoc(ref, { active: !(users.find((u) => u.id === id)?.active) });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="min-h-[85vh] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black">Gerir Usuários</h1>
          <Link to="/admin/register-user" className="bg-primary text-white px-4 py-2 rounded font-bold">Cadastrar usuário</Link>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">Nome</th>
                <th>Email</th>
                <th>Role</th>
                <th>Ativo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3 font-bold">{u.name}</td>
                  <td>{u.email}</td>
                  <td className="capitalize">{u.role}</td>
                  <td>{u.active ? 'Sim' : 'Não'}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => toggleActive(u.id)} className="px-3 py-1 bg-slate-100 rounded">{u.active ? 'Desativar' : 'Ativar'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Toast isOpen={showToast} onClose={() => setShowToast(false)} message={toastMessage} variant="success" />
    </div>
  );
}
