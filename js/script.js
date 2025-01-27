// --------------- 3D BACKGROUND SETUP ---------------
const canvas = document.getElementById('bgCanvas');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 30);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Starfield
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 8, 8);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(400).fill().forEach(addStar);

// Rotating Torus
const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff5e5e });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Random Spheres
const sphereGroup = new THREE.Group();
scene.add(sphereGroup);

for (let i = 0; i < 5; i++) {
  const geo = new THREE.SphereGeometry(Math.random() * 1.5 + 1, 32, 32);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff * Math.random()
  });
  const sphere = new THREE.Mesh(geo, mat);
  sphere.position.set(
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 30
  );
  sphereGroup.add(sphere);
}

// Mouse parallax effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX / window.innerWidth - 0.5;
  mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate torus
  torus.rotation.x += 0.003;
  torus.rotation.y += 0.005;

  // Rotate spheres
  sphereGroup.rotation.x += 0.001;
  sphereGroup.rotation.y += 0.001;

  // Parallax
  camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 10 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
animate();

// --------------- SCROLL REVEAL ---------------
const scrollElements = document.querySelectorAll('.scroll-reveal, .section .card, .project-item');

/**
 * Use IntersectionObserver to fade in elements on scroll.
 * We added a CSS transition in style.css for .scroll-reveal.show.
 */
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

scrollElements.forEach((el) => {
  observer.observe(el);
});

// --------------- MOUSE FOLLOWER ---------------
const follower = document.createElement('div');
follower.classList.add('mouse-follower');
document.body.appendChild(follower);

let followerX = 0;
let followerY = 0;
let pointerX = 0;
let pointerY = 0;

// Track pointer
document.addEventListener('mousemove', (e) => {
  pointerX = e.clientX;
  pointerY = e.clientY;
});

// Smooth update
function updateFollower() {
  // 0.1 is the 'speed' factor for lag effect
  followerX += (pointerX - followerX) * 0.1;
  followerY += (pointerY - followerY) * 0.1;
  follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
  requestAnimationFrame(updateFollower);
}
updateFollower();
