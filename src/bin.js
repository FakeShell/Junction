#!/usr/bin/env -S gjs -m

import { exit, programArgs, programInvocationName } from "system";
import GLib from "gi://GLib";
import { setConsoleLogDomain } from "console";

const currentPath = GLib.getenv('XDG_DATA_DIRS') || '';
const newPaths = [
  '/run/host/usr/share',
  '/var/lib/snapd/desktop',
  '/var/lib/flatpak/exports/share',
  `${GLib.getenv('HOME')}/.local/share/flatpak/exports/share`
];

GLib.setenv('XDG_DATA_DIRS', `${currentPath}:${newPaths.join(':')}`, true);

imports.package.init({
  name: "@app_id@",
  version: "@version@",
  prefix: "@prefix@",
  libdir: "@libdir@",
  datadir: "@datadir@",
});
setConsoleLogDomain(pkg.name);
GLib.set_application_name("Junction");

globalThis.__DEV__ = false;

const { main } = await import("resource:///re/sonny/Junction/main.js");
const exit_code = await main([programInvocationName, ...programArgs]);
exit(exit_code);
