(function () {
  var flash_action;
  Plugin.register("remove_cube_missing_texture", {
    title: "Remove Cube Missing Texture",
    icon: "flash_on",
    author: "kigkosa",
    description: "Remove Cube Missing Texture",
    version: "1.1.1",
    variant: "both",
    onload() {
      const mt_highlighter = {
        i: 0,
        start: function () {
          mt_highlighter.i = 0;
          mt_highlighter.flash();
        },
        flash: function () {
          Cube.all.forEach((m, i) => {
            let del = false;
            for (let side in m.faces) {
              if (m.faces[side].getTexture() == false) {
                del = true;
              }
            }
            if (del) {
              Undo.initEdit({ elements: [m] });
              m.remove();
              Undo.finishEdit("Remove cube");
            }
          });
        },
      };
      flash_action = new Action({
        id: "remove_cube_missing_texture",
        name: "Remove Cube Missing Texture",
        category: "textures",
        icon: "flash_on",
        click() {
          mt_highlighter.start();
        },
      });
      MenuBar.addAction(flash_action, "filter");
    },
    onunload() {
      flash_action.delete();
    },
  });
})();
