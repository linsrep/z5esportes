import React, { useState, useEffect } from 'react';
import { doc, getDocs, collection, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Toast from '../components/Toast';

type Competitor = {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  active: boolean;
};

const MOCK_COMPETITORS: Record<string, Competitor[]> = {
  '1': [
    { id: 'c1', name: 'Atleta A', email: 'a@ex.com', cpf: '123.456.789-00', active: true },
    { id: 'c2', name: 'Atleta B', email: 'b@ex.com', cpf: '987.654.321-00', active: false },
  ],
  '2': [
    { id: 'c3', name: 'Atleta C', email: 'c@ex.com', cpf: '111.222.333-44', active: true },
  ],
};

export default function EventCompetitors({ eventId }: { eventId?: string }) {
  const id = eventId;
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    // Try to load competitors from Firestore if available
    const load = async () => {
      try {
        if (!db) {
          setCompetitors(MOCK_COMPETITORS[id] || []);
          return;
        }
        const q = query(collection(db, 'registrations'), where('eventId', '==', id));
        const snap = await getDocs(q);
        const items: Competitor[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setCompetitors(items as Competitor[]);
      } catch (err) {
        // fallback to mock
        setCompetitors(MOCK_COMPETITORS[id] || []);
      }
    };

    load();
  }, [id]);

  const toggleActive = async (cid: string) => {
    setCompetitors((cur) => cur.map((c) => (c.id === cid ? { ...c, active: !c.active } : c)));
    setToastMessage('Status do competidor atualizado');
    setShowToast(true);

    // Persist change to Firestore if available
    try {
      if (!db) return;
      const docRef = doc(db, 'registrations', cid);
      await updateDoc(docRef, { active: !competitors.find((c) => c.id === cid)?.active });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="min-h-[85vh] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-black mb-4">Competidores do Evento {id}</h1>

        <div className="bg-white rounded-2xl shadow overflow-hidden border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Ativo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3 font-bold">{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.cpf ?? '—'}</td>
                  <td>{c.active ? 'Sim' : 'Não'}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => toggleActive(c.id)} className="px-3 py-1 bg-slate-100 rounded">{c.active ? 'Desativar' : 'Ativar'}</button>
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
