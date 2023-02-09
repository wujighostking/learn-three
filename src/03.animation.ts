import {
  AnimationClip,
  AnimationMixer,
  AxesHelper,
  BoxGeometry,
  Clock,
  ColorKeyframeTrack,
  Mesh,
  MeshLambertMaterial,
  NumberKeyframeTrack,
  VectorKeyframeTrack
} from "three"
import { scene } from "./init"

let cubeMesh: Mesh
let mixer: AnimationMixer

function createCube() {
  const cubeGeometry = new BoxGeometry()
  const cubeMaterical = new MeshLambertMaterial({
    color: 0xffffff * Math.random()
  })
  cubeMesh = new Mesh(cubeGeometry, cubeMaterical)
  scene.add(cubeMesh)
}


function initAnimation() {
  const positionKF: VectorKeyframeTrack = new VectorKeyframeTrack(
    '.position',
    [0, 1, 2, 3, 4],
    [
      0, 0, 0,
      10, 0, 0,
      10, 10, 0,
      0, 10, 0,
      0, 0, 0
    ]
  )
  const opacityKF = new NumberKeyframeTrack(
    '.material.opacity',
    [0, 1, 2, 3],
    [0, 1, 0.3, 0]
  )
  const colorKF = new ColorKeyframeTrack(
    '.material.color',
    [0, 1, 2, 3],
    [
      Math.random(), Math.random(), Math.random(),
      Math.random(), Math.random(), Math.random(),
      Math.random(), Math.random(), Math.random(),
      Math.random(), Math.random(), Math.random()
    ]
  )
  mixer = new AnimationMixer(cubeMesh)
  const clip: AnimationClip = new AnimationClip(
    'action',
    4,
    [opacityKF, colorKF]
  )
  const clipAction = mixer.clipAction(clip)
  clipAction.play()
}

const clock = new Clock()
function render(): void {
  const delta = clock.getDelta()
  mixer.update(delta)
  requestAnimationFrame(render)
}


scene.add(new AxesHelper(30))
createCube()
initAnimation()
render()

export { }