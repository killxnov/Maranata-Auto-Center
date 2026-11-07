"use client";
import { Canvas } from "@react-three/fiber";
import { WheelModel } from "./WheelModel";
export default function WheelCanvas({
  active,
  onFailure,
}: {
  active: boolean;
  onFailure: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 38 }}
      dpr={[1, 1.25]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFailure, { once: true });
      }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={4} color="#dbeafe" />
      <directionalLight position={[-3, 1, 2]} intensity={2} color="#799dbd" />
      <WheelModel />
    </Canvas>
  );
}
