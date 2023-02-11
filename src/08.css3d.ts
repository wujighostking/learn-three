import {
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Scene,
} from 'three'
import {
  CSS3DRenderer,
  CSS3DObject,
} from 'three/examples/jsm/renderers/CSS3DRenderer'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { perspectiveCamera, scene } from './init'

let css3dRenderer: CSS3DRenderer
let scene2: Scene
let controls: TrackballControls

function createCss3dScene() {
  scene2 = new Scene()
}

function createCss3dObject() {
  const material = new MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    wireframeLinewidth: 1,
    side: DoubleSide,
  })

  const width = 100
  const height = 100
  for (let i = 0; i < 10; i++) {
    const divEle = document.createElement('div')
    divEle.style.width = `${width}px`
    divEle.style.height = `${height}px`
    divEle.style.background = new Color(Math.random() * 0xffffff).getStyle()

    divEle.style.opacity = (i < 5 ? 0.5 : 1) + ''
    const object = new CSS3DObject(divEle)
    object.position.set(
      (Math.random() - 0.5) * 200,
      Math.random() * 200,
      (Math.random() - 0.5) * 200
    )
    object.rotation.set(Math.random(), Math.random(), Math.random())
    object.scale.x = Math.random() + 0.5
    object.scale.y = Math.random() + 0.5
    scene2.add(object)

    const planeGeometry = new PlaneGeometry(width, height)
    const planeMesh = new Mesh(planeGeometry, material)
    planeMesh.position.copy(object.position)
    planeMesh.rotation.copy(object.rotation)
    planeMesh.scale.copy(object.scale)
    scene.add(planeMesh)
  }
}

function createCss3dRender() {
  css3dRenderer = new CSS3DRenderer()
  css3dRenderer.setSize(window.innerWidth, window.innerHeight)
  css3dRenderer.domElement.style.position = 'absolute'
  css3dRenderer.domElement.style.top = '0'
  document.body.appendChild(css3dRenderer.domElement)
}

function craeteControls() {
  controls = new TrackballControls(perspectiveCamera, css3dRenderer.domElement)
}

function animate() {
  controls?.update()
  css3dRenderer.render(scene2, perspectiveCamera)
  requestAnimationFrame(animate)
}

createCss3dScene()
createCss3dObject()
createCss3dRender()
craeteControls()
animate()
