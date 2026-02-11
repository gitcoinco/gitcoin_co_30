"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ChladniBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // --- Configuration ---
    const CONFIG = {
      particleCount: 80000,
      gridSize: 128,
      settleStrength: 3.0,
      jitter: 0.06,
      drag: 0.9,
      speedLimit: 2.0,
      viewScale: 400,
      color: "#B8B4AC",
      particleSize: 2.0,
      particleOpacity: 0.4,

      modeCount: 3,
      mRange: { min: 3, max: 9 },
      nRange: { min: 3, max: 9 },

      fieldScale: 2,

      waveTypeA: "Cartesian",
      waveTypeB: "Web",
      waveMix: 0.5,
    };

    // --- Math Helpers ---
    const smoothstep = (t) => t * t * (3 - 2 * t);
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    // --- Wave Strategy Definitions ---
    const WAVE_FUNCTIONS = {
      Cartesian: (cx, cy, mode) => {
        const rx = cx * mode.cos - cy * mode.sin;
        const ry = cx * mode.sin + cy * mode.cos;
        return (
          Math.sin(mode.m * Math.PI * (rx + 0.5) + mode.px) *
          Math.sin(mode.n * Math.PI * (ry + 0.5) + mode.py)
        );
      },
      Gyroid: (cx, cy, mode) => {
        const scaleX = mode.m * 10;
        const scaleY = Math.max(0.5, mode.n) * 10;
        return (
          Math.sin(cx * scaleX) * Math.cos(cy * scaleY) +
          Math.sin(cy * scaleY) * Math.cos(mode.px)
        );
      },
      Web: (cx, cy, mode) => {
        const rx = cx * mode.cos - cy * mode.sin;
        const ry = cx * mode.sin + cy * mode.cos;
        const k = mode.m * Math.PI;
        // 3-axis interference creates a hexagonal/web lattice
        const v1 = rx;
        const v2 = -0.5 * rx + 0.866 * ry;
        const v3 = -0.5 * rx - 0.866 * ry;
        return (
          Math.sin(k * v1 + mode.px) +
          Math.sin(k * v2 + mode.py) +
          Math.sin(k * v3)
        );
      },
    };

    // --- Variables ---
    let scene, camera, renderer, geometry, points;
    let positions, velocities, colors;
    let energy, gradX, gradY;
    let modes = [];
    let animationFrameId;

    // --- Functions ---
    const getCanvasSize = () => {
      const el = mountRef.current;
      if (!el) return { width: window.innerWidth, height: window.innerHeight };
      return { width: el.clientWidth, height: el.clientHeight };
    };

    const getAspect = () => window.innerWidth / window.innerHeight;

    const allocateField = () => {
      const size = CONFIG.gridSize * CONFIG.gridSize;
      energy = new Float32Array(size);
      gradX = new Float32Array(size);
      gradY = new Float32Array(size);
    };

    const randomPointInShape = (randomFn = Math.random) => {
      const aspect = getAspect();
      const h = CONFIG.viewScale;
      const w = h * aspect;
      return [(randomFn() - 0.5) * 2 * w, (randomFn() - 0.5) * 2 * h];
    };

    const buildParticles = () => {
      geometry = new THREE.BufferGeometry();

      positions = new Float32Array(CONFIG.particleCount * 3);
      velocities = new Float32Array(CONFIG.particleCount * 2);
      colors = new Float32Array(CONFIG.particleCount * 3);

      const baseColor = new THREE.Color(CONFIG.color);
      const accentColor = new THREE.Color("#00B894");

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const [x, y] = randomPointInShape();
        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = 0;

        velocities[i * 2 + 0] = 0;
        velocities[i * 2 + 1] = 0;

        const c = Math.random() < 0.3 ? accentColor : baseColor;

        colors[i * 3 + 0] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    };

    const modeValueAt = (index, count, min, max, flip = false) => {
      if (count <= 1) return (min + max) * 0.5;
      const t = index / (count - 1);
      const u = flip ? 1 - t : t;
      return min + (max - min) * u;
    };

    const initModes = () => {
      modes = [];
      for (let i = 0; i < CONFIG.modeCount; i++) {
        const mRaw = modeValueAt(
          i,
          CONFIG.modeCount,
          CONFIG.mRange.min,
          CONFIG.mRange.max,
        );
        const nRaw = modeValueAt(
          i,
          CONFIG.modeCount,
          CONFIG.nRange.min,
          CONFIG.nRange.max,
          true,
        );
        modes.push({
          m: mRaw,
          n: nRaw,
          a: Math.exp(-i * 0.35),
          px: 0,
          py: 0,
          cos: 1,
          sin: 0,
        });
      }
      // Normalize
      let sum = 0;
      for (let i = 0; i < modes.length; i++) sum += Math.abs(modes[i].a);
      if (sum > 0) {
        const inv = 1 / sum;
        for (let i = 0; i < modes.length; i++) modes[i].a *= inv;
      }
    };

    const rebuildField = () => {
      const G = CONFIG.gridSize;
      const funcA =
        WAVE_FUNCTIONS[CONFIG.waveTypeA] || WAVE_FUNCTIONS["Cartesian"];
      const funcB =
        WAVE_FUNCTIONS[CONFIG.waveTypeB] || WAVE_FUNCTIONS["Cartesian"];
      const baseBias = CONFIG.waveMix - 0.5;
      const fieldScale = Math.max(0.05, CONFIG.fieldScale || 1);
      const maxR = Math.SQRT1_2 * fieldScale;

      for (let y = 0; y < G; y++) {
        for (let x = 0; x < G; x++) {
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

          for (let k = 0; k < modes.length; k++) {
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
      const maxDim = CONFIG.viewScale * Math.max(aspect, 1);
      const range = maxDim * 2;
      const cellSize = range / (G - 1);

      for (let y = 0; y < G; y++) {
        const y0 = Math.max(0, y - 1);
        const y1 = Math.min(G - 1, y + 1);

        for (let x = 0; x < G; x++) {
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
    };

    const updateParticles = () => {
      const G = CONFIG.gridSize;
      const range = CONFIG.viewScale;
      const pos = positions;
      const vel = velocities;
      const count = CONFIG.particleCount;

      const settle = CONFIG.settleStrength;
      const jitter = CONFIG.jitter;
      const drag = CONFIG.drag;
      const limit = CONFIG.speedLimit;

      const aspect = getAspect();
      const maxDim = range * Math.max(aspect, 1);
      const gridScale = (G - 1) / (maxDim * 2);
      const xLimit = range * aspect;
      const yLimit = range;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const i2 = i * 2;

        let x = pos[i3];
        let y = pos[i3 + 1];
        let vx = vel[i2];
        let vy = vel[i2 + 1];

        let inside = true;
        if (x < -xLimit || x > xLimit || y < -yLimit || y > yLimit)
          inside = false;

        if (!inside) {
          const respawn = randomPointInShape(Math.random);
          x = respawn[0];
          y = respawn[1];
          vx = 0;
          vy = 0;
        }

        let gx_pos = (x + maxDim) * gridScale;
        let gy_pos = (y + maxDim) * gridScale;

        gx_pos = Math.max(0, Math.min(G - 1.001, gx_pos));
        gy_pos = Math.max(0, Math.min(G - 1.001, gy_pos));

        const g_x0 = Math.floor(gx_pos);
        const g_y0 = Math.floor(gy_pos);
        const tx = gx_pos - g_x0;
        const ty = gy_pos - g_y0;

        const idx00 = g_y0 * G + g_x0;
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

        vx += (Math.random() - 0.5) * jitter;
        vy += (Math.random() - 0.5) * jitter;

        vx *= drag;
        vy *= drag;

        const speedSq = vx * vx + vy * vy;
        const speed = Math.sqrt(speedSq);

        if (Math.random() < 0.002) {
          const respawn = randomPointInShape(Math.random);
          x = respawn[0];
          y = respawn[1];
          vx = 0;
          vy = 0;
        }

        if (speed > limit) {
          const scale = limit / speed;
          vx *= scale;
          vy *= scale;
        }

        x += vx;
        y += vy;

        pos[i3] = x;
        pos[i3 + 1] = y;

        vel[i2] = vx;
        vel[i2 + 1] = vy;
      }

      geometry.attributes.position.needsUpdate = true;
    };

    const onWindowResize = () => {
      const aspect = getAspect();
      const { width, height } = getCanvasSize();
      const frustumSize = CONFIG.viewScale * 2;
      camera.left = (-frustumSize * aspect) / 2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      rebuildField();
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      updateParticles();
      renderer.render(scene, camera);
    };

    // --- Init Logic ---
    let retryFrame;
    const init = () => {
      const { width, height } = getCanvasSize();
      // During client-side navigation the container may not be laid out yet
      if (width === 0 || height === 0) {
        retryFrame = requestAnimationFrame(init);
        return;
      }

      scene = new THREE.Scene();
      const aspect = getAspect();
      const frustumSize = CONFIG.viewScale * 2;

      camera = new THREE.OrthographicCamera(
        (-frustumSize * aspect) / 2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        -frustumSize / 2,
        1,
        3000,
      );
      camera.position.set(0, 0, 500);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      allocateField();
      buildParticles();
      initModes();
      rebuildField();

      const sprite = new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/sprites/disc.png",
      );

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        vertexColors: true,
        size: CONFIG.particleSize,
        map: sprite,
        alphaTest: 0.0,
        transparent: true,
        opacity: CONFIG.particleOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: false,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      window.addEventListener("resize", onWindowResize);
      animate();
    };

    init();

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(retryFrame);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ChladniBackground;
