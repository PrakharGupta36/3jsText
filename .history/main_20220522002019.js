import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshStandardMaterial({ color: "pink" });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);

// controls

const controls = new OrbitControls(camera, canvas);
controls.update();

window.addEventListener("resize",()_

// animation
let mouseX, mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;
  console.log(mouseX, mouseY);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(ambientLight);

const spotLight = new THREE.PointLight(0xffffff);
scene.add(spotLight);

function animation(time) {
  spotLight.position.x = mouseX;
  spotLight.position.y = mouseY;

  renderer.render(scene, camera);
}
