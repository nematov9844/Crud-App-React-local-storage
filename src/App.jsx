import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    const newItem = { name, surname, age, location };

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    // Inputlarni tozalash
    setName('');
    setSurname('');
    setAge('');
    setLocation('');
    setIsModalOpen(false);
  };

  const handleEditItem = (index) => {
    const item = items[index];
    setName(item.name);
    setSurname(item.surname);
    setAge(item.age);
    setLocation(item.location);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-100">CRUD App</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Qidiruv..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-gray-300 placeholder-gray-500"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded w-full transition duration-200"
        >
          Add Users
        </button>
      </div>

      <ul className="mt-6 max-w-md mx-auto">
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-lg mb-3 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-200"><strong>Ism:</strong> {item.name}</p>
              <p className="text-gray-200"><strong>Familiya:</strong> {item.surname}</p>
              <p className="text-gray-400"><strong>Yosh:</strong> {item.age}</p>
              <p className="text-gray-400"><strong>Qayerdan:</strong> {item.location}</p>
            </div>
            <div>
              <button
                onClick={() => handleEditItem(index)}
                className="text-blue-400 hover:text-blue-500 transition duration-200 mr-3"
              >
                Tahrirlash
              </button>
              <button
                onClick={() => handleDeleteItem(index)}
                className="text-red-400 hover:text-red-500 transition duration-200"
              >
                O'chirish
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-100">Add or Edit User</h2>

            <div className="mb-4">
              <label className="block text-gray-400">Ism:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-gray-300 mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400">Familiya:</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-gray-300 mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400">Yosh:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-gray-300 mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400">Qayerdan:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-gray-300 mt-1"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded mr-2 transition duration-200"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddItem}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition duration-200"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
