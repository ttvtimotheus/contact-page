"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PillSceneProps {
  className?: string;
}

export function PillScene({ className }: PillSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    pill?: THREE.Group;
    animationId?: number;
    mouse?: { x: number; y: number };
    targetRotation?: { x: number; y: number };
  }>({});
  const [webglSupported, setWebglSupported] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Defer initialization slightly for better FCP
    const initTimer = setTimeout(() => {
      initScene();
    }, 100);

    return () => {
      clearTimeout(initTimer);
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const initScene = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;
    
    // Add fog for depth
    scene.fog = new THREE.Fog(0x000000, 5, 15);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    // Renderer with capped pixel ratio
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Create pill
    const pill = createPill();
    scene.add(pill);

    // Lighting setup - softer, more diffuse lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xaaccff, 1.2);
    rimLight.position.set(-3, 2, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-2, -3, 3);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Add hemisphere light for better overall illumination
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcccccc, 0.8);
    scene.add(hemiLight);

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      pill,
      mouse: { x: 0, y: 0 },
      targetRotation: { x: 0, y: 0 },
    };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current.camera || !sceneRef.current.renderer) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      sceneRef.current.camera.aspect = newWidth / newHeight;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Mouse move with damping
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !sceneRef.current.mouse) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      sceneRef.current.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      sceneRef.current.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // GSAP scroll trigger (light parallax)
    gsap.to(pill.position, {
      y: -0.3,
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Animation loop
    const animate = () => {
      if (!sceneRef.current.pill || !sceneRef.current.camera || !sceneRef.current.renderer || !sceneRef.current.scene) return;

      if (isVisible) {
        // Slow base rotation
        sceneRef.current.pill.rotation.y += 0.002;

        // Mouse follow with damping
        if (sceneRef.current.mouse && sceneRef.current.targetRotation) {
          sceneRef.current.targetRotation.x = sceneRef.current.mouse.y * 0.2;
          sceneRef.current.targetRotation.y = sceneRef.current.mouse.x * 0.2;

          sceneRef.current.pill.rotation.x += (sceneRef.current.targetRotation.x - sceneRef.current.pill.rotation.x) * 0.05;
          sceneRef.current.pill.rotation.y += (sceneRef.current.targetRotation.y - sceneRef.current.pill.rotation.y) * 0.05;
        }

        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      }

      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  };

  const createPill = (): THREE.Group => {
    const group = new THREE.Group();

    // Capsule geometry (two hemispheres + cylinder)
    const radius = 0.6;
    const height = 1.8;

    // Top hemisphere (Light cyan/blue)
    const topGeometry = new THREE.SphereGeometry(radius, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const topMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x7dd3fc, // Light cyan
      metalness: 0.0,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.8,
    });
    const topHemisphere = new THREE.Mesh(topGeometry, topMaterial);
    topHemisphere.position.y = height / 2;
    group.add(topHemisphere);

    // Bottom hemisphere (Darker teal)
    const bottomGeometry = new THREE.SphereGeometry(radius, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const bottomMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4, // Darker cyan/teal
      metalness: 0.0,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.8,
    });
    const bottomHemisphere = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottomHemisphere.position.y = -height / 2;
    group.add(bottomHemisphere);

    // Top cylinder (Light cyan)
    const topCylinderGeometry = new THREE.CylinderGeometry(radius, radius, height / 2, 64);
    const topCylinder = new THREE.Mesh(topCylinderGeometry, topMaterial);
    topCylinder.position.y = height / 4;
    group.add(topCylinder);

    // Bottom cylinder (Darker teal)
    const bottomCylinderGeometry = new THREE.CylinderGeometry(radius, radius, height / 2, 64);
    const bottomCylinder = new THREE.Mesh(bottomCylinderGeometry, bottomMaterial);
    bottomCylinder.position.y = -height / 4;
    group.add(bottomCylinder);

    // Seam line (subtle)
    const seamGeometry = new THREE.TorusGeometry(radius, 0.008, 16, 100);
    const seamMaterial = new THREE.MeshStandardMaterial({
      color: 0x0891b2,
      metalness: 0.3,
      roughness: 0.4,
    });
    const seam = new THREE.Mesh(seamGeometry, seamMaterial);
    seam.rotation.x = Math.PI / 2;
    group.add(seam);

    return group;
  };

  const cleanup = () => {
    if (sceneRef.current.animationId) {
      cancelAnimationFrame(sceneRef.current.animationId);
    }

    if (sceneRef.current.renderer) {
      sceneRef.current.renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(sceneRef.current.renderer.domElement);
      }
    }

    if (sceneRef.current.scene) {
      sceneRef.current.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
  };

  if (!webglSupported) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-600 opacity-50" />
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}
