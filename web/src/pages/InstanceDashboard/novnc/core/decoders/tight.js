/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2019 The noVNC Authors
 * (c) 2012 Michael Tinglof, Joe Balaz, Les Piech (Mercuri.ca)
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * See README.md for usage and integration instructions.
 *
 */

import * as Log from '../util/logging.js';
import Inflator from "../inflator.js";

export default class TightDecoder {
    constructor() {
        this._ctl = null;
        this._filter = null;
        this._numColors = 0;
        this._palette = new Uint8Array(1024);  // 256 * 4 (max palette size * max bytes-per-pixel)
        this._len = 0;

        this._zlibs = [];
        for (let i = 0; i < 4; i++) {
            this._zlibs[i] = new Inflator();
        }
    }

    decodeRect(x, y, width, height, sock, display, depth) {
        if (this._ctl === null) {
            if (sock.rQwait("TIGHT compression-control", 1)) {
                return false;
            }

            this._ctl = sock.rQshift8();

            // Reset streams if the server requests it
            for (let i = 0; i < 4; i++) {
                if ((this._ctl >> i) & 1) {
                    this._zlibs[i].reset();
                    Log.Info("Reset zlib stream " + i);
                }
            }

            // Figure out filter
            this._ctl = this._ctl >> 4;
        }

        let ret;

        if (this._ctl === 0x08) {
            ret = this._fillRect(x, y, width, height,
                                 sock, display, depth);
        } else if (this._ctl === 0x09) {
            ret = this._jpegRect(x, y, width, height,
                                 sock, display, depth);
        } else if (this._ctl === 0x0A) {
            ret = this._pngRect(x, y, width, height,
                                sock, display, depth);
        } else if ((this._ctl & 0x08) == 0) {
            ret = this._basicRect(this._ctl, x, y, width, height,
                                  sock, display, depth);
        } else {
            throw new Error("Illegal tight compression received (ctl: " +
                                   this._ctl + ")");
        }

        if (ret) {
            this._ctl = null;
        }

        return ret;
    }

    _fillRect(x, y, width, height, sock, display, depth) {
        if (sock.rQwait("TIGHT", 3)) {
            return false;
        }

        let pixel = sock.rQshiftBytes(3);
        display.fillRect(x, y, width, height, pixel, false);

        return true;
    }

    _jpegRect(x, y, width, height, sock, display, depth) {
        let data = this._readData(sock);
        if (data === null) {
            return false;
        }
        //display.imageRect(x, y, width, height, "image/jpeg", data);//original
        //return true;//origianl
        //console.log(data);//seems data is already Uint8Array
        /*
        fetch("1.jpeg")
          .then(response => response.blob())
          .then(blob => {
            console.log(blob.type, blob.size);
            var img=new Image();
            img.src=URL.createObjectURL(blob);
            console.log(img);
            //img.decode().then((img) => {
            img.decode().then(function(){
                console.log(img);
                console.log("img.decode", img.width, "x", img.height);
                display._targetCtx.drawImage(img, x, y);
                URL.revokeObjectURL(img.src);
                img=null;
                //window.URL.revokeObjectURL(img.src);
                //img=null;
              }).catch((e) => {
                console.log(e);
              });
            
          });
        */
        //try to paint the canvas right here
        //var u8v = new Uint8Array(data);//mod by Imran
        //var u8v = new Uint8ClampedArray(data);
        var blob = new Blob([data], {type:"image/jpeg"});
        //console.log(blob.type, blob.size, data.byteLength);//this helped me figure out that blob size > actual jpeg bytes and therefore something was wrong somewhere in the conversion process
        //after knowing where the problem was , I found the right hint from this link
        //https://stackoverflow.com/questions/39062595/how-can-i-create-a-png-blob-from-binary-data-in-a-typed-array
        var img=new Image();
        //img.src=window.URL.createObjectURL(blob);
        img.src=URL.createObjectURL(blob);
        //img.decode().then((img) => {
        img.decode().then(function(){ //decoding vs onload. Its being said that decoding is more performant, at least works better for asyn handling
            //console.log(img.width, "x", img.height);
            display._targetCtx.drawImage(img, x, y);//directly draw the canvas instead of a shadow buffer
            URL.revokeObjectURL(img.src);//chrome://blob-internals/ to see if its being released
            //img.src=null;
            img=null;
            //window.URL.revokeObjectURL(img.src);
            //img=null;
          }).catch((e) => {
            console.log(e);
            URL.revokeObjectURL(img.src);
            img=null;
          });
        
        
        //guy below talks about GPUs, Kernel and Javascript
        //https://levelup.gitconnected.com/notorious-rgb-756f19f3e462
        //from https://gist.github.com/candycode/f18ae1767b2b0aba568e
        //arrayview can be used too
        //img.src="1.jpeg";
        //var arrayBufferView = new Uint8Array( this.response );
        //var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
        //var urlCreator = window.URL || window.webkitURL;
        //var imageUrl = urlCreator.createObjectURL( blob );
        //var img = document.querySelector( "#photo" );
        //img.src = imageUrl;        
        
        //img.src=window.URL.createObjectURL(blob);
        //img.src=URL.createObjectURL(myBlob);
        //img.src=blob;
        //console.log(img.height, img.width);
        //let img = new ImageData(u8v, width, height, "jpeg");//mod by Imran
        //display._drawCtx.putImageData(img, x, y);//mod by Imran
        //this._backbuffer = document.createElement('canvas');
        //display._drawCtx.drawImage(img, x, y);//_backbuffer.getContext
        //display._target.putImageData(u8v, x, y);
        //display._damage(x, y, width, height);//mod by Imran. not sure if this is needed
        //display.imageRect(x, y, width, height, "image/jpeg", data);//mod by Imran commented out, original line of code
        return true;
    }

    _pngRect(x, y, width, height, sock, display, depth) {
        throw new Error("PNG received in standard Tight rect");
    }

    _basicRect(ctl, x, y, width, height, sock, display, depth) {
        if (this._filter === null) {
            if (ctl & 0x4) {
                if (sock.rQwait("TIGHT", 1)) {
                    return false;
                }

                this._filter = sock.rQshift8();
            } else {
                // Implicit CopyFilter
                this._filter = 0;
            }
        }

        let streamId = ctl & 0x3;

        let ret;

        switch (this._filter) {
            case 0: // CopyFilter
                ret = this._copyFilter(streamId, x, y, width, height,
                                       sock, display, depth);
                break;
            case 1: // PaletteFilter
                ret = this._paletteFilter(streamId, x, y, width, height,
                                          sock, display, depth);
                break;
            case 2: // GradientFilter
                ret = this._gradientFilter(streamId, x, y, width, height,
                                           sock, display, depth);
                break;
            default:
                throw new Error("Illegal tight filter received (ctl: " +
                                       this._filter + ")");
        }

        if (ret) {
            this._filter = null;
        }

        return ret;
    }

    _copyFilter(streamId, x, y, width, height, sock, display, depth) {
        const uncompressedSize = width * height * 3;
        let data;

        if (uncompressedSize === 0) {
            return true;
        }

        if (uncompressedSize < 12) {
            if (sock.rQwait("TIGHT", uncompressedSize)) {
                return false;
            }

            data = sock.rQshiftBytes(uncompressedSize);
        } else {
            data = this._readData(sock);
            if (data === null) {
                return false;
            }

            this._zlibs[streamId].setInput(data);
            data = this._zlibs[streamId].inflate(uncompressedSize);
            this._zlibs[streamId].setInput(null);
        }

        let rgbx = new Uint8Array(width * height * 4);
        for (let i = 0, j = 0; i < width * height * 4; i += 4, j += 3) {
            rgbx[i]     = data[j];
            rgbx[i + 1] = data[j + 1];
            rgbx[i + 2] = data[j + 2];
            rgbx[i + 3] = 255;  // Alpha
        }

        display.blitImage(x, y, width, height, rgbx, 0, false);

        return true;
    }

    _paletteFilter(streamId, x, y, width, height, sock, display, depth) {
        if (this._numColors === 0) {
            if (sock.rQwait("TIGHT palette", 1)) {
                return false;
            }

            const numColors = sock.rQpeek8() + 1;
            const paletteSize = numColors * 3;

            if (sock.rQwait("TIGHT palette", 1 + paletteSize)) {
                return false;
            }

            this._numColors = numColors;
            sock.rQskipBytes(1);

            sock.rQshiftTo(this._palette, paletteSize);
        }

        const bpp = (this._numColors <= 2) ? 1 : 8;
        const rowSize = Math.floor((width * bpp + 7) / 8);
        const uncompressedSize = rowSize * height;

        let data;

        if (uncompressedSize === 0) {
            return true;
        }

        if (uncompressedSize < 12) {
            if (sock.rQwait("TIGHT", uncompressedSize)) {
                return false;
            }

            data = sock.rQshiftBytes(uncompressedSize);
        } else {
            data = this._readData(sock);
            if (data === null) {
                return false;
            }

            this._zlibs[streamId].setInput(data);
            data = this._zlibs[streamId].inflate(uncompressedSize);
            this._zlibs[streamId].setInput(null);
        }

        // Convert indexed (palette based) image data to RGB
        if (this._numColors == 2) {
            this._monoRect(x, y, width, height, data, this._palette, display);
        } else {
            this._paletteRect(x, y, width, height, data, this._palette, display);
        }

        this._numColors = 0;

        return true;
    }

    _monoRect(x, y, width, height, data, palette, display) {
        // Convert indexed (palette based) image data to RGB
        // TODO: reduce number of calculations inside loop
        const dest = this._getScratchBuffer(width * height * 4);
        const w = Math.floor((width + 7) / 8);
        const w1 = Math.floor(width / 8);

        for (let y = 0; y < height; y++) {
            let dp, sp, x;
            for (x = 0; x < w1; x++) {
                for (let b = 7; b >= 0; b--) {
                    dp = (y * width + x * 8 + 7 - b) * 4;
                    sp = (data[y * w + x] >> b & 1) * 3;
                    dest[dp]     = palette[sp];
                    dest[dp + 1] = palette[sp + 1];
                    dest[dp + 2] = palette[sp + 2];
                    dest[dp + 3] = 255;
                }
            }

            for (let b = 7; b >= 8 - width % 8; b--) {
                dp = (y * width + x * 8 + 7 - b) * 4;
                sp = (data[y * w + x] >> b & 1) * 3;
                dest[dp]     = palette[sp];
                dest[dp + 1] = palette[sp + 1];
                dest[dp + 2] = palette[sp + 2];
                dest[dp + 3] = 255;
            }
        }

        display.blitImage(x, y, width, height, dest, 0, false);
    }

    _paletteRect(x, y, width, height, data, palette, display) {
        // Convert indexed (palette based) image data to RGB
        const dest = this._getScratchBuffer(width * height * 4);
        const total = width * height * 4;
        for (let i = 0, j = 0; i < total; i += 4, j++) {
            const sp = data[j] * 3;
            dest[i]     = palette[sp];
            dest[i + 1] = palette[sp + 1];
            dest[i + 2] = palette[sp + 2];
            dest[i + 3] = 255;
        }

        display.blitImage(x, y, width, height, dest, 0, false);
    }

    _gradientFilter(streamId, x, y, width, height, sock, display, depth) {
        throw new Error("Gradient filter not implemented");
    }

    _readData(sock) {
        if (this._len === 0) {
            if (sock.rQwait("TIGHT", 3)) {
                return null;
            }

            let byte;

            byte = sock.rQshift8();
            this._len = byte & 0x7f;
            if (byte & 0x80) {
                byte = sock.rQshift8();
                this._len |= (byte & 0x7f) << 7;
                if (byte & 0x80) {
                    byte = sock.rQshift8();
                    this._len |= byte << 14;
                }
            }
        }

        if (sock.rQwait("TIGHT", this._len)) {
            return null;
        }

        let data = sock.rQshiftBytes(this._len, false);
        this._len = 0;

        return data;
    }

    _getScratchBuffer(size) {
        if (!this._scratchBuffer || (this._scratchBuffer.length < size)) {
            this._scratchBuffer = new Uint8Array(size);
        }
        return this._scratchBuffer;
    }
}
