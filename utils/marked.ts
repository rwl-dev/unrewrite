import { Marked, Renderer } from "../deps.ts";

class UnrewriteRenderer extends Renderer {
  text(text: string): string {
    const base = {
      ruby: "<ruby>$1<rt>$2</rt></ruby>",
      emphasis: "<strong>$1</strong>",
    } as const;
    const regex = {
      ruby: /[|｜](.+?)《(.+?)》/g,
      emphasis: /《《(.+?)》》/g,
    };

    return text.replace(regex.ruby, base.ruby).replace(
      regex.emphasis,
      base.emphasis,
    );
  }
}

Marked.setOptions({ renderer: new UnrewriteRenderer() });
export { Marked };
