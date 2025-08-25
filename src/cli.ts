import type { ArgSchema, Command } from "gunshi";

import { cli, define } from "gunshi";

import type { Config } from "./config";
import type { FlattenObject, PlainObjectLike } from "./types";

import { parseCommaSeparatedString } from "./utils";

/**
 * Extracts the argument schema from a given object.
 *
 * Nested keys are flattened using dot notation.
 *
 * @template TObj - The object type to extract the argument schema from.
 *
 * @returns An object mapping flattened keys to their corresponding argument schemas.
 *
 * @example
 * ```ts
 * type Example = {
 *   name: string;
 *   settings: {
 *     theme: string;
 *     notifications: {
 *       email: boolean;
 *       sms: boolean;
 *     };
 *   };
 * };
 *
 * // Resulting type:
 * // {
 * //   "name": ArgSchema;
 * //   "settings.theme": ArgSchema;
 * //   "settings.notifications.email": ArgSchema;
 * //   "settings.notifications.sms": ArgSchema;
 * // }
 * type ExampleArgSchema = ExtractArgSchemaFromObject<Example>;
 * ```
 */
type ExtractArgSchemaFromObject<TObj extends PlainObjectLike> = {
  [K in keyof FlattenObject<TObj>]: ArgSchema;
};

const commonArgs = {
  root: {
    default: process.cwd(),
    type: "string",
  },
} as const satisfies ExtractArgSchemaFromObject<Pick<Config, "root">>;

const featureOneArgs = {
  "featureOne.exclude": {
    parse: parseCommaSeparatedString,
    type: "custom",
  },
  "featureOne.include": {
    parse: parseCommaSeparatedString,
    type: "custom",
  },
} as const satisfies ExtractArgSchemaFromObject<Pick<Config, "featureOne">>;

const mainCmd = define({
  args: {
    ...commonArgs,
  },
  run: (c) => {
    console.log({
      root: {
        explicit: c.explicit.root,
        value: c.values.root,
      },
    });
  },
});

const featureOneSubCmd = define({
  args: {
    ...commonArgs,
    ...featureOneArgs,
  },
  run: (c) => {
    console.log({
      featureOne: {
        exclude: {
          explicit: c.explicit["featureOne.exclude"],
          value: c.values["featureOne.exclude"],
        },
        include: {
          explicit: c.explicit["featureOne.include"],
          value: c.values["featureOne.include"],
        },
      },
      root: {
        explicit: c.explicit.root,
        value: c.values.root,
      },
    });
  },
});

const subCommands = new Map<string, Command>();
subCommands.set("featureOne", featureOneSubCmd);

export async function run(argv: string[]) {
  await cli(argv, mainCmd, {
    subCommands,
  });
}
