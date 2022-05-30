import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// init

const scene = new THREE.Scene();

// colors
const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

const material = new THREE.MeshBasicMaterial({
  color: "red",
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.set(0, Math.PI / 4, Math.PI / 4);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
renderer.setClearColor();
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 1.5;

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});

const controls = new OrbitControls(camera, canvas);
controls.update();
controls.enableDamping = true;

// animation
const clock = new THREE.Clock();

function animation(time) {
  const elaspedTime = clock.getElapsedTime();

  camera.position.x = -cursor.x;
  camera.position.y = cursor.y;

  gsap.to(mesh.rotation, {
    duration: 1,
    delay: 0,
    x: elaspedTime,
    y: elaspedTime,
    z: elaspedTime,
    repeat: Infinity,
  });

  renderer.render(scene, camera);
}
