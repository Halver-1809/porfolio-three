import { motion } from 'framer-motion';
import './App.css';
import Scene from './house/huse';

function App() {
  return (
    <div className="App">
      {/* Animación en la raíz de la aplicación */}
      <motion.div
        initial={{ opacity: 0 }} // Estado inicial
        animate={{ opacity: 1 }} // Estado final
        exit={{ opacity: 0 }} // Animación de salida
        transition={{ duration: 1 }} // Duración de la animación
      >
        <Scene /> {/* Aquí se renderiza tu escena */}
      </motion.div>
    </div>
  );
}

export default App;
