import { loadGLTF } from "./libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './targets.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const axe = await loadGLTF('./assets/axe.gltf');
    axe.scene.scale.set(10, 10, 10);
    axe.scene.position.set(0, 0, 0);

    const tomillo = await loadGLTF('./assets/tomillo.gltf');
    tomillo.scene.scale.set(10, 10, 10);
    tomillo.scene.position.set(0, 0, 0);

    const f5 = await loadGLTF('./assets/f5.gltf');
    f5.scene.scale.set(10, 10, 10);
    f5.scene.position.set(0, 0, 0);



    const axeAnchor = mindarThree.addAnchor(0);
    axeAnchor.group.add(axe.scene);

    const tomilloAnchor = mindarThree.addAnchor(1);
    tomilloAnchor.group.add(tomillo.scene);

    const f5Anchor = mindarThree.addAnchor(2);
    f5Anchor.group.add(f5.scene);

    /*await mindarThree.start();
    renderer.setAnimationLoop(() => {

      renderer.render(scene, camera);
    });
    */
    const clock = new THREE.Clock();

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      axe.scene.rotation.set(0, axe.scene.rotation.y + delta, 0);
      tomillo.scene.rotation.set(0, tomillo.scene.rotation.y + delta, 0);
      f5.scene.rotation.set(0, f5.scene.rotation.y + delta, 0);
      renderer.render(scene, camera);
    });

  }
  start();
});
