import {
  determineVersion,
  getFullVersionFromUSC,
  versionWithPrefix,
} from "./versions";
import { downloadUSC } from "./download";
import { getOsTriplet } from "./platform";
import path from "path";
import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";

export default async function main() {
  try {
    const uscVersionInput = core.getInput("universal-sierra-compiler-version");
    const toolVersionsPathInput = core.getInput("tool-versions");

    const uscVersion = await determineVersion(
      uscVersionInput,
      toolVersionsPathInput,
      "software-mansion/universal-sierra-compiler",
    );

    const triplet = getOsTriplet();

    await core.group(
      `Setting up universal-sierra-compiler ${versionWithPrefix(uscVersion)}`,
      async () => {
        let uscPrefix = tc.find(
          "universal-sierra-compiler",
          uscVersion,
          triplet,
        );
        if (!uscPrefix) {
          const download = await downloadUSC(uscVersion);
          uscPrefix = await tc.cacheDir(
            download,
            "universal-sierra-compiler",
            uscVersion,
            triplet,
          );
        }

        core.setOutput("universal-sierra-compiler-prefix", uscPrefix);
        core.addPath(path.join(uscPrefix, "bin"));
      },
    );

    core.setOutput(
      "universal-sierra-compiler-version",
      await getFullVersionFromUSC(),
    );
  } catch (err) {
    core.setFailed(err);
  }
}
