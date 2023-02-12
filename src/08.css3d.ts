import {
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Scene,
  AxesHelper,
} from 'three'
import {
  CSS3DObject,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { getUrl } from './utils/path'
import { perspectiveCamera, scene } from './init'

const width = 100
const height = 100
let css3dObject: CSS3DObject
let css3dRenderer: CSS3DRenderer
let controls: TrackballControls
let scene2: Scene = new Scene()

function createCss3dObject() {
  const material = new MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    wireframeLinewidth: 1,
    side: DoubleSide,
  })

  for (let i = 0; i < 10; i++) {
    const div: HTMLDivElement = document.createElement('div')
    div.style.width = `${width}px`
    div.style.height = `${height}px`
    div.style.backgroundColor = new Color(Math.random() * 0xffffff).getStyle()
    div.style.backgroundImage = `url(${getUrl(
      'models/texture/tri_pattern.jpg'
    )})`
    div.style.opacity = String((1 + i) * 0.1)

    css3dObject = new CSS3DObject(div)
    css3dObject.position.set(
      (Math.random() - 0.5) * 200,
      Math.random() * 200,
      (Math.random() - 0.5) * 200
    )
    css3dObject.rotation.set(Math.random(), Math.random(), Math.random())
    css3dObject.scale.x = Math.random() + 0.5
    css3dObject.scale.y = Math.random() + 0.5
    scene2.add(css3dObject)

    const planeGeometry = new PlaneGeometry(width, height)
    const planeMesh = new Mesh(planeGeometry, material)
    planeMesh.position.copy(css3dObject.position)
    planeMesh.rotation.copy(css3dObject.rotation)
    planeMesh.scale.copy(css3dObject.scale)
    scene.add(planeMesh)
  }
}
function createCss3dRenderer() {
  css3dRenderer = new CSS3DRenderer()
  css3dRenderer.setSize(window.innerWidth, window.innerHeight)
  css3dRenderer.domElement.style.position = 'absolute'
  css3dRenderer.domElement.style.top = '0'
  document.body.appendChild(css3dRenderer.domElement)
}

function createControls() {
  controls = new TrackballControls(perspectiveCamera, css3dRenderer.domElement)
}

function animate() {
  controls.update()
  css3dRenderer.render(scene2, perspectiveCamera)
  requestAnimationFrame(animate)
}

createCss3dObject()
createCss3dRenderer()
createControls()
animate()

scene.add(new AxesHelper(30))
