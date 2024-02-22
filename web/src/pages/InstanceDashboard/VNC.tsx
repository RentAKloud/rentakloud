import { Component, Match, Show, Switch, createEffect, createResource, onMount } from "solid-js"
//@ts-ignore
import RFB from "./novnc/core/rfb.js"
import { useInstanceContext } from "./context"
import InstancesApi from "~/api/instances.js"
import Loader from "~/components/Loader.jsx"

const VNC: Component<{}> = () => {
  const { instance } = useInstanceContext()
  const [initialized, { refetch }] = createResource(async () => {
    if (!instance.latest) return null
    const { result, error } = await InstancesApi.initVNCTunnel('vm2002')
    if (error) throw error
    return result
  })

  createEffect(() => {
    if (instance.latest) {
      refetch()
    }
  })

  onMount(() => {
    let rfb: RFB;
    let desktopName: string;

    // When this function is called we have
    // successfully connected to a server
    function connectedToServer(e: any) {
      status("Connected to " + desktopName);
    }

    // This function is called when we are disconnected
    function disconnectedFromServer(e: any) {
      if (e.detail.clean) {
        status("Disconnected");
      } else {
        status("Something went wrong, connection is closed");
      }
    }

    // When this function is called, the server requires
    // credentials to authenticate
    function credentialsAreRequired(e: any) {
      const password = prompt("Password Required:");
      rfb.sendCredentials({ password: password });
    }

    // When this function is called we have received
    // a desktop name from the server
    function updateDesktopName(e: any) {
      desktopName = e.detail.name;
    }

    // Since most operating systems will catch Ctrl+Alt+Del
    // before they get a chance to be intercepted by the browser,
    // we provide a way to emulate this key sequence.
    function sendCtrlAltDel() {
      rfb.sendCtrlAltDel();
      return false;
    }

    // Show a status text in the top bar
    function status(text: string) {
      //   document.getElementById('status').textContent = text;
    }

    // This function extracts the value of one variable from the
    // query string. If the variable isn't defined in the URL
    // it returns the default value instead.
    function readQueryVariable(name: string, defaultValue: string | number | boolean) {
      // A URL with a query parameter can look like this:
      // https://www.example.com?myqueryparam=myvalue
      //
      // Note that we use location.href instead of location.search
      // because Firefox < 53 has a bug w.r.t location.search
      const re = new RegExp('.*[?&]' + name + '=([^&#]*)'),
        match = document.location.href.match(re);

      if (match) {
        // We have to decode the URL since want the cleartext value
        return decodeURIComponent(match[1]);
      }

      return defaultValue;
    }

    // document.getElementById('sendCtrlAltDelButton')
    //   .onclick = sendCtrlAltDel;

    // Read parameters specified in the URL query string
    // By default, use the host and port of server that served this file
    const host = readQueryVariable('host', 'rentakloud.com');
    const port = readQueryVariable('port', 443);
    const password = readQueryVariable('password', '');
    const path = readQueryVariable('path', 'vm2003');

    // | | |         | | |
    // | | | Connect | | |
    // v v v         v v v

    status("Connecting");

    // Build the websocket URL used to connect
    let url;
    if (window.location.protocol === "https:") {
      url = 'wss';
    } else {
      url = 'wss';
    }
    url += '://' + host;
    if (port) {
      url += ':' + port;
    }
    url += '/' + path;

    // Creating a new RFB object will start a new connection
    const target = document.getElementById('screen')
    if (target) {
      rfb = new RFB(target, url,
        { credentials: { password: password } });

      // Add listeners to important events from the RFB module
      rfb.addEventListener("connect", connectedToServer);
      rfb.addEventListener("disconnect", disconnectedFromServer);
      rfb.addEventListener("credentialsrequired", credentialsAreRequired);
      rfb.addEventListener("desktopname", updateDesktopName);

      // Set parameters that can be changed on an active connection
      rfb.viewOnly = readQueryVariable('view_only', false);
      rfb.scaleViewport = readQueryVariable('scale', false);
    }
  })

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Stream</h2>
      <p>Your VM's GUI output will be streamed here using our optimized VNC technology.</p>
      <button class="btn" onclick={() => document.getElementById("screen")?.requestFullscreen()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      </button>

      <Switch>
        <Match when={instance.loading || initialized.loading}>
          <Loader />
        </Match>

        <Match when={instance.latest?.status !== "Active"}>
          <div>Oh snap! Looks like the VM is not running.</div>
        </Match>

        <Match when={initialized.latest === "true"}>
          <div id="screen" />
        </Match>

        <Match when={initialized.latest === "false"}>
          <div>Could not establish a secure tunnel to VM. Try again later or contact support@rentakloud.com</div>
        </Match>
      </Switch>
    </>
  )
}

export default VNC