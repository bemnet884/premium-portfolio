import * as THREE from 'three';

export function initThreeJSBackground() {
  const canvas = document.querySelector('#bg-canvas');
  if (!canvas) return;

  const container = canvas.parentElement;

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Geometry & Material — boosted visibility & adjusted size
  const geometry = new THREE.IcosahedronGeometry(2.5, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x888888,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Mouse tracking for subtle rotation
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
  });

  // Animation Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Base rotation
    mesh.rotation.x = elapsedTime * 0.1;
    
    // Additional rotation based on mouse hover
    targetX = mouseX * 2;
    targetY = mouseY * 2;
    mesh.rotation.y += 0.02 * (targetX - mesh.rotation.y);
    mesh.rotation.x += 0.02 * (targetY - mesh.rotation.x);

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

export function initAbout3D() {
  const canvas = document.querySelector('#about-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const container = canvas.parentElement;

  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Create a group of geometric shapes
  const group = new THREE.Group();

  // Torus Knot — main shape
  const torusKnotGeo = new THREE.TorusKnotGeometry(1, 0.35, 100, 16);
  const torusKnotMat = new THREE.MeshBasicMaterial({
    color: 0x888888,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
  group.add(torusKnot);

  // Outer Octahedron ring
  const octaGeo = new THREE.OctahedronGeometry(2.2, 0);
  const octaMat = new THREE.MeshBasicMaterial({
    color: 0x555555,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const octahedron = new THREE.Mesh(octaGeo, octaMat);
  group.add(octahedron);

  scene.add(group);

  // Animation
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    torusKnot.rotation.x = t * 0.15;
    torusKnot.rotation.y = t * 0.2;

    octahedron.rotation.x = t * 0.08;
    octahedron.rotation.y = -t * 0.12;

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
