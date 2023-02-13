import {
  CSS3DRenderer,
  CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import gsap from 'gsap'

import { getUrl } from './utils/path'
import { PerspectiveCamera, Scene } from 'three'

const count: number = 1000
const cubic = Math.pow(count, 1 / 3)
let css3dRenderer: CSS3DRenderer
let scene: Scene
let perspectiveCamera: PerspectiveCamera
let controls: TrackballControls
let domRenderer: HTMLElement
let objectList: CSS3DSprite[] = []

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

let isUpdateComplete: boolean = true
function createCubePosition() {
  for (let x = 0; x < cubic; x++) {
    for (let y = 0; y < cubic; y++) {
      for (let z = 0; z < cubic; z++) {
        const index = Math.ceil(z + y * cubic + x * cubic ** 2)
        // objectList[index].position.set(x * 100, y * 100, z * 100)
        gsap.to(objectList[index].position, {
          'x': x * 100,
          'y': y * 100,
          'z': z * 100,
          delay: 2,
          duration: 3,
          yoyo: true,
          onComplete: () => {
            if (Math.abs(x - cubic + 1) < 0.0001 && isUpdateComplete) {
              createPlanePosition()
              isUpdateComplete = false
            }
          }
        })

      }
    }
  }

  // const objectPosition = {
  //   x: 0, y: 0, z: 0
  // }
  // objectList.forEach((object, index) => {
  //   const { x, y, z } = objectPosition
  //   gsap.to(object.position, {
  //     x: x * 100,
  //     y: y * 100,
  //     z: z * 100,
  //     delay: 2,
  //     duration: 3,
  //     yoyo: true,
  //     onComplete: () => {
  //       if () {
  //         createRandomPosition()
  //       }
  //     }
  //   })

  //   if ()
  // })
}

function createRandomPosition() {
  objectList.forEach((object, index) => {
    gsap.to(object.position, {
      'x': Math.random() * 2000 - 1000,
      'y': Math.random() * 2000 - 1000,
      'z': Math.random() * 2000 - 1000,
      delay: 2,
      duration: 5,
      onComplete: () => {
        if (Math.abs(index - objectList.length + 1) < 0.0001) {
          createCubePosition()
          isUpdateComplete = true
        }
      }
    })
  })
}

function createPlanePosition() {
  objectList.forEach((object, index) => {
    gsap.to(object.position, {
      'x': Math.floor(index / 10) * 100,
      'y': 100,
      'z': (index % 10) * 100,
      delay: 2,
      duration: 5,
      onComplete: () => {
        if (Math.abs(index - objectList.length + 1) < 0.0001) {
          createRandomPosition()
        }
      }
    })
  })
}

init()
createCss3dObject()
createCss3dRender()
initControls()
animate()
createCubePosition()

export { }
