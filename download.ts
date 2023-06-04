import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";


const baseUrl = "https://bitmidi.com"
const url = `${baseUrl}/super-mario-64-medley-mid`;

const html = await fetch(url).then((res) => res.text());

const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');

const link = doc.querySelector("a[download]") as HTMLAnchorElement;
if (link) {
  const download = link.getAttribute("download")
  const href = link.getAttribute("href")
  // download href 
  const respMidi = await fetch(baseUrl + href);
  const midiRaw = await respMidi.blob();
  const html = await fetch(url).then((res) => res.text());
  await Deno.writeFile("midi/" + download, await midiRaw.arrayBuffer());
  console.log(`The uploads path is ${download} and has been saved to uploads_path.txt`);
} else {
  console.log("No download link found");
}