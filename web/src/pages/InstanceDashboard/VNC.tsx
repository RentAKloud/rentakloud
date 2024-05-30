import { Component, Match, Switch, createEffect, createResource } from "solid-js"
//@ts-ignore
// import RFB from "./novnc/core/rfb.js" // TODO Can we load this though a URL?
import { useInstanceContext } from "./context"
import InstancesApi from "~/api/instances.js"
import Loader from "~/components/Loader.jsx"
import { authStore } from "~/stores/auth.js"
import { Icon } from "~/components/icons/index.js"

const VNC: Component<{}> = () => {
  const { instance } = useInstanceContext()
  // const [initialized, { refetch }] = createResource(async () => {
  //   if (!instance.latest?.vncPath) return null
  //   const { result, error } = await InstancesApi.initVNCTunnel(instance.latest!.vncPath)
  //   if (error) throw error
  //   return result
  // })

  // createEffect(() => {
  //   if (instance.latest) {
  //     refetch()
  //   }
  // })


  // createEffect(() => {
  //   if (instance.latest && instance.latest.vncPath) {
  //     let rfb: RFB;
  //     let desktopName: string;

  //     // When this function is called we have
  //     // successfully connected to a server
  //     function connectedToServer(e: any) {
  //       status("Connected to " + desktopName);
  //     }

  //     // This function is called when we are disconnected
  //     function disconnectedFromServer(e: any) {
  //       if (e.detail.clean) {
  //         status("Disconnected");
  //       } else {
  //         status("Something went wrong, connection is closed");
  //       }
  //     }

  //     // When this function is called, the server requires
  //     // credentials to authenticate
  //     function credentialsAreRequired(e: any) {
  //       const password = prompt("Password Required:");
  //       rfb.sendCredentials({ password: password });
  //     }

  //     // When this function is called we have received
  //     // a desktop name from the server
  //     function updateDesktopName(e: any) {
  //       desktopName = e.detail.name;
  //     }

  //     // Since most operating systems will catch Ctrl+Alt+Del
  //     // before they get a chance to be intercepted by the browser,
  //     // we provide a way to emulate this key sequence.
  //     function sendCtrlAltDel() {
  //       rfb.sendCtrlAltDel();
  //       return false;
  //     }

  //     // Show a status text in the top bar
  //     function status(text: string) {
  //       //   document.getElementById('status').textContent = text;
  //     }

  //     // This function extracts the value of one variable from the
  //     // query string. If the variable isn't defined in the URL
  //     // it returns the default value instead.
  //     function readQueryVariable(name: string, defaultValue: string | number | boolean) {
  //       // A URL with a query parameter can look like this:
  //       // https://www.example.com?myqueryparam=myvalue
  //       //
  //       // Note that we use location.href instead of location.search
  //       // because Firefox < 53 has a bug w.r.t location.search
  //       const re = new RegExp('.*[?&]' + name + '=([^&#]*)'),
  //         match = document.location.href.match(re);

  //       if (match) {
  //         // We have to decode the URL since want the cleartext value
  //         return decodeURIComponent(match[1]);
  //       }

  //       return defaultValue;
  //     }

  //     // document.getElementById('sendCtrlAltDelButton')
  //     //   .onclick = sendCtrlAltDel;

  //     // Read parameters specified in the URL query string
  //     // By default, use the host and port of server that served this file
  //     const host = readQueryVariable('host', 'rentakloud.com');
  //     const port = readQueryVariable('port', 443);
  //     const password = readQueryVariable('password', '');
  //     const path = readQueryVariable('path', instance.latest!.vncPath! + `?token=${authStore.access_token}`);

  //     // | | |         | | |
  //     // | | | Connect | | |
  //     // v v v         v v v

  //     status("Connecting");

  //     // Build the websocket URL used to connect
  //     let url;
  //     if (window.location.protocol === "https:") {
  //       url = 'wss';
  //     } else {
  //       url = 'wss';
  //     }
  //     url += '://' + host;
  //     if (port) {
  //       url += ':' + port;
  //     }
  //     url += '/' + path;

  //     // Creating a new RFB object will start a new connection
  //     const target = document.getElementById('screen')
  //     if (target) {
  //       rfb = new RFB(target, url,
  //         { credentials: { password: password } });

  //       // Add listeners to important events from the RFB module
  //       rfb.addEventListener("connect", connectedToServer);
  //       rfb.addEventListener("disconnect", disconnectedFromServer);
  //       rfb.addEventListener("credentialsrequired", credentialsAreRequired);
  //       rfb.addEventListener("desktopname", updateDesktopName);

  //       // Set parameters that can be changed on an active connection
  //       rfb.viewOnly = readQueryVariable('view_only', false);
  //       rfb.scaleViewport = readQueryVariable('scale', false);
  //     } else {
  //       console.error("No target element to render")
  //     }
  //   }
  // })

  const base = import.meta.env.DEV ? "http://localhost:3001/novnc" : "https://rentakloud.com/novnc"
  const url = `${base}/vnc_lite.html?host=rentakloud.com&port=443&path=`
  const path = () => encodeURIComponent(`${instance.latest!.vncPath!}?token=${authStore.access_token}`)

  function picInPicMode() {
    const iFrame = document.querySelector('iframe')!
    const iDoc = iFrame.contentDocument || iFrame.contentWindow!.document
    const stream = iDoc.querySelector('canvas')!.captureStream()
    const target = document.querySelector('video')!
    target.srcObject = stream
    target.onplay = target.requestPictureInPicture
  }

  return (
    <>
      <section class="mb-4">
        <h2 class="text-4xl font-bold mb-5">Stream</h2>
        <p class="mb-2">Your VM's GUI output will be streamed here using our optimized VNC technology.</p>

        <div class="flex gap-4">
          <button class="btn" title="Fullscreen" onclick={() => document.getElementById("screen")?.requestFullscreen()}>
            <Icon.Fullscreen />
          </button>

          <button class="btn" title="Open in new window" onclick={() => window.open(url + path())}>
            <Icon.External />
          </button>

          <button class="btn" title="Picture-in-picture mode" onclick={picInPicMode}>
            <Icon.PictureInPicture />
          </button>
        </div>
      </section>

      <Switch>
        <Match when={instance.loading}>
          <Loader />
        </Match>

        <Match when={instance.latest!.status !== "Active"}>
          <div>Oh snap! Looks like the VM is not running.</div>
        </Match>

        <Match when={!instance.latest!.vncPath}>
          Looks like the VM is not configured properly.
        </Match>

        {/* <Match when={initialized.latest === "false"}>
          <div>Could not establish a secure tunnel to VM. Try again later or contact support@rentakloud.com</div>
        </Match> */}

        <Match when={instance.latest!.vncPath}>
          {/* <div id="screen" /> */}


          <iframe id="screen" src={url + path()} height="720" width="100%"></iframe>

          <video id="pip-target" controls autoplay style="display: none;"></video>
        </Match>
      </Switch>
    </>
  )
}

export default VNC