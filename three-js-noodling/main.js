import './style.css';
import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);

scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function createStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);

  return star
}

var stars = []

Array(200).fill().forEach(() => {
  var star = createStar();
  stars.push(star);
  scene.add(star);
});

const spaceTexture = new THREE.TextureLoader().load('images/space.png');
scene.background = spaceTexture;

const mayFace = new THREE.TextureLoader().load('images/Commission.png');
const mayBox = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: mayFace})
);

scene.add(mayBox)

/* animation */

function rotateGeometry(geoObj) {
  geoObj.rotation.x += .01;
  geoObj.rotation.y += .01;
  geoObj.rotation.z += .01;
}

function randomAnimate(geoObj) {
  var randomValue = .01;
  geoObj.position.x += randomValue;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera)

  controls.update();

  rotateGeometry(torus);
  rotateGeometry(mayBox);

  stars.forEach(star => {
    randomAnimate(star);
  });
}

animate();