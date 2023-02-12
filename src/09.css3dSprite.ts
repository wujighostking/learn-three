import { getUrl } from './utils/path'
import {
  CSS3DRenderer,
  CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { PerspectiveCamera, Scene } from 'three'

const count: number = 125
const cubic = Math.pow(count, 1 / 3)
let css3dRenderer: CSS3DRenderer
let scene: Scene
let perspectiveCamera: PerspectiveCamera
let controls: TrackballControls
let domRenderer: HTMLElement
let objectList: CSS3DSprite[] = []
let isCube: boolean = false

function init() {
  scene = new Scene()

  perspectiveCamera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.01,
    100000
  )
  perspectiveCamera.position.set(600, 400, 1500)
  perspectiveCamera.lookAt(0, 0, 0)
  scene.add(perspectiveCamera)
}

function createCss3dObject() {
  for (let i = 0; i < count; i++) {
    const img = document.createElement('img')
    img.src = getUrl('models/texture/sprite.png')
    img.addEventListener('click', () => {
      console.log('i: ', img.style.height)
    })

    const object = new CSS3DSprite(img)
    object.position.x = Math.random() * 2000 - 1000
    object.position.y = Math.random() * 2000 - 1000
    object.position.z = Math.random() * 2000 - 1000
    objectList.push(object)
    scene.add(object)
  }
}

function createCss3dRender() {
  css3dRenderer = new CSS3DRenderer()
  domRenderer = css3dRenderer.domElement
  css3dRenderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(css3dRenderer.domElement)

  window.addEventListener('resize', () => {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    perspectiveCamera.aspect = innerWidth / innerHeight
    perspectiveCamera.updateProjectionMatrix()
    css3dRenderer.setSize(innerWidth, innerHeight)
  })
}

function initControls() {
  controls = new TrackballControls(perspectiveCamera, domRenderer)
}

function animate() {
  css3dRenderer.render(scene, perspectiveCamera)
  controls.update()
  requestAnimationFrame(animate)
}

function createPosition() {
  if (!isCube) {
    for (let x = 0; x < cubic; x++) {
      for (let y = 0; y < cubic; y++) {
        for (let z = 0; z < cubic; z++) {
          const index = Math.ceil(z + y * cubic + x * cubic ** 2)
          objectList[index].position.set(x * 100, y * 100, z * 100)
        }
      }
    }
  } else {
    objectList.forEach((object) => {
      object.position.x = Math.random() * 2000 - 1000
      object.position.y = Math.random() * 2000 - 1000
      object.position.z = Math.random() * 2000 - 1000
    })
  }
  isCube = !isCube
}

init()
createCss3dObject()
createCss3dRender()
initControls()
animate()

setInterval(() => {
  createPosition()
}, 3000)

export {}
