import {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Clock,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  Fog,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { scene } from './init'
import { getUrl } from './utils/path'

let mixer: AnimationMixer, floor: Mesh
const clock: Clock = new Clock()

function loadGltfModel() {
  const loader: GLTFLoader = new GLTFLoader()
  loader.load(getUrl('models/gltf/Soldier.glb'), (gltf) => {
    const model = gltf.scene
    model.traverse((mesh) => {
      if ((mesh as Mesh).isMesh) {
        mesh.castShadow = true
      }
    })
    const clip = gltf.animations[3]
    mixer = new AnimationMixer(model)
    const action = mixer.clipAction(clip)
    action.play()
    scene.add(gltf.scene)
  })
}

function createFloor() {
  const planeGeometry = new PlaneGeometry(10, 10)
  const materical = new MeshPhongMaterial({
    color: 0xa0a0a0,
    side: DoubleSide,
  })
  floor = new Mesh(planeGeometry, materical)
  floor.rotateX(Math.PI / 2)
  floor.receiveShadow = true
  scene.add(floor)
}

function initLight() {
  const ambientLight: AmbientLight = new AmbientLight(0xffffff, 0.3)
  const dirLight = new DirectionalLight(0xffffff)
  dirLight.position.set(5, 5, 0)
  dirLight.castShadow = true
  dirLight.receiveShadow = true
  scene.add(ambientLight)
  scene.add(dirLight)
}

function sceneSetting() {
  scene.fog = new Fog(0x000000, 30, 80)
}

function render() {
  const delta = clock.getDelta()
  mixer?.update(delta)
  requestAnimationFrame(render)
}

sceneSetting()
initLight()
createFloor()
loadGltfModel()
render()

scene.add(new AxesHelper(30))

export {}
