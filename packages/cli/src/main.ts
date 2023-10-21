import { HoldIC } from "@hold-ic/core";

export async function main() {
  // dependencies across child packages
  const holdIc = new HoldIC({
    whitelist:[],
 
  })
  return holdIc;
}
