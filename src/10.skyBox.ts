import { AxesHelper, CubeTextureLoader } from "three";
import { scene } from "./init";
import { getUrl } from "./utils/path";

function createSkyBox() {
  const cubeMapURLS = [
    getUrl('models/texture/pisa/px.png'),
    getUrl('models/texture/pisa/nx.png'),
    getUrl('models/texture/pisa/py.png'),
    getUrl('models/texture/pisa/ny.png'),
    getUrl('models/texture/pisa/pz.png'),
    getUrl('models/texture/pisa/nz.png')
  ]

  scene.background = new CubeTextureLoader().load(cubeMapURLS)
}

createSkyBox()

scene.add(new AxesHelper(30))
