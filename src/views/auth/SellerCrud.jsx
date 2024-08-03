import { useState } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import { UserServices } from "../../components/Endpoints";

const initialUserForm = {
  email: '',
  rol: '',
  password: '',
  enterpriseName: '',
  whatsappNumber: '',
};

const initialUsers = [
  {
    email: 'MecanicoExpress@mail.com',
    rol: 'Admin',
    password: 'delunoaltres',
    enterpriseName: 'Empresa Principal',
    whatsappNumber: '4421110023',
  },
  {
    email: 'ricardo@mail.com',
    rol: 'Seller',
    password: 'aquenoadivinas',
    enterpriseName: 'RTawer',
    whatsappNumber: '4428803727',
  },
];

const UserCRUD = () => {
  const [userForm, setUserForm] = useState(initialUserForm);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handlePresubmit = async () => {
    console.log(userForm);
    try {
      const response = await fetch(`${UserServices}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userForm),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('Usuario Agregado Correctamente');
        setUsers([...users, userForm]);
        setUserForm(initialUserForm);
        setShowForm(false);
      } else {
        console.log('Algo salió mal');
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('Solicitud finalizada');
    }
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Administrar Usuarios</h2>
      <button
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow mb-6"
        onClick={toggleForm}
      >
        {showForm ? 'Ocultar Formulario' : 'Nuevo Usuario'}
      </button>

      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Correo</label>
              <input
                type="email"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Correo Electrónico"
                name="email"
                value={userForm.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Rol</label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Rol"
                name="rol"
                value={userForm.rol}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Contraseña</label>
              <input
                type="password"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Contraseña"
                name="password"
                value={userForm.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Nombre de Empresa</label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Nombre de Empresa"
                name="enterpriseName"
                value={userForm.enterpriseName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Número de WhatsApp</label>
              <input
                type="tel"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Número de WhatsApp"
                name="whatsappNumber"
                value={userForm.whatsappNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow mt-6"
            onClick={handlePresubmit}
          >
            Guardar Usuario
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">{user.email}</h3>
            <p>
              <span className="font-semibold">Rol:</span> {user.rol}
            </p>
            <p>
              <span className="font-semibold">Nombre de Empresa:</span> {user.enterpriseName}
            </p>
            <p>
              <span className="font-semibold">Número de WhatsApp:</span> {user.whatsappNumber}
            </p>
            <button
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow mt-4"
              onClick={() => handleDeleteUser(index)}
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCRUD;
