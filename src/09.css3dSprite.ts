import { getUrl } from './utils/path'
import {
  CSS3DObject,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer'
import { PerspectiveCamera, Scene } from 'three'

let css3dRenderer: CSS3DRenderer
let scene: Scene
let perspectiveCamera: PerspectiveCamera

function init() {
  scene = new Scene()

  perspectiveCamera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.01,
    100000
  )
}

function createCss3dObject() {
  perspectiveCamera.position.set(600, 400, 1500)
  perspectiveCamera.lookAt(0, 0, 0)
  scene.add(perspectiveCamera)
  for (let i = 0; i < 100; i++) {
    const img = document.createElement('img')
    img.src = getUrl('models/texture/sprite.png')

    const object = new CSS3DObject(img)
    object.position.x = Math.random() * 4000 - 2000
    object.position.y = Math.random() * 4000 - 2000
    object.position.z = Math.random() * 4000 - 2000
    scene.add(object)
  }
}

function createCss3dRender() {
  css3dRenderer = new CSS3DRenderer()
  css3dRenderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(css3dRenderer.domElement)
}

function animate() {
  requestAnimationFrame(animate)
  css3dRenderer.render(scene, perspectiveCamera)
}

init()
createCss3dObject()
createCss3dRender()
animate()

export {}
