import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { TrackBallControls } from "three/examples/jsm/controls/TrackballControls";
// init

const scene = new THREE.Scene();

// colors
const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

const material = new THREE.MeshBasicMaterial({
  color: "red",
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.set(0, Math.PI / 4, Math.PI / 4);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
renderer.setClearColor();
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 1.5;

const controls = new T(camera, canvas);
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
