import {
  AxesHelper,
  BoxGeometry,
  DoubleSide,
  DynamicDrawUsage,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  ShadowMaterial
} from "three"
import { scene } from "./init"

function createPlane() {
  const planeGeometry = new PlaneGeometry(300, 300)
  const materical = new ShadowMaterial({
    color: 0xaeaeae,
    side: DoubleSide
  })
  const planeMesh = new Mesh(planeGeometry, materical)
  planeMesh.rotateX(Math.PI / 180 * (-90))
  // planeMesh.castShadow = true
  planeMesh.receiveShadow = true
  scene.add(planeMesh)
}

function createCube() {
  const count = 10
  const boxGeometry = new BoxGeometry(3, 3, 3)
  const materical = new MeshLambertMaterial({ color: 0xffffff * Math.random() })
  const meshes = new InstancedMesh(boxGeometry, materical, count)
  meshes.instanceMatrix.setUsage( DynamicDrawUsage )
  meshes.castShadow = true
  meshes.receiveShadow = true
  const matrix = new Matrix4()
  for (let i = 0; i < count; i++) {
    matrix.setPosition(
      (Math.random() * 2 - 1) * 10,
      Math.random() * 2 * 10,
      Math.random() * 10
    )
    meshes.setMatrixAt(i, matrix)
  }

  scene.add(meshes)
}
createCube()
createPlane()


scene.add(new AxesHelper(30))

