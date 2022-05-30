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

const geometry = new THREE.BoxGeometry(.35,.35,.35);
const material = new THREE.THREE.MeshLambertMaterial({ color: "white" });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = { width: window.innerWidth, height: window.innerHeight };

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
renderer.setAnimationLoop(animation);

// controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();


// light
let mouseX, mouseY;
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x0000ff, 2);

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / sizes.width) * 2 - 1;
  mouseY = (-e.clientY / sizes.height) * 2 - 1;
  pointLight.position.set(mouseX, mouseY, 15);
});

scene.add(pointLight);

function animation(time) {
  console.log(pointLight.position.x, pointLight.position.y);
  renderer.render(scene, camera);
}
