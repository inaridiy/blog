import { loadDefaultJapaneseParser } from "budoux";
import * as playwright from "playwright-aws-lambda";
import ReactDOM from "react-dom/server";

const styles = (props) => `
@import url('https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap');
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  html, body {
    height: 100%;
    overflow: hidden;
    font-family:'Yusei Magic', cursive;
  }
  .wrapper{
    height:100vh;
    background-color:#334155;
    padding:3rem;
  }
  .full{
    width:100%;
    height:100%;
  }
  .container{
    display:flex;
    flex-direction:column;
    background-color:black;
    border-radius: 1rem;
    overflow:hidden;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  }
  .bar{
    height:4rem;
    background-color:#f1f5f9;
    display:flex;
    align-items:center;
    padding-left:1.5rem;
    gap:1.5rem;
  }
  .dot{
    width:2.5rem;
    height:2.5rem;
    border-radius:50%;
    filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  }
  .dot1{
    background-color:#ef4444;
  }
  .dot2{
    background-color:#fbbf24;
  }
  .dot3{
    background-color:#22c55e;
  }
  .path{
    font-size:2.5rem;
  }
  .content{
    flex-grow:1;
  }
  .title{
    color:white;
    font-size:5rem;
    padding-left:1rem;
    height:70%;
  }
  .author{
    display:flex;
    height:30%;
    padding-left:2rem;
    align-items:center;
    gap:1.5rem;
  }
  .icon{
    width:8rem;
    height:8rem;
    border-radius:50%;
    background-size: cover;
    background-image:url(${props.icon});
  }

  .name{
    color:white;
    font-size:3rem;
    line-height:2.75rem;
  }
  .twitter{
    color:white;
    font-size:2rem;
  }
`;

const Content = (props) => (
  <html>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style dangerouslySetInnerHTML={{ __html: styles(props) }}></style>
    </head>
    <body>
      <div className="wrapper">
        <div className="container full">
          <div className="bar">
            <div className="dot dot1" />
            <div className="dot dot2" />
            <div className="dot dot3" />
            <p className="path">{props.path}</p>
          </div>
          <div className="content">
            <p
              className="title"
              dangerouslySetInnerHTML={{ __html: props.title }}
            />
          </div>
          <div className="author">
            <div className="icon" />
            <div>
              <p className="name">{props.name}</p>
              <p className="twitter">{props.twitter}</p>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
);

const defaultMeta = {
  title: "ブログの改良案考えながら最新の技術について調べたのでそのまとめ",
  path: "無名開発",
  icon: "https://pbs.twimg.com/profile_images/1493860427520159747/69mdd4Si_400x400.jpg",
  name: "無名の高校生",
  twitter: "@unknown_gakusei",
};

const metaConverter = (meta) => {
  const parser = loadDefaultJapaneseParser();
  meta.title = parser.translateHTMLString(meta.title);
  return meta;
};

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const viewport = { width: 1200, height: 630 };
      const browser = await playwright.launchChromium({ headless: true });
      const page = await browser.newPage({ viewport });
      const markup = ReactDOM.renderToStaticMarkup(
        <Content {...metaConverter({ ...defaultMeta, ...req.body })} />
      );
      const html = `<!doctype html>${markup}`;
      await page.setContent(html, { waitUntil: "networkidle" });
      const image = await page.screenshot({
        type: "png",
        omitBackground: true,
      });
      await browser.close();
      res.setHeader(
        "Cache-Control",
        "s-maxage=31536000, stale-while-revalidate"
      );
      res.setHeader("Content-Type", "image/png");
      res.end(image);
    }
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send("some error happened");
  }
};
