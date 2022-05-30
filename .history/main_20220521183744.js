import "./style.css";
import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);

// animation
let mouseX, mouseY

window.addEventListener(("mousemove"), (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

const pointLight = new THREE.PointLight(0xffffff,1);
scene.add(pointLight)


function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  pointLight.position.x = mouseX
  pointLight.position.x = mouseX

  renderer.render(scene, camera);
}
