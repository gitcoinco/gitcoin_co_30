"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type WaveFunctionName =
  | "Cartesian"
  | "Web"
  | "Radial"
  | "Spiral"
  | "Flower"
  | "Diamond"
  | "Stripes"
  | "CurvedStripes";

type ImpactFieldConfig = {
  particleCount: number;
  gridSize: number;
  settleStrength: number;
  jitter: number;
  drag: number;
  speedLimit: number;
  viewScale: number;
  color: string;
  particleSize: number;
  particleOpacity: number;
  modeCount: number;
  mRange: { min: number; max: number };
  nRange: { min: number; max: number };
  phaseJitter: number;
  fieldScale: number;
  waveTypeA: WaveFunctionName;
  waveTypeB: WaveFunctionName;
  waveMix: number;
};

const IMPACT_FIELD_PRESETS = {
  numbers: {
    particleCount: 10000,
    gridSize: 32,
    settleStrength: 5.0,
    jitter: 0.1,
    drag: 0.85,
    speedLimit: 3.0,
    viewScale: 100,
    color: "#9900ff",
    particleSize: 3.0,
    particleOpacity: 0.6,
    modeCount: 1,
    mRange: { min: 2, max: 12 },
    nRange: { min: 2, max: 12 },
    phaseJitter: 0.5,
    fieldScale: 0.8,
    waveTypeA: "CurvedStripes",
    waveTypeB: "Cartesian",
    waveMix: 0.5,
  },
  hero: {
    particleCount: 50000,
    gridSize: 32,
    settleStrength: 6.0,
    jitter: 0.5,
    drag: 0.85,
    speedLimit: 3.0,
    viewScale: 200,
    color: "#725CDF",
    particleSize: 3.0,
    particleOpacity: 0.8,
    modeCount: 1,
    mRange: { min: 2, max: 12 },
    nRange: { min: 2, max: 12 },
    phaseJitter: 0.3,
    fieldScale: 1.0,
    waveTypeA: "Web",
    waveTypeB: "Cartesian",
    waveMix: 0.7,
  },
} satisfies Record<"numbers" | "hero", ImpactFieldConfig>;

type Mode = {
  m: number;
  n: number;
  a: number;
  px: number;
  py: number;
  cos: number;
  sin: number;
};

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
const POINTER_PULL_RADIUS = 100;
const POINTER_PULL_STRENGTH = 1.25;

const WAVE_FUNCTIONS = {
  Cartesian: (cx: number, cy: number, mode: Mode) => {
    const rx = cx * mode.cos - cy * mode.sin;
    const ry = cx * mode.sin + cy * mode.cos;
    return (
      Math.sin(mode.m * Math.PI * (rx + 0.5) + mode.px) *
      Math.sin(mode.n * Math.PI * (ry + 0.5) + mode.py)
    );
  },
  Web: (cx: number, cy: number, mode: Mode) => {
    const rx = cx * mode.cos - cy * mode.sin;
    const ry = cx * mode.sin + cy * mode.cos;
    const k = mode.m * Math.PI;
    const v1 = rx;
    const v2 = -0.5 * rx + 0.866 * ry;
    const v3 = -0.5 * rx - 0.866 * ry;
    return (
      Math.sin(k * v1 + mode.px) + Math.sin(k * v2 + mode.py) + Math.sin(k * v3)
    );
  },
  Radial: (cx: number, cy: number, mode: Mode) => {
    const rx = cx * mode.cos - cy * mode.sin;
    const ry = cx * mode.sin + cy * mode.cos;
    const r = Math.sqrt(rx * rx + ry * ry);
    return (
      Math.sin(mode.m * Math.PI * r + mode.px) *
      Math.sin(mode.n * Math.PI * r + mode.py)
    );
  },
  Spiral: (cx: number, cy: number, mode: Mode) => {
    const rx = cx * mode.cos - cy * mode.sin;
    const ry = cx * mode.sin + cy * mode.cos;
    const r = Math.sqrt(rx * rx + ry * ry);
    const theta = Math.atan2(ry, rx);
    return Math.sin(mode.m * theta + mode.n * Math.PI * r + mode.px + mode.py);
  },
  Flower: (cx: number, cy: number, mode: Mode) => {
    const rx = cx * mode.cos - cy * mode.sin;
    const ry = cx * mode.sin + cy * mode.cos;
    const r = Math.sqrt(rx * rx + ry * ry);
    const theta = Math.atan2(ry, rx);
    return (
      Math.sin(mode.m * theta + mode.px) *
      Math.cos(mode.n * Math.PI * r + mode.py)
    );
  },
  Diamond: (cx: number, cy: number, mode: Mode) => {
    const rx = cx * mode.cos - cy * mode.sin;
    const ry = cx * mode.sin + cy * mode.cos;
    const u = (rx + ry) * Math.SQRT1_2;
    const v = (rx - ry) * Math.SQRT1_2;
    return (
      Math.sin(mode.m * Math.PI * (u + 0.5) + mode.px) *
      Math.sin(mode.n * Math.PI * (v + 0.5) + mode.py)
    );
  },
  Stripes: (cx: number, cy: number, mode: Mode) => {
    const rx = cx * mode.cos - cy * mode.sin;
    return Math.sin(mode.m * Math.PI * rx + mode.px);
  },
  CurvedStripes: (cx: number, cy: number, mode: Mode) => {
    const rx = cx * mode.cos - cy * mode.sin;
    const ry = cx * mode.sin + cy * mode.cos;
    const warpedX = rx + 0.45 * Math.sin(mode.n * Math.PI * ry + mode.py);
    return Math.sin(mode.m * Math.PI * warpedX + mode.px);
  },
};

function createSpriteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function ImpactNumbersField({
  className = "",
  variant = "numbers",
}: {
  className?: string;
  variant?: keyof typeof IMPACT_FIELD_PRESETS;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = IMPACT_FIELD_PRESETS[variant];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerEl = container;
    const parentEl = containerEl.parentElement;
    const interactionEl = parentEl
      ? parentEl.childElementCount > 1
        ? parentEl
        : (parentEl.parentElement ?? parentEl)
      : containerEl;

    let scene!: THREE.Scene;
    let camera!: THREE.OrthographicCamera;
    let renderer!: THREE.WebGLRenderer;
    let geometry!: THREE.BufferGeometry;
    let material!: THREE.PointsMaterial;
    let spriteTexture!: THREE.Texture;
    let positions!: Float32Array;
    let velocities!: Float32Array;
    let colors!: Float32Array;
    let energy!: Float32Array;
    let gradX!: Float32Array;
    let gradY!: Float32Array;
    let modes: Mode[] = [];
    let frameId = 0;
    let disposed = false;

    const size = { width: 1, height: 1 };
    const pointer = { active: false, x: 0, y: 0 };

    function getAspect() {
      return size.width / Math.max(size.height, 1);
    }

    function randomPointInShape(randomFn = Math.random) {
      const h = config.viewScale;
      const w = h * getAspect();
      return [(randomFn() - 0.5) * 2 * w, (randomFn() - 0.5) * 2 * h];
    }

    function modeValueAt(
      index: number,
      count: number,
      min: number,
      max: number,
      flip = false,
    ) {
      if (count <= 1) return (min + max) * 0.5;
      const t = index / (count - 1);
      const u = flip ? 1 - t : t;
      return min + (max - min) * u;
    }

    function normalizeModeAmplitudes() {
      let sum = 0;
      for (let i = 0; i < modes.length; i += 1) sum += Math.abs(modes[i].a);
      if (sum <= 0) return;
      const inv = 1 / sum;
      for (let i = 0; i < modes.length; i += 1) modes[i].a *= inv;
    }

    function initModes() {
      modes = [];
      const phaseJitter = Math.max(0, config.phaseJitter || 0);

      for (let i = 0; i < config.modeCount; i += 1) {
        const mRaw = modeValueAt(
          i,
          config.modeCount,
          config.mRange.min,
          config.mRange.max,
        );
        const nRaw = modeValueAt(
          i,
          config.modeCount,
          config.nRange.min,
          config.nRange.max,
          true,
        );
        const m = Math.max(0.25, mRaw);
        const n = Math.max(0.25, nRaw);
        const theta = 0;

        modes.push({
          m,
          n,
          a: Math.exp(-i * 0.35),
          px: (Math.random() * 2 - 1) * Math.PI * phaseJitter,
          py: (Math.random() * 2 - 1) * Math.PI * phaseJitter,
          cos: Math.cos(theta),
          sin: Math.sin(theta),
        });
      }

      normalizeModeAmplitudes();
    }

    function allocateField() {
      const fieldSize = config.gridSize * config.gridSize;
      energy = new Float32Array(fieldSize);
      gradX = new Float32Array(fieldSize);
      gradY = new Float32Array(fieldSize);
    }

    function buildParticles() {
      geometry = new THREE.BufferGeometry();
      positions = new Float32Array(config.particleCount * 3);
      velocities = new Float32Array(config.particleCount * 2);
      colors = new Float32Array(config.particleCount * 3);

      const baseColor = new THREE.Color(config.color);
      const accentColor = new THREE.Color("#00B894");

      for (let i = 0; i < config.particleCount; i += 1) {
        const [x, y] = randomPointInShape();
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = 0;

        velocities[i * 2] = 0;
        velocities[i * 2 + 1] = 0;

        const color = Math.random() < 0.5 ? accentColor : baseColor;
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    }

    function rebuildField() {
      const G = config.gridSize;
      const funcA =
        WAVE_FUNCTIONS[config.waveTypeA as keyof typeof WAVE_FUNCTIONS] ??
        WAVE_FUNCTIONS.Cartesian;
      const funcB =
        WAVE_FUNCTIONS[config.waveTypeB as keyof typeof WAVE_FUNCTIONS] ??
        WAVE_FUNCTIONS.Cartesian;
      const baseBias = config.waveMix - 0.5;
      const fieldScale = Math.max(0.05, config.fieldScale || 1);
      const maxR = Math.SQRT1_2 * fieldScale;

      for (let y = 0; y < G; y += 1) {
        for (let x = 0; x < G; x += 1) {
          const tx = x / (G - 1);
          const ty = y / (G - 1);
          const cx = (tx - 0.5) * fieldScale;
          const cy = (ty - 0.5) * fieldScale;

          const idx = y * G + x;
          let phi = 0;
          const r = Math.sqrt(cx * cx + cy * cy);
          const rn = clamp(r / maxR, 0, 1);
          const mixed = rn + baseBias;
          const spatialMix = smoothstep(clamp(mixed, 0, 1));

          for (let k = 0; k < modes.length; k += 1) {
            const mode = modes[k];
            const wa = Math.tanh(funcA(cx, cy, mode));
            const wb = Math.tanh(funcB(cx, cy, mode));
            const wave = wa * (1 - spatialMix) + wb * spatialMix;
            phi += mode.a * wave;
          }

          energy[idx] = phi * phi;
        }
      }

      const aspect = getAspect();
      const maxDim = config.viewScale * Math.max(aspect, 1);
      const range = maxDim * 2;
      const cellSize = range / (G - 1);

      for (let y = 0; y < G; y += 1) {
        const y0 = Math.max(0, y - 1);
        const y1 = Math.min(G - 1, y + 1);

        for (let x = 0; x < G; x += 1) {
          const x0 = Math.max(0, x - 1);
          const x1 = Math.min(G - 1, x + 1);
          const idx = y * G + x;

          const eL = energy[y * G + x0];
          const eR = energy[y * G + x1];
          const eU = energy[y0 * G + x];
          const eD = energy[y1 * G + x];

          gradX[idx] = (eR - eL) / (2 * cellSize);
          gradY[idx] = (eD - eU) / (2 * cellSize);
        }
      }
    }

    function updateParticles() {
      const G = config.gridSize;
      const range = config.viewScale;
      const settle = config.settleStrength;
      const jitter = config.jitter;
      const drag = config.drag;
      const limit = config.speedLimit;
      const aspect = getAspect();
      const maxDim = range * Math.max(aspect, 1);
      const gridScale = (G - 1) / (maxDim * 2);
      const xLimit = range * aspect;
      const yLimit = range;
      const pointerRadiusSq = POINTER_PULL_RADIUS * POINTER_PULL_RADIUS;

      for (let i = 0; i < config.particleCount; i += 1) {
        const i3 = i * 3;
        const i2 = i * 2;

        let x = positions[i3];
        let y = positions[i3 + 1];
        let vx = velocities[i2];
        let vy = velocities[i2 + 1];

        if (x < -xLimit || x > xLimit || y < -yLimit || y > yLimit) {
          const respawn = randomPointInShape(Math.random);
          x = respawn[0];
          y = respawn[1];
          vx = 0;
          vy = 0;
        }

        let gxPos = (x + maxDim) * gridScale;
        let gyPos = (y + maxDim) * gridScale;

        gxPos = Math.max(0, Math.min(G - 1.001, gxPos));
        gyPos = Math.max(0, Math.min(G - 1.001, gyPos));

        const gX0 = Math.floor(gxPos);
        const gY0 = Math.floor(gyPos);
        const tx = gxPos - gX0;
        const ty = gyPos - gY0;

        const idx00 = gY0 * G + gX0;
        const idx10 = idx00 + 1;
        const idx01 = idx00 + G;
        const idx11 = idx01 + 1;

        const gxVal =
          (gradX[idx00] * (1 - tx) + gradX[idx10] * tx) * (1 - ty) +
          (gradX[idx01] * (1 - tx) + gradX[idx11] * tx) * ty;

        const gyVal =
          (gradY[idx00] * (1 - tx) + gradY[idx10] * tx) * (1 - ty) +
          (gradY[idx01] * (1 - tx) + gradY[idx11] * tx) * ty;

        vx -= gxVal * settle;
        vy -= gyVal * settle;

        if (pointer.active) {
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < pointerRadiusSq) {
            const distance = Math.sqrt(distanceSq) || 1;
            const falloff = 1 - distance / POINTER_PULL_RADIUS;
            const pointerForce = POINTER_PULL_STRENGTH * falloff;
            vx += (dx / distance) * pointerForce;
            vy += (dy / distance) * pointerForce;
          }
        }

        vx += (Math.random() - 0.5) * jitter;
        vy += (Math.random() - 0.5) * jitter;
        vx *= drag;
        vy *= drag;

        if (Math.random() < 0.002) {
          const respawn = randomPointInShape(Math.random);
          x = respawn[0];
          y = respawn[1];
          vx = 0;
          vy = 0;
        }

        const speedSq = vx * vx + vy * vy;
        const speed = Math.sqrt(speedSq);
        if (speed > limit) {
          const scale = limit / speed;
          vx *= scale;
          vy *= scale;
        }

        x += vx;
        y += vy;

        positions[i3] = x;
        positions[i3 + 1] = y;
        velocities[i2] = vx;
        velocities[i2 + 1] = vy;
      }

      const positionAttribute = geometry.getAttribute("position");
      positionAttribute.needsUpdate = true;
    }

    function setSize() {
      const nextWidth = Math.max(containerEl.clientWidth, 1);
      const nextHeight = Math.max(containerEl.clientHeight, 1);

      if (nextWidth === size.width && nextHeight === size.height) return;

      size.width = nextWidth;
      size.height = nextHeight;

      const aspect = getAspect();
      const frustumSize = config.viewScale * 2;

      camera.left = (-frustumSize * aspect) / 2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(size.width, size.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rebuildField();
    }

    function updatePointerPosition(event: PointerEvent) {
      const rect = containerEl.getBoundingClientRect();

      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        pointer.active = false;
        return;
      }

      const normalizedX = (event.clientX - rect.left) / Math.max(rect.width, 1);
      const normalizedY = (event.clientY - rect.top) / Math.max(rect.height, 1);
      const aspect = getAspect();

      pointer.x = (normalizedX - 0.5) * config.viewScale * 2 * aspect;
      pointer.y = (0.5 - normalizedY) * config.viewScale * 2;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function animate() {
      if (disposed) return;
      frameId = requestAnimationFrame(animate);
      updateParticles();
      renderer.render(scene, camera);
    }

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 3000);
    camera.position.set(0, 0, 500);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    containerEl.appendChild(renderer.domElement);

    allocateField();
    initModes();
    setSize();
    buildParticles();

    spriteTexture = createSpriteTexture();
    material = new THREE.PointsMaterial({
      color: 0xffffff,
      vertexColors: true,
      size: config.particleSize,
      map: spriteTexture,
      alphaTest: 0,
      transparent: true,
      opacity: config.particleOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: false,
    });

    scene.add(new THREE.Points(geometry, material));
    const resizeObserver = new ResizeObserver(() => {
      setSize();
    });
    resizeObserver.observe(containerEl);
    interactionEl.addEventListener("pointermove", updatePointerPosition);
    interactionEl.addEventListener("pointerenter", updatePointerPosition);
    interactionEl.addEventListener("pointerleave", handlePointerLeave);

    animate();

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      interactionEl.removeEventListener("pointermove", updatePointerPosition);
      interactionEl.removeEventListener("pointerenter", updatePointerPosition);
      interactionEl.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();
      containerEl.removeChild(renderer.domElement);
    };
  }, [config]);

  return <div ref={containerRef} className={className} />;
}
