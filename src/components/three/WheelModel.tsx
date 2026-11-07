"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import type { Group } from "three";

// Modelo procedural: nenhuma dependência de GLB, HDR ou texturas externas.
export function WheelModel() {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      -0.35 + pointer.x * 0.28,
      3,
      delta,
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      0.1 - pointer.y * 0.14,
      3,
      delta,
    );
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.22) * 0.08;
  });
  return (
    <group ref={group} rotation={[0.1, -0.35, 0]}>
      <mesh>
        <torusGeometry args={[1.12, 0.25, 20, 64]} />
        <meshStandardMaterial color="#171c23" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <torusGeometry args={[0.86, 0.065, 12, 64]} />
        <meshStandardMaterial color="#bac8d6" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.81, 0.81, 0.09, 48]} />
        <meshStandardMaterial color="#758392" metalness={0.8} roughness={0.45} />
      </mesh>
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh position={[0, 0.45, 0.17]} rotation={[0, 0, -0.12]}>
              <boxGeometry args={[0.11, 0.8, 0.12]} />
              <meshStandardMaterial color="#c8d4df" metalness={0.9} roughness={0.18} />
            </mesh>
            <mesh position={[0.1, 0.45, 0.17]} rotation={[0, 0, 0.12]}>
              <boxGeometry args={[0.07, 0.74, 0.1]} />
              <meshStandardMaterial color="#9aaabb" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, 0, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.14, 32]} />
        <meshStandardMaterial color="#b62f36" metalness={0.4} roughness={0.25} />
      </mesh>
      <mesh position={[0.58, 0.05, 0.08]}>
        <boxGeometry args={[0.17, 0.5, 0.16]} />
        <meshStandardMaterial color="#b62f36" roughness={0.4} />
      </mesh>
    </group>
  );
}
