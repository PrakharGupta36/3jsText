import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// init

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.z = 1;

console.log(camera.position);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshBasicMaterial({
  color: 0x504d4d,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.set(10,10,10)

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
renderer.setClearColor();
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, canvas);
controls.update();
controls.enableDamping = true;

// animation

function animation(time) {
  // mesh.rotation.x = time / 2000;
  // mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
