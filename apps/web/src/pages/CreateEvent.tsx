import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const create = async () => {
      try {
        if (db) {
          await addDoc(collection(db, 'events'), {
            title,
            date,
            location,
            price,
            createdAt: serverTimestamp(),
          });
          setToastMessage('Evento criado com sucesso.');
        } else {
          setToastMessage('Evento criado (mock) — Firestore indisponível.');
        }
        setShowToast(true);
        setTimeout(() => navigate('/admin/dashboard'), 700);
      } catch (err) {
        setToastMessage('Erro ao criar evento.');
        setShowToast(true);
      }
    };

    create();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-black mb-4">Criar Evento</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Título</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Data</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="15 de Março, 2026" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Local</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Preço</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="R$ 99,00 ou Grátis" />
          </div>

          <button className="w-full bg-primary text-white py-3 rounded font-black">Criar evento</button>
        </form>
      </div>

      <Toast isOpen={showToast} onClose={() => setShowToast(false)} message={toastMessage} variant="success" />
    </div>
  );
}
