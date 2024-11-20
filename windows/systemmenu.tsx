import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable, bind, exec } from "astal";
import Network from "gi://AstalNetwork";
import Wp from "gi://AstalWp";

function AudioInputMuteButton() {
  const mic = Wp.get_default()!.audio.defaultMicrophone!;
  return (
    <button
      onClicked={(self) => {
        if (mic.mute) {
          mic.set_mute(false);
          self.set_class_name("off");
        } else {
          mic.set_mute(true);
          self.set_class_name("on");
        }
      }}
    >
      <label label="󰍭" />
    </button>
  );
}

function AudioInputSelection() {
  const mic = Wp.get_default()?.audio.defaultMicrophone!;
  return (
    <box className="audioselection" hexpand={true}>
      <AudioInputMuteButton />
      <button>
        <label
          label={bind(mic, "description").as(String) || "Default input device"}
          halign={Gtk.Align.START}
          hexpand={true}
        />
      </button>
    </box>
  );
}

function AudioInputSlider() {
  const mic = Wp.get_default()?.audio.defaultMicrophone!;
  return (
    <box className="volumecontrol">
      <label label="-" />
      <slider
        hexpand={true}
        onDragged={({ value }) => (mic.volume = value)}
        value={bind(mic, "volume")}
      ></slider>
      <label label="+" />
    </box>
  );
}

function AudioOutputMuteButton() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;
  return (
    <button
      onClicked={(self) => {
        if (speaker.mute) {
          speaker.set_mute(false);
          self.set_class_name("off");
        } else {
          speaker.set_mute(true);
          self.set_class_name("on");
        }
      }}
    >
      <label label="󰝟" />
    </button>
  );
}

function AudioOutputSelection() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;
  return (
    <box className="audioselection" hexpand={true}>
      <AudioOutputMuteButton />
      <button>
        <label
          label={
            bind(speaker, "description").as(String) || "Default output device"
          }
          halign={Gtk.Align.START}
          hexpand={true}
        />
      </button>
    </box>
  );
}

function AudioOutputSlider() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;
  return (
    <box className="volumecontrol">
      <label label="-" />
      <slider
        hexpand={true}
        onDragged={({ value }) => (speaker.volume = value)}
        value={bind(speaker, "volume")}
      ></slider>
      <label label="+" />
    </box>
  );
}

function NetworkButtons() {
  const wifi = Network.get_default()?.wifi!;
  return (
    <box>
      <button halign={Gtk.Align.FILL} label="󰖩"></button>
      <button
        hexpand={true}
        halign={Gtk.Align.START}
        label={bind(wifi, "ssid").as((ssid) => `${ssid}`)}
      ></button>
    </box>
  );
}

export default function SystemMenu(gdkMonitor: Gdk.Monitor, index: number) {
  return [
    <window
      name={"SystemMenuBackdrop" + index}
      className="SystemMenuBackdrop"
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
          App.toggle_window("SystemMenuBackdrop" + index);
          App.toggle_window("SystemMenu" + index);
        }}
      ></eventbox>
    </window>,
    <window
      name={"SystemMenu" + index}
      className="SystemMenu"
      gdkmonitor={gdkMonitor}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      application={App}
      visible={false}
    >
      <box className="menuouter">
        <box className="menuinner" vertical={true}>
          <box className="power" halign={Gtk.Align.FILL}>
            <button className="lockbutton" hexpand={true} label=""></button>
            <button
              className="logoutbutton"
              hexpand={true}
              label="󰗽"
              onClicked={() => exec("niri msg action quit")}
            ></button>
            <button
              className="suspendbutton"
              hexpand={true}
              label=""
              onClicked={() => exec("systemctl suspend")}
            ></button>
            <button
              className="restartbutton"
              hexpand={true}
              label="󰜉"
              onClicked={() => exec("systemctl reboot")}
            ></button>
            <button
              className="poweroffbutton"
              hexpand={true}
              label="󰐥"
              onClicked={() => exec("systemctl poweroff")}
            ></button>
          </box>
          <box className="audio" halign={Gtk.Align.FILL} vertical={true}>
            <AudioOutputSlider />
            <AudioOutputSelection />
          </box>
          <box className="audio" halign={Gtk.Align.FILL} vertical={true}>
            <AudioInputSlider />
            <AudioInputSelection />
          </box>
          <box className="system" vertical={true}>
            <NetworkButtons />
            <box>
              <button label="TS" />
              <button className="systembutton tailscale" hexpand={true}>
                <label label="exit node here" halign={Gtk.Align.START} />
              </button>
            </box>
            <box>
              <button label="󰂯" />
              <button className="systembutton bluetooth" hexpand={true}>
                <label label="2 devices" halign={Gtk.Align.START} />
              </button>
            </box>
          </box>
        </box>
      </box>
    </window>,
  ];
}
