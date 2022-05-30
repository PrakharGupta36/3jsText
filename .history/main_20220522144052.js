import * as THREE from "three";

// init
const scene = new THREE.Scene();

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.5,
  1000
);

scene.add(camera);

// renderer
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLR