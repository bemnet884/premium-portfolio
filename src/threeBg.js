import * as THREE from 'three';

export function initThreeJSBackground() {
  const canvas = document.querySelector('#bg-canvas');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Geometry & Material
  const geometry = new THREE.IcosahedronGeometry(2, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x444444,
    wireframe: true,
    transparent: true,
    opacity: 0.15
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
