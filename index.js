import editly from "editly";
import axios from "axios";

async function generateData() {
  let { data } = await axios.get("https://dummyjson.com/products");
  return data.products.splice(0, 5);
}

async function createGif() {
  let data = await generateData();
  let spec = {
    outPath: "./newVid.mp4",
    allowRemoteRequests: true,
    defaults: {
      transition: { name: "fade" },
    },
    clips: [],
  };
  spec.clips = data.map((el) => {
    return {
      duration: 3,
      layers: [
        {
          type: "image",
          path: el.thumbnail,
          zoomDirection: "in",
        },
        { type: "news-title", text: el.title },
        {
          type: "subtitle",
          text: el.description,
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      ],
    };
  });
  await editly(spec);
}

createGif();
