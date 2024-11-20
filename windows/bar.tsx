import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable, GLib } from "astal";

function Time({ format = "%e %B %Y %H:%M:%S" }) {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(format)!
  );

  return (
    <label className="Time" onDestroy={() => time.drop()} label={time()} />
  );
}

export default function Bar(gdkMonitor: Gdk.Monitor, index: number) {
  return (
    <window
      name={"Bar" + index}
      className="Bar"
      gdkmonitor={gdkMonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
    >
      <centerbox>
        <box halign={Gtk.Align.START}>
          <button
            onClick={() => {
              App.toggle_window("AppMenuBackdrop" + index);
              App.toggle_window("AppMenu" + index);
            }}
          >
            <label label="" />
          </button>
        </box>
        <box halign={Gtk.Align.CENTER}>
          <label label="Placeholder" />
        </box>
        <box halign={Gtk.Align.END}>
          <box>
            <button>
              <Time />
            </button>
            <button
              onClick={() => {
                App.toggle_window("SystemMenuBackdrop" + index);
                App.toggle_window("SystemMenu" + index);
              }}
              halign={Gtk.Align.CENTER}
            >
              <label label="󰐥" />
            </button>
          </box>
        </box>
      </centerbox>
    </window>
  );
}
