import { serve } from "../deps.ts";
import { handler } from "../mod.ts";

const ADDR = ":8080";
serve(handler, { addr: ADDR });
console.log(`HTTP server listening on http://localhost${ADDR}`);
