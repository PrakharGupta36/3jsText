import * as THREE from "three";
import "./style.css";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import texture_002 from "./textures/texture_002.jpg";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { WireframeGeometry } from "three";

const scene = new THREE.Scene();
const gui = new dat.GUI();
const file = document.getElementById("file");
gui.closed = false;

const parameters = {
  color: 0xff0000,
  background: 0xffffff,
  loadFile: () => {
    file.click();
  },
};

// font
const loader = new FontLoader();
loader.load("./fonts/helvetiker_regular.typeface.json", function (font) {
  const geometry = new TextGeometry("Hello three.js!", {
    font: font,
    size: 10,
    height: 2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshPhongMaterial({}),
    new THREE.MeshPhongMaterial({}),
  ]);
  textMesh.castShadow = true;
  geometry.center();
  scene.add(textMesh);

  for (let i = 0; i < 100; i++) {
    const donutGeometry = new THREE.TorusBufferGeometry(10, 2, 20, 45);
    const donutMaterial = new THREE.MeshPhongMaterial();
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = Math.random() - 0.5 * 10;

    scene.add(donut);
  }
});

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
camera.position.z = 100;

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

  controls.update();

  renderer.render(scene, camera);
}
