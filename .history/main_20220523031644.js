import * as THREE from "three";
import "./style.css";
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
  color: "rgba(255,0,0,0.1)",
  opacity: 0.5,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper)

mesh.rotation.y = Math.PI 

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
renderer.setClearColor("black");
document.body.appendChild(renderer.domElement);

// animation

function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}