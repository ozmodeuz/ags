import { Menu, AppMenu, TailscaleMenu, VolumeMenu } from "./menus";

// ags services
const hyprland = await Service.import("hyprland");
const audio = await Service.import("audio");

// variables
const date = Variable("", {
  poll: [1000, 'date "+%e %b %H:%M"'],
});

// list to store last active window title per monitor
let titles: string[] = [];
for (let i = 0; i < hyprland.monitors.length; i++) {
  titles.push("");
}

// function to update last active window titles, and output a matching label
function WindowTitle(id: number) {
  function getTitle() {
    const activeWindow = hyprland.clients.find(
      (c) => c.address === hyprland.active.client.address
    );
    const isOnThisMonitor = activeWindow ? activeWindow.monitor === id : false;
    isOnThisMonitor && activeWindow ? (titles[id] = activeWindow.title) : null;
    return titles[id] ? titles[id] : "";
  }
  return Widget.Label({
    label: Utils.watch(getTitle(), hyprland, "event", getTitle),
  });
}

// clock, duh
function Clock() {
  return Widget.Label({
    name: "clock",
    label: date.bind(),
  });
}

async function createWindows() {
  const app = new AppMenu();
  const tailscale = new TailscaleMenu();
  const volume = new VolumeMenu();
  const network = new Menu("network", Widget.Label("󰖩"), "right");
  const power = new Menu("power", Widget.Label("󰐥"), "right");

  const volumeButton = await volume.button(audio).catch((error) => {
    console.error("Failed to load volume button:", error);
    return Widget.Button({ label: "" });
  });

  App.config({
    windows: [
      ...app.menu(),
      ...tailscale.menu(),
      ...volume.menu(),
      ...network.popup(),
      ...power.popup(),
      Widget.Window({
        name: "bar",
        anchor: ["top", "left", "right"],
        layer: "top",
        margins: [12, 12, 0, 12],
        exclusivity: "exclusive",
        child: Widget.Box({
          name: "bar-box",
          vertical: true,
          children: [
            Widget.CenterBox({
              spacing: 6,
              vertical: false,
              startWidget: Widget.Box({
                name: "left",
                class_name: "bar-section",
                children: [
                  app.button(),
                  Widget.Box({
                    name: "controls",
                    children: [
                      Widget.Button(),
                      Widget.Button(),
                      Widget.Button(),
                    ],
                  }),
                ],
              }),
              centerWidget: Widget.Box({
                name: "center",
                class_name: "bar-section",
                child: WindowTitle(1),
              }),
              endWidget: Widget.Box({
                name: "right",
                class_name: "bar-section",
                hpack: "end",
                spacing: 12,
                children: [
                  tailscale.button(),
                  volumeButton,
                  network.button(),
                  Clock(),
                  power.button(),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });

  App.applyCss("/home/oz/.config/ags/style.css");
}

createWindows();

export {};
