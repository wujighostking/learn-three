import {
  Color,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  SpotLight,
  sRGBEncoding,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

const innerWidth: number = window.innerWidth
const innerHeight: number = window.innerHeight
export let scene: Scene
export let perspectiveCamera: PerspectiveCamera
let webGLRenderer: WebGLRenderer
let canvasElement: HTMLCanvasElement
let controls: OrbitControls

init()
initRender(window)

function init() {
  initScene()
  initCamera()
  initLight()
}
function initRender(window: Window) {
  webGLRenderer = new WebGLRenderer({ antialias: true })
  canvasElement = webGLRenderer.domElement
  canvasElement.width = innerWidth
  canvasElement.height = innerHeight
  document.body.appendChild(canvasElement)
  webGLRenderer.setSize(innerWidth, innerHeight)

  initControls()

  window.addEventListener('resize', () => {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    perspectiveCamera.aspect = innerWidth / innerHeight
    perspectiveCamera.updateProjectionMatrix()
    webGLRenderer.setSize(innerWidth, innerHeight)
  })
}

function initScene() {
  scene = new Scene()
  scene.background = new Color(0x808080)
}

function initCamera() {
  perspectiveCamera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.01,
    100000
  )
  perspectiveCamera.position.set(30, 30, 30)
  perspectiveCamera.lookAt(0, 0, 0)
  scene.add(perspectiveCamera)
}

function render() {
  webGLRenderer.shadowMap.enabled = true
  webGLRenderer.outputEncoding = sRGBEncoding
  webGLRenderer.render(scene, perspectiveCamera)
}

function initControls() {
  controls = new OrbitControls(perspectiveCamera, canvasElement)
}

function initLight() {
  // ambientLight =  new AmbientLight(0xffffff, 0.7)
  // scene.add(ambientLight)
  // const light = new HemisphereLight(0xffffff, 0x888888);
  const spotLight = new SpotLight(0xffffff)
  // light.position.set(0, 1, 0)
  spotLight.position.set(5, 30, 0)
  spotLight.penumbra = 0.5
  spotLight.decay = 0.5
  spotLight.castShadow = true
  // scene.add(light)
  scene.add(spotLight)
  // scene.add(new SpotLightHelper(spotLight))
  const dirLight = new DirectionalLight(0xffffff, 0.7)
  dirLight.position.set(30, 10, 0)
  dirLight.castShadow = true
  dirLight.shadow.camera.zoom = 2
  scene.add(dirLight)
}

let timer: number = 0
function animate() {
  if (timer) cancelAnimationFrame(timer)
  timer = requestAnimationFrame(animate)

  controls.update()
  render()
}
setTimeout(() => {
  animate()
}, 500)
