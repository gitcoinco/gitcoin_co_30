"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  createFlowParticleCloud,
  createFlowPath,
  updateFlowParticleCloud,
  type FlowPath,
} from "@/lib/sphere-particles";

type EcosystemCategory =
  | "apps"
  | "mechanisms"
  | "research"
  | "case-studies"
  | "campaigns";

type PositionedNode = {
  id: string;
  name: string;
  category: EcosystemCategory;
  degree: number;
  href: string;
  x: number;
  y: number;
  radius: number;
};

type EcosystemEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  kinds: ("explicit" | "internal-link" | "tag-overlap")[];
  weight: number;
};

interface EcosystemSphereMapProps {
  nodes: PositionedNode[];
  edges: EcosystemEdge[];
  width: number;
  height: number;
  categoryColors: Record<EcosystemCategory, string>;
}

const SPHERE_RADIUS = 210;
const MAX_ARC_LIFT_FACTOR = 0.50;
const MAX_NODE_RADIUS = 7;
const CONTENT_RADIUS =
  SPHERE_RADIUS * (1 + MAX_ARC_LIFT_FACTOR) + MAX_NODE_RADIUS;
const VIEWPORT_ASPECT = 16 / 9;
const ARC_IDLE_OPACITY = 0.05;
const ARC_ACTIVE_OPACITY = 0.9;
const CLICK_DRAG_THRESHOLD = 4;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function projectToSphere(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): THREE.Vector3 {
  const lon = (x / width) * Math.PI * 2 - Math.PI;
  const lat = (0.5 - y / height) * Math.PI;
  const cosLat = Math.cos(lat);
  return new THREE.Vector3(
    radius * cosLat * Math.cos(lon),
    radius * Math.sin(lat),
    radius * cosLat * Math.sin(lon),
  );
}

function edgeColor(edge: EcosystemEdge): THREE.Color {
  if (edge.kinds.includes("explicit")) return new THREE.Color("#ffed75");
  if (edge.kinds.includes("internal-link")) return new THREE.Color("#ffed75");
  return new THREE.Color("#ffed75");
}

function slerpUnitVectors(
  from: THREE.Vector3,
  to: THREE.Vector3,
  t: number,
): THREE.Vector3 {
  const dot = clamp(from.dot(to), -1, 1);
  if (dot > 0.9995) {
    return from.clone().lerp(to, t).normalize();
  }
  const theta = Math.acos(dot) * t;
  const relative = to.clone().sub(from.clone().multiplyScalar(dot)).normalize();
  return from
    .clone()
    .multiplyScalar(Math.cos(theta))
    .add(relative.multiplyScalar(Math.sin(theta)))
    .normalize();
}


export default function EcosystemSphereMap({
  nodes,
  edges,
  width,
  height,
  categoryColors,
}: EcosystemSphereMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const resetButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const label = labelRef.current;
    const resetButton = resetButtonRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 5000);
    camera.position.set(0, 0, CONTENT_RADIUS * 2.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;
    controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
    controls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
    controls.minDistance = CONTENT_RADIUS * 1.08;
    controls.maxDistance = CONTENT_RADIUS * 5;
    controls.rotateSpeed = 0.75;
    controls.target.set(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 0.55);
    key.position.set(280, 320, 420);
    scene.add(key);

    const nodePositions = new Map<string, THREE.Vector3>();
    const nodeMeshById = new Map<
      string,
      THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>
    >();
    const neighborsByNode = new Map<string, Set<string>>();
    for (const edge of edges) {
      const sourceSet = neighborsByNode.get(edge.sourceId) ?? new Set<string>();
      sourceSet.add(edge.targetId);
      neighborsByNode.set(edge.sourceId, sourceSet);
      const targetSet = neighborsByNode.get(edge.targetId) ?? new Set<string>();
      targetSet.add(edge.sourceId);
      neighborsByNode.set(edge.targetId, targetSet);
    }

    const nodeGroup = new THREE.Group();
    for (const node of nodes) {
      const position = projectToSphere(
        node.x,
        node.y,
        width,
        height,
        SPHERE_RADIUS,
      );
      nodePositions.set(node.id, position);

      const dotRadius = 1.6 + Math.min(5.2, Math.sqrt(node.radius) * 1.12);
      const color = categoryColors[node.category] ?? "#9AA6B2";
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(dotRadius, 14, 14),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.16,
          roughness: 0.4,
          metalness: 0.05,
          flatShading: true,
          transparent: true,
          opacity: 0.96,
        }),
      );
      mesh.position.copy(position);
      mesh.userData.nodeId = node.id;
      mesh.userData.nodeName = node.name;
      mesh.userData.nodeHref = node.href;
      nodeMeshById.set(node.id, mesh);
      nodeGroup.add(mesh);
    }
    scene.add(nodeGroup);

    const edgeLines: Array<{
      line: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>;
      sourceId: string;
      targetId: string;
    }> = [];
    const flowPaths: FlowPath[] = [];
    for (const edge of edges) {
      const source = nodePositions.get(edge.sourceId);
      const target = nodePositions.get(edge.targetId);
      if (!source || !target) continue;

      const a = source.clone().normalize();
      const b = target.clone().normalize();
      const dot = clamp(a.dot(b), -1, 1);
      const angle = Math.acos(dot);
      if (angle < 1e-5) continue;

      const steps = Math.max(
        8,
        Math.min(28, Math.ceil(angle / (Math.PI / 26))),
      );
      const color = edgeColor(edge);
      const lift = 0.11 + Math.min(0.24, edge.weight * 0.008);
      const linePoints: THREE.Vector3[] = [];
      const curvePoints: THREE.Vector3[] = [];
      let previous: THREE.Vector3 | null = null;

      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps;
        const point = slerpUnitVectors(a, b, t);
        const arcRadius = SPHERE_RADIUS * (1 + Math.sin(Math.PI * t) * lift);
        point.multiplyScalar(arcRadius);
        curvePoints.push(point.clone());

        if (previous) {
          linePoints.push(previous.clone(), point.clone());
        }
        previous = point.clone();
      }

      if (linePoints.length === 0) continue;
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
      const arcMaterial = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: ARC_IDLE_OPACITY,
      });
      const arcLine = new THREE.LineSegments(arcGeometry, arcMaterial);
      edgeLines.push({
        line: arcLine,
        sourceId: edge.sourceId,
        targetId: edge.targetId,
      });
      scene.add(arcLine);

      const flowPath = createFlowPath(
        edge.id,
        edge.sourceId,
        edge.targetId,
        color,
        curvePoints,
      );
      if (flowPath) flowPaths.push(flowPath);
    }

    let particleCloud = null as ReturnType<
      typeof createFlowParticleCloud
    > | null;
    let particlePositionAttribute: THREE.BufferAttribute | null = null;
    let particleAlphaAttribute: THREE.BufferAttribute | null = null;
    const pathOpacityMultipliers = new Float32Array(flowPaths.length).fill(1);

    if (flowPaths.length > 0) {
      const particleCount = Math.min(
        10000,
        Math.max(10000, flowPaths.length * 60),
      );
      particleCloud = createFlowParticleCloud(flowPaths, {
        particleCount,
        minSize: 2.0,
        maxSize: 8.0,
        minSpeed: 0.02,
        maxSpeed: 0.06,
        baseAlpha: 0.3,
        alphaJitter: 0.2,
        jitterRadius: 100,
      });

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particleCloud.positions, 3),
      );
      particleGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(particleCloud.colors, 3),
      );
      particleGeometry.setAttribute(
        "aSize",
        new THREE.BufferAttribute(particleCloud.sizes, 1),
      );
      particleGeometry.setAttribute(
        "aAlpha",
        new THREE.BufferAttribute(particleCloud.alphas, 1),
      );

      const particleMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        uniforms: {},
        vertexShader: `
          attribute float aSize;
          attribute float aAlpha;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vColor = color;
            vAlpha = aAlpha;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (360.0 / max(1.0, -mvPosition.z));
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            float soft = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(vColor, vAlpha * soft);
          }
        `,
      });

      const particlePoints = new THREE.Points(
        particleGeometry,
        particleMaterial,
      );
      particlePoints.renderOrder = 2;
      scene.add(particlePoints);

      particlePositionAttribute = particleGeometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      particleAlphaAttribute = particleGeometry.getAttribute(
        "aAlpha",
      ) as THREE.BufferAttribute;
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(2, 2);
    const interactionSphere = new THREE.Sphere(
      new THREE.Vector3(0, 0, 0),
      SPHERE_RADIUS * 1.15,
    );
    const sphereIntersection = new THREE.Vector3();
    let hoveredNodeId: string | null = null;
    let pinnedNodeId: string | null = null;
    let pointerDown = false;
    let pointerDownX = 0;
    let pointerDownY = 0;
    let pointerDragged = false;
    const relatedLabelEls = new Map<string, HTMLDivElement>();

    function getActiveNodeId(): string | null {
      return pinnedNodeId ?? hoveredNodeId;
    }

    function applyHoverStyles(activeNodeId: string | null): void {
      const connected = activeNodeId
        ? (neighborsByNode.get(activeNodeId) ?? new Set<string>())
        : new Set<string>();

      for (const edge of edgeLines) {
        const isActive =
          !!activeNodeId &&
          (edge.sourceId === activeNodeId || edge.targetId === activeNodeId);
        edge.line.material.opacity = activeNodeId
          ? (isActive ? ARC_ACTIVE_OPACITY : ARC_IDLE_OPACITY)
          : ARC_IDLE_OPACITY;
      }

      for (const [nodeId, mesh] of nodeMeshById.entries()) {
        const isActive = activeNodeId === nodeId;
        const isConnected = !!activeNodeId && connected.has(nodeId);
        mesh.scale.setScalar(isActive ? 1.45 : isConnected ? 1.18 : 1);
        mesh.material.emissiveIntensity = isActive
          ? 0.45
          : isConnected
            ? 0.24
            : 0.08;
        mesh.material.opacity = activeNodeId
          ? isActive || isConnected
            ? 1
            : 0.3
          : 0.96;
      }

      if (flowPaths.length > 0) {
        for (let i = 0; i < flowPaths.length; i += 1) {
          const path = flowPaths[i];
          const related =
            !!activeNodeId &&
            (path.sourceId === activeNodeId || path.targetId === activeNodeId);
          pathOpacityMultipliers[i] = activeNodeId ? (related ? 1 : 0.06) : 1;
        }
      }
    }

    function setHoveredNode(nextNodeId: string | null): void {
      if (hoveredNodeId === nextNodeId) return;
      hoveredNodeId = nextNodeId;
      applyHoverStyles(getActiveNodeId());
    }

    function setPinnedNode(nextNodeId: string | null): void {
      pinnedNodeId = nextNodeId;
      if (!pinnedNodeId && !hoveredNodeId) pointer.set(2, 2);
      applyHoverStyles(getActiveNodeId());
    }

    function handleNodeActivate(nodeId: string): void {
      const mesh = nodeMeshById.get(nodeId);
      if (!mesh) return;
      const href = (mesh.userData.nodeHref as string | undefined) ?? "";
      const connectedToPinned = pinnedNodeId
        ? (neighborsByNode.get(pinnedNodeId) ?? new Set<string>())
        : new Set<string>();

      if (pinnedNodeId) {
        if (nodeId === pinnedNodeId || connectedToPinned.has(nodeId)) {
          if (href) window.open(href, "_blank", "noopener,noreferrer");
        }
        return;
      }
      setPinnedNode(nodeId);
    }

    function syncRelatedLabelNodes(activeNodeId: string | null): void {
      if (!label) return;
      const relatedIds = activeNodeId
        ? [activeNodeId, ...Array.from(neighborsByNode.get(activeNodeId) ?? new Set<string>())]
        : [];
      const keepIds = new Set<string>(relatedIds);

      for (const [nodeId, nodeLabel] of relatedLabelEls.entries()) {
        if (keepIds.has(nodeId)) continue;
        if (nodeLabel.parentNode === label) label.removeChild(nodeLabel);
        relatedLabelEls.delete(nodeId);
      }

      for (const nodeId of relatedIds) {
        if (relatedLabelEls.has(nodeId)) continue;
        const nodeLabel = document.createElement("div");
        nodeLabel.className =
          "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border bg-gray-950/88 px-2 py-1 text-[11px] font-mono";
        nodeLabel.style.display = "none";
        label.appendChild(nodeLabel);
        relatedLabelEls.set(nodeId, nodeLabel);
      }
    }

    function handlePointerMove(event: PointerEvent): void {
      if (pointerDown) {
        if (Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY) > CLICK_DRAG_THRESHOLD) {
          pointerDragged = true;
        }
      }
      if (pointerDragged) {
        setHoveredNode(null);
        return;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(nodeGroup.children, false);
      const hit = hits[0]?.object as THREE.Mesh | undefined;
      const nextNodeId = (hit?.userData?.nodeId as string | undefined) ?? null;
      setHoveredNode(nextNodeId);
    }

    function handlePointerLeave(): void {
      setHoveredNode(null);
      pointerDown = false;
      pointerDragged = false;
      controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
      pointer.set(2, 2);
    }

    function handlePointerDown(event: PointerEvent): void {
      pointerDown = true;
      pointerDragged = false;
      pointerDownX = event.clientX;
      pointerDownY = event.clientY;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const startedOnSphere = Boolean(
        raycaster.ray.intersectSphere(interactionSphere, sphereIntersection),
      );
      controls.mouseButtons.LEFT = startedOnSphere
        ? THREE.MOUSE.ROTATE
        : THREE.MOUSE.PAN;
    }

    function handlePointerUp(event: PointerEvent): void {
      if (!pointerDown) return;
      pointerDown = false;
      controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
      if (pointerDragged) {
        pointerDragged = false;
        return;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(nodeGroup.children, false);
      const hit = hits[0]?.object as THREE.Mesh | undefined;
      const nextNodeId = (hit?.userData?.nodeId as string | undefined) ?? null;
      if (nextNodeId) {
        handleNodeActivate(nextNodeId);
      }
    }

    function handleResize(): void {
      const w = Math.max(280, container?.clientWidth ?? width);
      const h = Math.max(260, Math.round(w / VIEWPORT_ASPECT));
      if (container) container.style.height = `${h}px`;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const halfFov = THREE.MathUtils.degToRad(camera.fov * 0.5);
      const fitHeightDistance = CONTENT_RADIUS / Math.tan(halfFov);
      const fitWidthDistance = fitHeightDistance / Math.max(0.5, camera.aspect);
      const fitDistance = Math.max(fitHeightDistance, fitWidthDistance) * 1.16;
      camera.position.set(0, 0, fitDistance);
      camera.updateProjectionMatrix();
      controls.minDistance = CONTENT_RADIUS * 1.08;
      controls.maxDistance = fitDistance * 3;
      controls.update();
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown, true);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    function handleCanvasWheel(event: WheelEvent): void {
      event.preventDefault();
      event.stopPropagation();
    }
    renderer.domElement.addEventListener("wheel", handleCanvasWheel, {
      passive: false,
    });

    function handleResetClick(event: MouseEvent): void {
      event.preventDefault();
      event.stopPropagation();
      setPinnedNode(null);
      setHoveredNode(null);
    }
    if (resetButton) {
      resetButton.addEventListener("click", handleResetClick);
    }

    let frameId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      controls.update();

      if (
        particleCloud &&
        particlePositionAttribute &&
        particleAlphaAttribute &&
        flowPaths.length > 0
      ) {
        const elapsed = clock.getElapsedTime();
        updateFlowParticleCloud(flowPaths, particleCloud, elapsed);

        for (let i = 0; i < particleCloud.alphas.length; i += 1) {
          const pathIndex = particleCloud.pathIndex[i];
          particleCloud.alphas[i] *= pathOpacityMultipliers[pathIndex];
        }

        particlePositionAttribute.needsUpdate = true;
        particleAlphaAttribute.needsUpdate = true;
      }

      if (label) {
        const activeNodeId = getActiveNodeId();
        syncRelatedLabelNodes(activeNodeId);
        if (!activeNodeId) {
          for (const nodeLabel of relatedLabelEls.values()) {
            nodeLabel.style.display = "none";
          }
        } else {
          for (const [nodeId, nodeLabel] of relatedLabelEls.entries()) {
            const mesh = nodeMeshById.get(nodeId);
            if (!mesh) {
              nodeLabel.style.display = "none";
              continue;
            }
            const projected = mesh.position.clone().project(camera);
            const canvasWidth = renderer.domElement.clientWidth;
            const canvasHeight = renderer.domElement.clientHeight;
            const screenX = (projected.x * 0.5 + 0.5) * canvasWidth;
            const screenY = (-projected.y * 0.5 + 0.5) * canvasHeight;
            const isVisible = projected.z > -1 && projected.z < 1;
            if (!isVisible) {
              nodeLabel.style.display = "none";
              continue;
            }

            const material = mesh.material;
            const nodeColor = material?.color?.getStyle?.() ?? "#E5E7EB";
            const isActive = nodeId === activeNodeId;
            const nodeName = ((mesh.userData.nodeName as string | undefined) ?? "").trim();
            nodeLabel.textContent =
              nodeName.length > 44 ? `${nodeName.slice(0, 44)}...` : nodeName;
            nodeLabel.style.display = "block";
            nodeLabel.style.transform = `translate(${screenX + 12}px, ${screenY - 10}px)`;
            nodeLabel.style.color = isActive ? nodeColor : "#E5E7EB";
            nodeLabel.style.borderColor = isActive ? nodeColor : "rgba(148, 163, 184, 0.45)";
          }
        }
      }

      if (resetButton) {
        if (!pinnedNodeId) {
          resetButton.style.display = "none";
        } else {
          const pinnedMesh = nodeMeshById.get(pinnedNodeId);
          const canvasWidth = renderer.domElement.clientWidth;
          const canvasHeight = renderer.domElement.clientHeight;
          if (pinnedMesh) {
            const projected = pinnedMesh.position.clone().project(camera);
            const screenX = (projected.x * 0.5 + 0.5) * canvasWidth;
            const screenY = (-projected.y * 0.5 + 0.5) * canvasHeight;
            const x = clamp(screenX + 130, 20, canvasWidth - 20);
            const y = clamp(screenY - 8, 20, canvasHeight - 20);
            resetButton.style.transform = `translate(${x}px, ${y}px)`;
          }
          resetButton.style.display = "block";
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener(
        "pointerdown",
        handlePointerDown,
        true,
      );
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      renderer.domElement.removeEventListener("wheel", handleCanvasWheel);
      if (resetButton) {
        resetButton.removeEventListener("click", handleResetClick);
      }
      controls.dispose();

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const material = mesh.material;
          if (Array.isArray(material)) {
            for (const m of material) m.dispose();
          } else {
            material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      if (label) {
        for (const nodeLabel of relatedLabelEls.values()) {
          if (nodeLabel.parentNode === label) label.removeChild(nodeLabel);
        }
        relatedLabelEls.clear();
      }
    };
  }, [categoryColors, edges, height, nodes, width]);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
        <p className="text-xs text-gray-400 font-mono">
          Hover nodes to highlight · click once to pin · click pinned/linked nodes to open · click X to reset · drag to pan/rotate · scroll to zoom
        </p>
      </div>
      <div
        className="relative overflow-x-auto rounded-xl border border-gray-800 bg-gray-900"
        style={{ overscrollBehavior: "contain" }}
      >
        <div ref={containerRef} className="w-full" />
        <button
          ref={resetButtonRef}
          type="button"
          className="absolute left-0 top-0 z-30 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FDE4CF] bg-[#0E141C] px-2 py-1 text-xs font-bold text-[#FDE4CF] shadow-[0_0_0_1px_rgba(14,20,28,0.6)]"
          aria-label="Reset pinned sphere node"
        >
          X
        </button>
        <div
          ref={labelRef}
          className="pointer-events-none absolute inset-0"
        />
      </div>
    </div>
  );
}
