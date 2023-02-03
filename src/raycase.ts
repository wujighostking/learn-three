import { AxesHelper, Color, IcosahedronGeometry, InstancedMesh, Matrix4, MeshPhongMaterial } from 'three'
import { scene } from './init'

const geometry = new IcosahedronGeometry(0.5, 3);
const material = new MeshPhongMaterial({ color: 0xffffff });
const amount = 10, count = amount ** 3
const color = new Color()

export const mesh = new InstancedMesh(geometry, material, count);

let i = 0;
const offset = (amount - 1) / 2  // 4.5
const matrix = new Matrix4()
for (let x = 0; x < amount; x++) {
  for (let y = 0; y < amount; y++) {
    for (let z = 0; z < amount; z++) {
      // [
      //   4.5, 4.5,  4.5,
      //   4.5, 4.5,  3.5,
      //   4.5, 4.5,  2.5,
      //   4.5, 4.5,  1.5,
      //   4.5, 4.5,  0.5,
      //   4.5, 4.5, -0.5,
      // ]
      matrix.setPosition(offset - x, offset - y, offset - z)
      mesh.setMatrixAt(i, matrix)
      mesh.setColorAt(i, color)
      i++
    }
  }
}

// mesh.instanceMatrix.needsUpdate = true
scene.add(mesh);

scene.add(new AxesHelper(20))
