import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import * as dat from "dat.gui";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
// init

const scene = new THREE.Scene();

// colors
const geometry = new THREE.TorusKnotBufferGeometry(0.5, 0.1, 100, 16);

const material = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.set(0, Math.PI / 4, Math.PI / 4);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", (e) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setAnimationLoop(animation);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
renderer.setClearColor();
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 2.5;

const controls = new TrackballControls(camera, canvas);
controls.enableZoom = false;
controls.enablePan = false;

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
  controls.update();

  renderer.render(scene, camera);
}
