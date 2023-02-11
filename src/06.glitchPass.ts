import {
  AxesHelper,
  Clock,
  IcosahedronGeometry,
  Mesh,
  MeshPhongMaterial,
  Object3D,
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { perspectiveCamera, scene, webGLRenderer, useEffectObj } from './init'

let object3dGroup: Object3D
let composer: EffectComposer
const clock = new Clock()

function craeteSphere(): void {
  object3dGroup = new Object3D()
  for (let i = 0; i < 600; i++) {
    const icosahedronGeometry: IcosahedronGeometry = new IcosahedronGeometry(5)
    const icosahedronMaterial: MeshPhongMaterial = new MeshPhongMaterial({
      color: 0xffffff * Math.random(),
    })
    const icosahedronMesh = new Mesh(icosahedronGeometry, icosahedronMaterial)
    icosahedronMesh.position.set(
      Math.random() * 300 - 150,
      Math.random() * 300 - 150,
      Math.random() * 300 - 150
    )
    object3dGroup.add(icosahedronMesh)
  }
  useEffectObj.value = true
  composer = new EffectComposer(webGLRenderer)
  composer.addPass(new RenderPass(scene, perspectiveCamera))
  composer.addPass(new GlitchPass(64))

  scene.add(object3dGroup)
}

function render() {
  const delta = clock.getDelta()
  object3dGroup.rotation.x += delta * 0.5
  object3dGroup.rotation.y += delta
  composer.render()
  requestAnimationFrame(render)
}

craeteSphere()
render()
scene.add(new AxesHelper(300))

export {}
