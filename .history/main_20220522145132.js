// import * as THREE from "three";
// import "./style.css"

// // init
// const scene = new THREE.Scene();

// // cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // sizes
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// // camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.5,
//   1000
// );
// camera.position.z = 10;
// scene.add(camera);

// // renderer
// const canvas = document.getElementById("canvas");
// const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
// renderer.setSize(sizes.width / sizes.height);
// renderer.render(scene, camera);

import * as THREE from "three";

// init

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

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation

function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}