import * as THREE from "three";

// init
const scene = new THREE.Scene();

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera();
scene.add(camera);