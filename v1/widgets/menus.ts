import Gtk from "gi://Gtk";

export class AppMenu {
  public button() {
    return Widget.Button({
      name: "app-menu-button",
      class_name: "button menu-button",
      on_primary_click: () => {
        App.ToggleWindow("app-menu-backdrop");
        App.ToggleWindow("app-menu");
      },
      child: Widget.Label({
        label: "",
      }),
    });
  }
  public menu() {
    return [
      Widget.Window({
        name: "app-menu-backdrop",
        class_name: "menu-backdrop",
        anchor: ["top", "right", "bottom", "left"],
        layer: "top",
        exclusivity: "ignore",
        margins: [0, 0],
        visible: false,
        child: Widget.EventBox({
          on_primary_click: () => {
            App.ToggleWindow("app-menu-backdrop");
            App.ToggleWindow("app-menu");
          },
        }),
      }),
      Widget.Window({
        name: "app-menu",
        class_name: "menu",
        anchor: ["top", "left"],
        layer: "overlay",
        margins: [12, 12, 0, 12],
        visible: false,
        child: Widget.Box({
          name: "app-menu-popup",
          class_name: "menu-popup",
          vertical: true,
          children: [
            Widget.Box({
              children: [Widget.Label("Apps")],
            }),
          ],
        }),
      }),
    ];
  }
}

export class TailscaleMenu {
  public button() {
    return Widget.Button({
      name: "tailscale-menu-button",
      class_name: "button menu-button",
      on_primary_click: () => {
        App.ToggleWindow("tailscale-menu-backdrop");
        App.ToggleWindow("tailscale-menu");
      },
      child: Widget.Label({
        label: "󱗼",
      }),
    });
  }
  public menu() {
    return [
      Widget.Window({
        name: "tailscale-menu-backdrop",
        class_name: "menu-backdrop",
        anchor: ["top", "right", "bottom", "left"],
        layer: "top",
        exclusivity: "ignore",
        margins: [0, 0],
        visible: false,
        child: Widget.EventBox({
          on_primary_click: () => {
            App.ToggleWindow("tailscale-menu-backdrop");
            App.ToggleWindow("tailscale-menu");
          },
        }),
      }),
      Widget.Window({
        name: "tailscale-menu",
        class_name: "menu",
        anchor: ["top", "right"],
        layer: "overlay",
        margins: [12, 12, 0, 12],
        visible: false,
        child: Widget.Box({
          name: "tailscale-menu-popup",
          class_name: "menu-popup",
          vertical: true,
          children: [
            Widget.Box({
              children: [Widget.Label("Tailscale")],
            }),
          ],
        }),
      }),
    ];
  }
}

export class VolumeMenu {
  public async button(audio) {
    const icons: { [key: number]: string } = {
      67: "󰕾",
      34: "󰖀",
      1: "󰕿",
      0: "󰸈",
    };
    function getIcon() {
      const icon = audio.speaker.is_muted
        ? 0
        : [67, 34, 1, 0].find(
            (threshold) => threshold <= audio.speaker.volume * 100
          ) ?? 0;
      return icons[icon];
    }
    const label = Widget.Label({
      label: Utils.watch(getIcon(), audio.speaker, getIcon),
      justification: "center",
    });
    return Widget.Button({
      name: "volume-menu-button",
      class_name: "button menu-button",
      hpack: "fill",
      vpack: "fill",
      on_primary_click: () => {
        App.ToggleWindow("volume-menu-backdrop");
        App.ToggleWindow("volume-menu");
      },
      child: label,
    });
  }

  public menu() {
    return [
      Widget.Window({
        name: "volume-menu-backdrop",
        class_name: "menu-backdrop",
        anchor: ["top", "right", "bottom", "left"],
        layer: "top",
        exclusivity: "ignore",
        margins: [0, 0],
        visible: false,
        child: Widget.EventBox({
          on_primary_click: () => {
            App.ToggleWindow("volume-menu-backdrop");
            App.ToggleWindow("volume-menu");
          },
        }),
      }),
      Widget.Window({
        name: "volume-menu",
        class_name: "menu",
        anchor: ["top", "right"],
        layer: "overlay",
        margins: [12, 12, 0, 12],
        visible: false,
        child: Widget.Box({
          name: "volume-menu-popup",
          class_name: "menu-popup",
          vertical: true,
          children: [
            Widget.Box({
              children: [Widget.Label("Volume")],
            }),
            Widget.Box({
              child: Widget.Slider({
                hexpand: true,
                draw_value: false,
              }),
            }),
            Widget.Box({
              child: Widget.Separator(),
            }),
            Widget.Box({
              child: Widget.Label("Output"),
            }),
            Widget.Button({
              child: Widget.Label("Output 1"),
            }),
            Widget.Button({
              child: Widget.Label("Output 2"),
            }),
            Widget.Button({
              child: Widget.Label("Output 3"),
            }),
            Widget.Box({
              child: Widget.Label("Input"),
            }),
            Widget.Button({
              child: Widget.Label("Input 1"),
            }),
            Widget.Button({
              child: Widget.Label("Input 2"),
            }),
            Widget.Button({
              child: Widget.Label("Input 3"),
            }),
          ],
        }),
      }),
    ];
  }
}

export class Menu {
  name: string;
  icon: any;
  align: "left" | "right" = "left";
  content?: Gtk.Widget[];

  constructor(
    name: string,
    icon: any,
    align: "left" | "right" = "left",
    content: Gtk.Widget[] = [Widget.Label(name)]
  ) {
    this.name = name;
    this.icon = icon;
    this.align = align;
    this.content = content;
  }

  public button() {
    return Widget.Button({
      name: this.name + "-button",
      class_name: "menu-button",
      on_primary_click: () => {
        App.ToggleWindow(this.name + "-menu-backdrop");
        App.ToggleWindow(this.name + "-menu");
      },
      child: this.icon,
    });
  }

  public popup() {
    return [
      Widget.Window({
        name: this.name + "-menu-backdrop",
        anchor: ["top", "left", "right", "bottom"],
        layer: "top",
        exclusivity: "ignore",
        margins: [0, 0],
        css: "background: none;",
        visible: false,
        child: Widget.EventBox({
          on_primary_click: () => {
            App.ToggleWindow(this.name + "-menu-backdrop");
            App.ToggleWindow(this.name + "-menu");
          },
        }),
      }),
      Widget.Window({
        name: this.name + "-menu",
        class_name: this.name + "-menu",
        anchor: ["top", this.align],
        layer: "overlay",
        margins: [12, 12, 0, 12],
        visible: false,
        child: Widget.Box({
          name: this.name + "-menu-popup",
          class_name: this.name + "-menu-popup",
          vertical: true,
          children: this.content,
        }),
      }),
    ];
  }
}

// export class VolumeMenu extends Menu {
//   audio: GObject.Object;

//   constructor(audio: GObject.Object) {
//     super("volume", "vol", "right", []);
//     this.icon = this.GetVolumeIcon();
//     this.content = [this.GetVolumeControls()];
//     this.audio = audio;
//   }
//   private async GetVolumeIcon() {
//     const volumeIcons: { [key: number]: string } = {
//       67: "󰕾",
//       34: "󰖀",
//       1: "󰕿",
//       0: "󰸈",
//     };
//     function VolumeLevel(audio: GObject.Object) {
//       audio.speaker.is_muted
//         ? 0
//         : [67, 34, 1, 0].find(
//             (threshold) => threshold <= audio.speaker.volume * 100
//           ) ?? 0;
//       return volumeIcons[VolumeLevel(audio)];
//     }
//     return Utils.watch(VolumeLevel(this.audio), this.audio.speaker, VolumeLevel);
//   }
//   private GetVolumeControls() {
//     return Widget.Label("placeholder");
//   }
// }
