import { Component, onMount } from "solid-js"
//@ts-ignore
// import RFB from "./core/rfb.js"

const VNC: Component<{}> = () => {
  onMount(() => {
    // let rfb: RFB;
    // let desktopName: string;

    // // When this function is called we have
    // // successfully connected to a server
    // function connectedToServer(e: any) {
    //   status("Connected to " + desktopName);
    // }

    // // This function is called when we are disconnected
    // function disconnectedFromServer(e: any) {
    //   if (e.detail.clean) {
    //     status("Disconnected");
    //   } else {
    //     status("Something went wrong, connection is closed");
    //   }
    // }

    // // When this function is called, the server requires
    // // credentials to authenticate
    // function credentialsAreRequired(e: any) {
    //   const password = prompt("Password Required:");
    //   rfb.sendCredentials({ password: password });
    // }

    // // When this function is called we have received
    // // a desktop name from the server
    // function updateDesktopName(e: any) {
    //   desktopName = e.detail.name;
    // }

    // // Since most operating systems will catch Ctrl+Alt+Del
    // // before they get a chance to be intercepted by the browser,
    // // we provide a way to emulate this key sequence.
    // function sendCtrlAltDel() {
    //   rfb.sendCtrlAltDel();
    //   return false;
    // }

    // // Show a status text in the top bar
    // function status(text: string) {
    //   //   document.getElementById('status').textContent = text;
    // }

    // // This function extracts the value of one variable from the
    // // query string. If the variable isn't defined in the URL
    // // it returns the default value instead.
    // function readQueryVariable(name: string, defaultValue: string | number | boolean) {
    //   // A URL with a query parameter can look like this:
    //   // https://www.example.com?myqueryparam=myvalue
    //   //
    //   // Note that we use location.href instead of location.search
    //   // because Firefox < 53 has a bug w.r.t location.search
    //   const re = new RegExp('.*[?&]' + name + '=([^&#]*)'),
    //     match = document.location.href.match(re);

    //   if (match) {
    //     // We have to decode the URL since want the cleartext value
    //     return decodeURIComponent(match[1]);
    //   }

    //   return defaultValue;
    // }

    // // document.getElementById('sendCtrlAltDelButton')
    // //   .onclick = sendCtrlAltDel;

    // // Read parameters specified in the URL query string
    // // By default, use the host and port of server that served this file
    // const host = readQueryVariable('host', window.location.hostname);
    // let port = readQueryVariable('port', 6001);
    // const password = readQueryVariable('password', '');
    // const path = readQueryVariable('path', '');

    // // | | |         | | |
    // // | | | Connect | | |
    // // v v v         v v v

    // status("Connecting");

    // // Build the websocket URL used to connect
    // let url;
    // if (window.location.protocol === "https:") {
    //   url = 'wss';
    // } else {
    //   url = 'ws';
    // }
    // url += '://' + host;
    // if (port) {
    //   url += ':' + port;
    // }
    // url += '/' + path;

    // // Creating a new RFB object will start a new connection
    // rfb = new RFB(document.getElementById('screen'), url,
    //   { credentials: { password: password } });

    // // Add listeners to important events from the RFB module
    // rfb.addEventListener("connect", connectedToServer);
    // rfb.addEventListener("disconnect", disconnectedFromServer);
    // rfb.addEventListener("credentialsrequired", credentialsAreRequired);
    // rfb.addEventListener("desktopname", updateDesktopName);

    // // Set parameters that can be changed on an active connection
    // rfb.viewOnly = readQueryVariable('view_only', false);
    // rfb.scaleViewport = readQueryVariable('scale', false);
  })

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Stream/VNC</h2>

      <div id="screen" />
    </>
  )
}

export default VNC