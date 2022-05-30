import * as THREE from "three";
import "./style.css";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import texture_002 from "./textures/texture_002.jpg";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

// init
const scene = new THREE.Scene();
const gui = new dat.GUI();
const file = document.getElementById("file");
gui.closed = false;

const parameters = {
  color: 0xff0000,
  background: 0x1f1f1f,
  loadFile: () => {
    file.click();
  },
};

// font
const loader = new FontLoader();
loader.load("fonts/helvetiker_regular.typeface.json", function (font) {
  const geometry = new TextGeometry("Hello three.js!", {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5,
  });
});

// textureloaders

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("started...");
};
loadingManager.onProgress = () => {
  console.log("progress...");
};
loadingManager.onError = () => {
  console.log("ERROR!!");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader();
const texture = textureLoader.load(texture_002);

// geometry
const sphere = new THREE.BoxBufferGeometry(0.75, 0.75, 0.75);
const torus = new THREE.TorusBufferGeometry(0.5, 0.1, 16, 32);
const plane = new THREE.TorusKnotBufferGeometry(0.5, 0.1, 127, 32);

// material
const material = new THREE.MeshStandardMaterial({
  map: texture,
  side: THREE.DoubleSide,
  roughness: 0,
});

// meshes
const sphereMesh = new THREE.Mesh(sphere, material);
const torusMesh = new THREE.Mesh(torus, material);
const planeMesh = new THREE.Mesh(plane, material);

torusMesh.position.x = 2;
sphereMesh.position.x = -2;

const mesh = [sphereMesh, torusMesh, planeMesh];

scene.add(sphereMesh, planeMesh, torusMesh);

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
camera.position.z = 4;

// controls

const controls = new OrbitControls(camera, canvas);

// light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(4, 4, 4);
scene.add(pointLight);

// tweaks

gui.addColor(parameters, "background").onChange(() => {
  renderer.setClearColor(parameters.background);
});

// animation
const clock = new THREE.Clock();
function animation(time) {
  const elaspedTime = clock.getElapsedTime();

  pointLight.position.x = Math.sin(elaspedTime * 5);
  pointLight.position.y = Math.cos(elaspedTime * 5);
  pointLight.position.z = Math.cos(elaspedTime * 5);

  mesh.forEach((e) => {
    e.rotation.x = elaspedTime;
    e.rotation.y = elaspedTime;
    e.rotation.z = elaspedTime;
  }),
    controls.update();

  renderer.render(scene, camera);
}
