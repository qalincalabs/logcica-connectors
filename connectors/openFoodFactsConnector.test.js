// Is a value object an aggregate from another context
import { OpenFoodFactConnector } from "./openFoodFactsConnector.js";

test("Open food facts connector", async () => {
  const inputContext = {
    products: [
      {
        barcode: "5430001830040",
      },
    ],
  };

  const connector = new OpenFoodFactConnector({
    languages: ["en", "fr", "nl", "de"],
  });

  const enrichedContext = await connector.enrich(inputContext);
  console.log(JSON.stringify(enrichedContext, null, 2));

});
