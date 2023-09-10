import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, SpotLight, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Computers = ({isMobile}) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');
  return (
    <mesh>
      <hemisphereLight intensity={1.7} groundColor="black" />
      <pointLight intensity={1} />
      {/* Spotlight not working */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object = {computer.scene} 
        scale = {isMobile ? 0.6 :0.75}
        position = {isMobile ? [0, -2.7, -2.2] :[0, -3.75, -1.5]}
        rotation = {[-0.01, -0.4, -0.1]}
      />
    </mesh>
  )
}

const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Checking if we are on a mobile device
  useEffect (() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  },[])

  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{position: [20, 3, 5], fov:30 }}
      gl={{preserveDrawingBuffer: true}}
    >
      {/* Suspense is lika a loader when our canvas is loading, its from react itslef not 3js */}
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls 
          // Makes it such that it roates only on a specific angle
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputerCanvas;