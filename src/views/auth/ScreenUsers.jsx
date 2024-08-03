

const WelcomeScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-center p-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          ¿Qué gestionaremos hoy?
        </h1>
        <p className="text-xl text-gray-600">
          Elige una opción del menú para empezar.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
