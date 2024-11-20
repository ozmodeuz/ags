import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable } from "astal";
import Apps from "gi://AstalApps";

export default function AppMenu(gdkMonitor: Gdk.Monitor, index: number) {
  const maxitems = 12;
  const { CENTER } = Gtk.Align;
  const apps = new Apps.Apps();
  const input = Variable("");
  const list = input((input) => apps.fuzzy_query(input).slice(0, maxitems));
  const onEnter = () => {
    apps.fuzzy_query(input.get())?.[0].launch();
    App.toggle_window("AppMenuBackdrop" + index);
    App.toggle_window("AppMenu" + index);
  };
  return [
    <window
      name={"AppMenuBackdrop" + index}
      className="AppMenuBackdrop"
      gdkmonitor={gdkMonitor}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
      visible={false}
      css="background: none;"
    >
      <eventbox
        onClick={() => {
          App.toggle_window("AppMenuBackdrop" + index);
          App.toggle_window("AppMenu" + index);
        }}
      ></eventbox>
    </window>,
    <window
      name={"AppMenu" + index}
      className="AppMenu"
      gdkmonitor={gdkMonitor}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
      application={App}
      visible={false}
    >
      <box>
        <box vertical={true}>
          {list.as((list) =>
            list.map((app) => (
              <button className="AppListItem">
                <label label={app.name} />
              </button>
            ))
          )}
        </box>
      </box>
    </window>,
  ];
}
