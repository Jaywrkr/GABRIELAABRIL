// Geometría paramétrica de un incisivo central superior, estilizado como pieza de joyería.
// Se construye en código: no depende de ningún modelo externo.
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

let cache: THREE.BufferGeometry | null = null;

export function geometriaDiente(): THREE.BufferGeometry {
  if (cache) return cache;

  // Silueta frontal: borde incisal abajo, cuello (línea amelocementaria) arriba.
  const s = new THREE.Shape();
  s.moveTo(-0.38, -0.66);
  s.quadraticCurveTo(0, -0.705, 0.34, -0.665); // borde incisal, apenas curvo
  s.quadraticCurveTo(0.47, -0.65, 0.465, -0.48); // ángulo distal redondeado
  s.bezierCurveTo(0.46, -0.1, 0.36, 0.34, 0.22, 0.58); // cara distal convexa que se estrecha al cuello
  s.quadraticCurveTo(0, 0.76, -0.22, 0.58); // arco cervical estrecho
  s.bezierCurveTo(-0.35, 0.34, -0.45, -0.12, -0.45, -0.58); // cara mesial, más recta
  s.quadraticCurveTo(-0.448, -0.665, -0.38, -0.66);

  const g = new THREE.ExtrudeGeometry(s, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.07,
    bevelSegments: 14,
    curveSegments: 72,
    steps: 2,
  });
  g.translate(0, 0, -0.08);

  // Deformación: curva del arco dental, convexidad vestibular y borde incisal más delgado.
  const p = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const t = THREE.MathUtils.clamp((v.y + 0.7) / 1.45, 0, 1); // 0 = incisal, 1 = cervical
    const grosor = THREE.MathUtils.lerp(0.5, 1.15, Math.pow(t, 0.8));
    v.z *= grosor;
    v.z -= 0.32 * v.x * v.x; // curvatura del arco
    v.z += 0.07 * (1 - Math.pow((v.y - 0.05) / 0.75, 2)); // convexidad de la cara frontal
    v.x *= 1 + 0.04 * Math.sin(t * Math.PI); // ligero ensanche en el tercio medio
    p.setXYZ(i, v.x, v.y, v.z);
  }

  g.deleteAttribute("normal");
  g.deleteAttribute("uv");
  const suave = mergeVertices(g, 1e-4);
  suave.computeVertexNormals();
  suave.computeBoundingBox();
  g.dispose();
  cache = suave;
  return suave;
}

// Nube de puntos sobre la superficie: representa el escaneo intraoral.
export function puntosEscaneo(cantidad = 5200): Float32Array {
  const malla = new THREE.Mesh(geometriaDiente(), new THREE.MeshBasicMaterial());
  const sampler = new MeshSurfaceSampler(malla).build();
  const out = new Float32Array(cantidad * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < cantidad; i++) {
    sampler.sample(v);
    out.set([v.x, v.y, v.z], i * 3);
  }
  return out;
}
