export function getEmbeddedSchema(rpc, moduleRef) {
  if (rpc === undefined) {
    throw new Error(`rpcClient undefined`);
  }
  if (moduleRef === undefined) {
    throw new Error(`Set module ref`);
  }

  return rpc?.getEmbeddedSchema(moduleRef);
}
