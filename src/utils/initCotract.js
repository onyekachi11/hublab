const {
  ContractAddress,
  ContractName,
  InitName,
} = require("@concordium/web-sdk");

export async function initContract(rpc, index) {
  console.debug(`Refreshing info for contract ${index.toString()}`);
  const info = await rpc?.getInstanceInfo(ContractAddress.create(index, 0));
  console.log(info);
  // setContract(info);
  if (!info) {
    throw new Error(`contract ${index} not found`);
  }

  const { version, name, owner, amount, methods, sourceModule } = info;
  const prefix = "init_";
  if (!InitName.toString(name).startsWith(prefix)) {
    throw new Error(`name "${name}" doesn't start with "init_"`);
  }
  return {
    version,
    index,
    name: ContractName.fromInitName(name),
    amount,
    owner,
    methods,
    sourceModule,
  };
}
