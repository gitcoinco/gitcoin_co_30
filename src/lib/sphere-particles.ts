import * as THREE from "three";

export type FlowPath = {
  id: string;
  sourceId: string;
  targetId: string;
  color: THREE.Color;
  points: Float32Array;
  cumulativeLengths: Float32Array;
  totalLength: number;
};

export type FlowParticleCloud = {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  alphas: Float32Array;
  baseAlphas: Float32Array;
  pathIndex: Uint32Array;
  phase: Float32Array;
  speed: Float32Array;
  jitter: Float32Array;
  twinklePhase: Float32Array;
};

export type FlowParticleOptions = {
  particleCount: number;
  minSize: number;
  maxSize: number;
  minSpeed: number;
  maxSpeed: number;
  baseAlpha: number;
  alphaJitter: number;
  jitterRadius: number;
  seed?: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hashStringToUint32(text: string): number {
  let hash = 2166136261 >>> 0;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function samplePolylinePoint(path: FlowPath, t: number, target: THREE.Vector3): THREE.Vector3 {
  const clampedT = ((t % 1) + 1) % 1;
  const targetDistance = clampedT * path.totalLength;
  const cumulative = path.cumulativeLengths;
  const pointCount = cumulative.length;

  let hi = pointCount - 1;
  let lo = 0;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cumulative[mid] < targetDistance) lo = mid + 1;
    else hi = mid;
  }
  const upperIndex = Math.max(1, lo);
  const lowerIndex = upperIndex - 1;

  const lowerDistance = cumulative[lowerIndex];
  const upperDistance = cumulative[upperIndex];
  const segmentLength = Math.max(1e-6, upperDistance - lowerDistance);
  const alpha = clamp((targetDistance - lowerDistance) / segmentLength, 0, 1);

  const px = lowerIndex * 3;
  const qx = upperIndex * 3;

  target.set(
    path.points[px] + (path.points[qx] - path.points[px]) * alpha,
    path.points[px + 1] + (path.points[qx + 1] - path.points[px + 1]) * alpha,
    path.points[px + 2] + (path.points[qx + 2] - path.points[px + 2]) * alpha,
  );
  return target;
}

export function createFlowPath(
  id: string,
  sourceId: string,
  targetId: string,
  color: THREE.Color,
  points: THREE.Vector3[],
): FlowPath | null {
  if (points.length < 2) return null;

  const pathPoints = new Float32Array(points.length * 3);
  for (let i = 0; i < points.length; i += 1) {
    pathPoints[i * 3] = points[i].x;
    pathPoints[i * 3 + 1] = points[i].y;
    pathPoints[i * 3 + 2] = points[i].z;
  }

  const cumulative = new Float32Array(points.length);
  let totalLength = 0;
  cumulative[0] = 0;
  for (let i = 1; i < points.length; i += 1) {
    totalLength += points[i - 1].distanceTo(points[i]);
    cumulative[i] = totalLength;
  }

  if (totalLength < 1e-6) return null;

  return {
    id,
    sourceId,
    targetId,
    color,
    points: pathPoints,
    cumulativeLengths: cumulative,
    totalLength,
  };
}

export function createFlowParticleCloud(
  paths: FlowPath[],
  options: FlowParticleOptions,
): FlowParticleCloud {
  const count = Math.max(0, Math.floor(options.particleCount));
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const baseAlphas = new Float32Array(count);
  const pathIndex = new Uint32Array(count);
  const phase = new Float32Array(count);
  const speed = new Float32Array(count);
  const jitter = new Float32Array(count * 3);
  const twinklePhase = new Float32Array(count);

  const seed = options.seed ?? hashStringToUint32(`flow:${paths.length}:${count}`);
  const rng = createSeededRandom(seed);
  const scratch = new THREE.Vector3();

  for (let i = 0; i < count; i += 1) {
    const pickedPath = Math.floor(rng() * paths.length);
    const path = paths[Math.min(paths.length - 1, pickedPath)];

    pathIndex[i] = Math.min(paths.length - 1, pickedPath);
    phase[i] = rng();
    speed[i] = options.minSpeed + (options.maxSpeed - options.minSpeed) * rng();
    twinklePhase[i] = rng() * Math.PI * 2;

    const size = options.minSize + (options.maxSize - options.minSize) * rng();
    sizes[i] = size;

    const alpha =
      options.baseAlpha *
      clamp(1 - options.alphaJitter + options.alphaJitter * 2 * rng(), 0.08, 1.0);
    baseAlphas[i] = alpha;
    alphas[i] = alpha;

    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(1 - 2 * rng());
    const radius = options.jitterRadius * Math.pow(rng(), 0.6);
    const jx = Math.sin(phi) * Math.cos(theta) * radius;
    const jy = Math.sin(phi) * Math.sin(theta) * radius;
    const jz = Math.cos(phi) * radius;
    jitter[i * 3] = jx;
    jitter[i * 3 + 1] = jy;
    jitter[i * 3 + 2] = jz;

    samplePolylinePoint(path, phase[i], scratch);
    positions[i * 3] = scratch.x + jx;
    positions[i * 3 + 1] = scratch.y + jy;
    positions[i * 3 + 2] = scratch.z + jz;

    colors[i * 3] = path.color.r;
    colors[i * 3 + 1] = path.color.g;
    colors[i * 3 + 2] = path.color.b;
  }

  return {
    positions,
    colors,
    sizes,
    alphas,
    baseAlphas,
    pathIndex,
    phase,
    speed,
    jitter,
    twinklePhase,
  };
}

export function updateFlowParticleCloud(
  paths: FlowPath[],
  cloud: FlowParticleCloud,
  elapsedSeconds: number,
): void {
  const scratch = new THREE.Vector3();
  const count = cloud.phase.length;

  for (let i = 0; i < count; i += 1) {
    const path = paths[cloud.pathIndex[i]];
    const t = cloud.phase[i] + elapsedSeconds * cloud.speed[i];
    samplePolylinePoint(path, t, scratch);

    const jx = cloud.jitter[i * 3];
    const jy = cloud.jitter[i * 3 + 1];
    const jz = cloud.jitter[i * 3 + 2];
    cloud.positions[i * 3] = scratch.x + jx;
    cloud.positions[i * 3 + 1] = scratch.y + jy;
    cloud.positions[i * 3 + 2] = scratch.z + jz;

    const twinkle = 0.76 + 0.24 * Math.sin(elapsedSeconds * 2.4 + cloud.twinklePhase[i]);
    cloud.alphas[i] = cloud.baseAlphas[i] * twinkle;
  }
}
