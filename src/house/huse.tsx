import  { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Plane } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion"; 

// Componente para lluvia
const Rain = () => {
  const rainRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (rainRef.current) {
      rainRef.current.position.y -= 0.2;
      if (rainRef.current.position.y < -10) rainRef.current.position.y = 10;
    }
  });

  const rainGeometry = new THREE.BufferGeometry();
  const rainPositions = [];

  for (let i = 0; i < 5000; i++) {
    rainPositions.push(
      (Math.random() - 0.5) * 50,
      Math.random() * 20,
      (Math.random() - 0.5) * 50
    );
  }

  rainGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(rainPositions, 3)
  );

  return (
    <points ref={rainRef} geometry={rainGeometry}>
      <pointsMaterial color="#a9c9ff" size={0.1} transparent opacity={0.6} />
    </points>
  );
};

// Componente para la casa
const ChineseHouse = ({ onClick }: { onClick: () => void }) => {
  const { scene } = useGLTF("/models/store/scene.gltf");

  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} onClick={onClick} />;
};

// Menú que aparece al hacer clic en la casa (Usando Framer Motion para animaciones)
const Menu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        top: "50px",
        right: "50px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "10px",
        borderRadius: "8px",
        zIndex: 1, // Aseguramos que el menú esté por encima de la escena 3D
      }}
    >
      <motion.button
        style={buttonStyle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Login
      </motion.button>
      <motion.button
        style={buttonStyle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Shop
      </motion.button>
      <motion.button
        style={buttonStyle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Soporte
      </motion.button>
    </motion.div>
  );
};

const buttonStyle = {
  backgroundColor: "transparent",
  color: "white",
  border: "none",
  marginBottom: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "4px",
};

// Scene principal
const Scene = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Función para manejar el clic en la casa y mostrar el menú
  const handleHouseClick = () => {
    setShowMenu(true);  // Muestra el menú
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* Scene 3D */}
      <Canvas
        camera={{ position: [5, 5, 10], fov: 50 }}
        style={{ height: "100%", width: "100%" }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Fondo oscuro */}
        <color attach="background" args={["#000000"]} />

        {/* Luz ambiental sutil */}
        <ambientLight intensity={1.0} />

        {/* Luces de neón intensas con colores y rebote en el suelo */}
        <spotLight position={[50, 50, 50]} color="#ff00ff" intensity={50} angle={0.3} penumbra={0.5} castShadow />
        <spotLight position={[-5, 5, 5]} color="#00ffff" intensity={20} angle={0.3} penumbra={0.5} castShadow />

        {/* Luz adicional para resaltar detalles de la tienda */}
        <pointLight position={[180, 180, 180]} intensity={1} color="#ffffff" />

        {/* Fog para atmósfera */}
        <fog attach="fog" args={["#000000", 10, 30]} />

        {/* Suelo reflectante para el efecto de rebote de las luces */}
        <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} args={[50, 50]}>
          <meshStandardMaterial
            color="#111111"
            roughness={0.4}
            metalness={0.8}
          />
        </Plane>

        {/* Renderizar la casa con el evento de clic */}
        <ChineseHouse onClick={handleHouseClick} />
        <Rain />

        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2.5} />
      </Canvas>

      {/* Mostrar el menú si se ha clickeado en la casa */}
      {showMenu && <Menu />}
    </div>
  );
};

export default Scene;
