import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// init

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 1.5;

const scene = new THREE.Scene();

const geometry = new THREE.BoxBufferGeometry(0.3, 0.3, 0.3);

const material = new THREE.MeshBasicMaterial({
  vertexColors: true,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.set(0, Math.PI / 4, Math.PI / 4);
scene.add(mesh);

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
const clock = new THREE.Clock();

function animation(time) {
  const elaspedTime = clock.getElapsedTime();
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
