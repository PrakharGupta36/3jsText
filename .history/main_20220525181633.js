import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import texture_001 from "./textures/texture_001.png";

// textures
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(texture_001);

// init
const scene = new THREE.Scene();
const gui = new dat.GUI();
const file = document.getElementById("myInput");
gui.closed = true;
const parameters = {
  color: 0xff0000,
  background: 0x000000,
  loadFile: function () {
    file.click();
    texture.
  },

};



// colors
const geometry = new THREE.TorusKnotBufferGeometry(0.5, 0.1, 100, 16);
const material = new THREE.MeshBasicMaterial({
  map: texture,
  wireframe: false,
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
renderer.setClearColor(parameters.background);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 2.5;

// tweaks

gui.add(mesh.position, "y").min(-3).max(3).step(0.001).name("up/down");
gui.add(mesh.position, "x").min(-3).max(3).step(0.001).name("left/right");
gui.add(mesh, "visible");
gui.add(mesh.material, "wireframe");
gui.add(parameters, "loadFile").name("Load CSV file");
gui.addColor(parameters, "background").onChange(() => {
  renderer.setClearColor(parameters.background);
});

const controls = new OrbitControls(camera, canvas);
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
