import {
  AxesHelper,
  Color,
  DoubleSide,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
  Raycaster,
  RepeatWrapping,
  SphereGeometry,
  TextureLoader,
  Vector2,
} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import { perspectiveCamera, scene, useEffectObj, webGLRenderer } from './init'
import { getUrl } from './utils/path'

useEffectObj.value = true
const mouse: Vector2 = new Vector2(2, 2)
const raycaster: Raycaster = new Raycaster()
const group: Object3D = new Object3D()
let composer: EffectComposer
let outlinePass: OutlinePass

function onPointerMove(event: MouseEvent) {
  mouse.x = (event.clientX / window.innerWidth - 0.5) * 2
  mouse.y = -(event.clientY / window.innerHeight - 0.5) * 2
}

function createFloor() {
  const planeGeometry = new PlaneGeometry(30, 30)
  const planeMaterial = new MeshLambertMaterial({
    color: 0xa0a0a0,
    side: DoubleSide,
  })
  const planeMesh = new Mesh(planeGeometry, planeMaterial)
  planeMesh.rotation.x = -Math.PI / 2
  planeMesh.receiveShadow = true
  // scene.add(planeMesh)
  group.add(planeMesh)
}

function createSphere() {
  for (let i = 0; i < 30; i++) {
    const sphereGeometry = new SphereGeometry(3, 48, 24)
    const sphereMaterial = new MeshPhongMaterial()
    const sphereMesh = new Mesh(sphereGeometry, sphereMaterial)
    const scale = Math.random()
    sphereMesh.scale.set(scale, scale, scale)
    sphereMaterial.color.set(new Color(Math.random(), 0.3, Math.random()))
    sphereMesh.castShadow = true
    sphereMesh.position.set(
      Math.random() * 30 - 15,
      Math.random() * 7,
      Math.random() * 30 - 15
    )
    group.add(sphereMesh)
    // scene.add(sphereMesh)
  }
}

function loadObjModel() {
  const objectLoader = new OBJLoader()
  objectLoader.load(getUrl('models/obj/tree.obj'), (objectModel) => {
    objectModel.traverse((child) => {
      if (child instanceof Mesh) {
        // child.scale.set(5, 5, 5)
        group.add(child)
        child.castShadow = true
        // scene.add(child)
      }
    })
  })
}

function createRender() {
  composer = new EffectComposer(webGLRenderer)
  composer.addPass(new RenderPass(scene, perspectiveCamera))
}

function createOutlinePass() {
  outlinePass = new OutlinePass(
    new Vector2(window.innerWidth, window.innerHeight),
    scene,
    perspectiveCamera
  )
  const outlinePassParams = {
    edgeStrength: 0.5,
    edgeGlow: 3,
    edgeThickness: 7,
    pulsePeriod: 1,
    visibleEdgeColor: new Color().setHex(0xff0000),
    hiddenEdgeColor: new Color().setHex(0x00ff00),
    rotate: false,
    usePatternTexture: true,
  }

  // const effectFXAA = new ShaderPass(FXAAShader)
  // effectFXAA.uniforms['resolution'].value.set(
  //   1 / window.innerWidth,
  //   1 / window.innerHeight
  // )
  // composer.addPass(effectFXAA)

  outlinePass = Object.assign(outlinePass, outlinePassParams)
}

function createTextureLoader() {
  const textureLoader = new TextureLoader()
  textureLoader.load(getUrl('models/texture/tri_pattern.jpg'), (texture) => {
    outlinePass.patternTexture = texture
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
  })
}

function animate() {
  raycaster.setFromCamera(mouse, perspectiveCamera)
  const intersections = raycaster.intersectObject(group)
  if (intersections.length > 0) {
    const object = intersections[0].object as Mesh
    outlinePass.selectedObjects.length = 0
    outlinePass.selectedObjects.push(object)
    createTextureLoader()
    composer.addPass(outlinePass)
  }
  composer.render()

  requestAnimationFrame(animate)
}

window.addEventListener('mousemove', onPointerMove)

createFloor()
createSphere()
loadObjModel()
createRender()
createOutlinePass()
createTextureLoader()
animate()
scene.add(new AxesHelper(50))
scene.add(group)

export {}
