import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./windows/bar";
import AppMenu from "./windows/appmenu";
import SystemMenu from "./windows/systemmenu";

App.start({
  css: style,
  main() {
    App.get_monitors().map((monitor, index) => {
      Bar(monitor, index);
    });
    App.get_monitors().map((monitor, index) => {
      AppMenu(monitor, index);
    });
    App.get_monitors().map((monitor, index) => {
      SystemMenu(monitor, index);
    });
  },
});
