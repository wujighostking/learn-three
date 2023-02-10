import { scene } from './init'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { getUrl } from './utils/path'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { AnimationMixer, AxesHelper, Clock } from 'three'

let mixer: AnimationMixer
const clock = new Clock()
function loadModels() {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath(getUrl('models/libs/draco/gltf/'))

  const gltfLoader: GLTFLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)
  gltfLoader.load(getUrl('models/gltf/LittlestTokyo.glb'), (gltf) => {
    const model = gltf.scene
    const animation = gltf.animations[0]
    mixer = new AnimationMixer(model)
    mixer.clipAction(animation).play()
    model.scale.set(0.1, 0.1, 0.1)
    scene.add(model)
  })
}

function render() {
  const delta = clock.getDelta()
  mixer?.update(delta)
  requestAnimationFrame(render)
}
loadModels()
render()

scene.add(new AxesHelper(50))
