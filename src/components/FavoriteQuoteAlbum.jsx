import React, { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

function FavoriteQuotesAlbum() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState("");
  const [randomQuote, setRandomQuote] = useState(null);

  const album = collection(db, "albumQuote");

  const getAlbum = async () => {
    try {
      const data = await getDocs(album);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuotes(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  getAlbum();

  const addQuote = async () => {
    if (newQuote.trim()) {
      try {
        await addDoc(album, { quote: newQuote });
        setQuotes([...quotes, newQuote]);
        setNewQuote("");
        alert("Frase agregada correctamente");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const showRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex].quote);
    } else {
      alert("No hay frases disponibles. ¡Añade una primero!");
    }
  };

  const closePopup = () => setRandomQuote(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Álbum de Frases Favoritas</h1>

      {/* Agregar nueva frase */}
      <div className="mb-6 flex flex-col items-center">
        <textarea
          className="w-72 p-2 border border-gray-300 rounded mb-2"
          rows="3"
          placeholder="Escribe una nueva frase..."
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addQuote}
        >
          Agregar Frase
        </button>
      </div>

      {/* Mostrar frase aleatoria */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={showRandomQuote}
      >
        Mostrar Frase Aleatoria
      </button>

      {/* Pop-up */}
      {randomQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="text-lg font-medium mb-4">{randomQuote}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closePopup}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoriteQuotesAlbum;
